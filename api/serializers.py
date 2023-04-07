from rest_framework import serializers
from . import models
from rest_framework.serializers import ValidationError
from rest_framework.exceptions import ErrorDetail
from django.db import transaction
from django.db.models import Max

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'block_order', 'block_content')
        model = models.Block

class DocumentSerializer(serializers.ModelSerializer):
    blocks = BlockSerializer(source='block_set', many=True)
    class Meta:
        fields = ('id', 'title', 'created_at', 'updated_at', 'blocks')
        model = models.Document
        
class MistakeSerializer(serializers.Serializer):
    word = serializers.CharField(max_length=200)
    start = serializers.IntegerField()
    end = serializers.IntegerField() 
    suggestions = serializers.ListField(
        child=serializers.CharField(max_length=200),
        allow_empty=True
    )

class PutDocumentSerializer(serializers.Serializer):
    """
    This serializer contains a the data that needs to be provided
    by the frontend to update an existing document.
    """
    
    class Block(serializers.ModelSerializer):
        """
        This represents a block that may or may not exist in the
        database.
        """
        
        id = serializers.IntegerField(required=False)
        """
        Blocks that exist in the database must have the ID field
        provided explicitly. Blocks with no ID field are assumed to not
        exist and will be created.
        """
        
        class Meta:
            model = models.Block
            fields = ('id', 'block_order', 'block_content')
            
    title = serializers.CharField(required=False, max_length=200)
    """
    The new title to use for the document, if the title is to be
    updated
    """
    
    blocks = Block(required=False, many=True)
    """
    This represents the new blocks for a document, if the blocksp
    are being updated.  If only the title is provided, the blocks are
    left unchanged. If an empty list is provided, all blocks are
    deleted.
    """

class PutBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Block
        fields = ('block_content',)
    
class PostBlockSerializer(serializers.ModelSerializer):
    """
    This represents the data that the client needs to send to the
    server to post a block relative to another block OR at a
    particular block order via the block REST endpoint
    """
    
    class RelativeBlockOrder:
        """
        This represetns a block insertion relative to an existing block
        """
        
        def __init__(self, direction, id):
            assert direction in ["before", "after"]
            self.direction = direction
            """
            This represents whether the block is to be added
            before the linked block id or after the linked block
            id
            """

            assert id >= 0
            self.id = id
            """
            The block ID we are inserting relative to
            """
                
    class RelativeBlockOrderField(serializers.Field):
        """
        DRF wrapper for relative block order data structure
        """
        
        def to_representation(self, value):
            return { value.direction : value.id }

        def to_internal_value(self, data):
            if type(data) is not dict:
                raise ValidationError("Invalid type. Expected dict.")
            if len(data) > 1:
                raise ValidationError("More than one key. Expected `{ DIRECTION : ID }`")
            [direction, id], *_ = data.items()
            if direction not in ["before", "after"]:
                raise ValidationError("Direction key should be `before` or `after`")
            if not models.Block.objects.filter(pk=id).exists():
                raise ValidationError(f"Block with id=`{id}` does not exist")
            return PostBlockSerializer.RelativeBlockOrder(direction, id)

    class AbsoluteBlockOrder:
        """
        This block order emulates the functionality of /document/ID/ORDER
        """
        
        def __init__(self, order):
            assert order >= 0
            self.order = order

    class AbsoluteBlockOrderField(serializers.Field):
        """
        DRF wrapper for absolute block order data structure
        """

        def to_representation(self, value):
            return value.order
        
        def to_internal_value(self, order):
            if type(order) is not int:
                raise ValidationError("Invalid type. Expected int.")
            if order < 0:
                raise ValidationError("`order` should be >=0")
            return PostBlockSerializer.AbsoluteBlockOrder(order)

    class BlockOrderField(serializers.Field):
        """
        Wrapper for all kinds of block order
        """
        
        def to_representation(self, value):
            return value.to_representation()
        
        def to_internal_value(self, data):
            errors = {}
            for Field in [PostBlockSerializer.RelativeBlockOrderField,
                          PostBlockSerializer.AbsoluteBlockOrderField]:
                try:
                    return Field().to_internal_value(data)
                except ValidationError as error:
                    errors[Field.__name__] = error
            raise ValidationError(ErrorDetail("No block order matched", errors))

    class Meta:
        model = models.Block
        fields = ['block_order', 'block_content', 'block_document']
    
    block_order = BlockOrderField()

    def create(self, validated_data) -> models.Block:
        document = validated_data['block_document']
        order = validated_data['block_order']
        content = validated_data['block_content']
        
        with transaction.atomic():
            match validated_data['block_order']:
                case PostBlockSerializer.RelativeBlockOrder():
                    target = models.Block.objects.get(pk=order.id)
                    if order.direction == "after":
                        # Shift all blocks after the target by one to
                        # create a slot into which we can insert the
                        # new element
                        blocks = models.Block.objects.filter(block_document=target.block_document,
                                                             block_order__gt=target.block_order)
                        # The new block will be inserted right after the target
                        block_order = target.block_order + 1
                    elif order.direction == "before":
                        # Shift all blocks after and including the
                        # target up by one as we will be inserting
                        # before the target
                        blocks = models.Block.objects.filter(block_document=target.block_document,
                                                             block_order__gte=target.block_order)
                        # We will insert into the vacated block space
                        block_order = target.block_order
                    for block in blocks.order_by("-block_order"):
                        block.block_order += 1
                        block.save(force_update=True)
                    block = models.Block(block_document=document,
                                         block_order=block_order,
                                         block_content=content)
                    block.save()
                    return block
                case PostBlockSerializer.AbsoluteBlockOrder():
                    blocks = document.block_set.filter(block_order__gte=order.order) \
                                               .order_by('-block_order')
                    for block in blocks:
                        block.block_order += 1
                        block.save(force_update=True)
                    # If we get an block order that is greater than the highest
                    # preceding block, we need to insert at that block order plus
                    # one rather than the given block order.
                    highest_preceding_block = document.block_set .filter(block_order__lt=order.order) \
                                                                 .aggregate(Max('block_order'))['block_order__max'] or -1
                    block = models.Block(
                        block_document=document,
                        block_order=min(highest_preceding_block + 1, order.order),
                        block_content=content
                    )
                    block.save()
                    return block

    
