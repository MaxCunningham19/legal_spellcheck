from django.db import models
from . import spellcheck

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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
    
    block_order = models.IntegerField(default=0, unique=True)
    """
    The index of a block within a document.
    """
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.block_content[:10]

    def spellcheck(self) -> list[spellcheck.Mistake]:
        """
        Apply a spellcheck function to the block contents.
        """
        return spellcheck.check(self.block_content)
