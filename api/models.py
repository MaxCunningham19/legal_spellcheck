from django.db import models
from . import spellcheck

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def spellcheck(self) -> list[spellcheck.Mistake]:
        limit =  self.blocklimit()
        content = ""
        # Retrieve all the blocks that belong to the document
        for order in Block.objects.filter(block_document=self):
            if order.block_order <= limit:
                content += order.block_content

        return spellcheck.check(content)
    
    def blocklimit(self) -> int:
        wordcount = 0
        order = 0
        # Retrieve all the blocks that belong to the document
        for block in Block.objects.filter(block_document=self):
            wordcount += len(block.block_content)
            order += 1
            if wordcount >= 10000:#if over the word count it will go back a block and return
                order -= 1
                return order
        
        return order


    def __str__(self):
        return self.title

class Block(models.Model):
    block_document = models.ForeignKey(Document, on_delete=models.CASCADE)
    """
    The parent document of a block.
    """
    
    block_content = models.TextField()
    """
    The text content of a block.
    """
    
    block_order = models.IntegerField(default=0)
    """
    The index of a block within a document.
    """
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['block_document', 'block_order']
        ordering = ['block_order']

    def __str__(self):
        return self.block_content

    def spellcheck(self) -> list[spellcheck.Mistake]:
        """
        Apply a spellcheck function to the block contents.
        """
        return spellcheck.check(self.block_content)
