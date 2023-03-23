from rest_framework import serializers
from . import models

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
