from django.db import models
from . import spellcheck

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def spellcheck(self) -> list[spellcheck.Mistake]:
        block_limit, wordcount = map(list, zip(*self.blocklimit()))
        wordcount = [0] + wordcount
        limit_index = 0
        mistakes = []
        total_wordcount = 0
        content = ''
        # Retrieve all the blocks that belong to the document
        for order in Block.objects.filter(block_document=self):
            if order.block_order == block_limit[limit_index]:
                mistake_list: list[spellcheck.Mistake] = spellcheck.check(content)
                content = ''
                for mistake in mistake_list:
                    mistake.start += total_wordcount
                    mistake.end += total_wordcount
                total_wordcount = wordcount[limit_index]
                mistakes += mistake_list
                limit_index += 1
            content += ' ' + order.block_content
        if content != '':
            mistake_list: list[spellcheck.Mistake] = spellcheck.check(content)
            total_wordcount = wordcount[limit_index]
            for mistake in mistake_list:
                mistake.start += total_wordcount
                mistake.end += total_wordcount
            mistakes += mistake_list
        return mistakes
    
    def blocklimit(self) -> list[(int, int)]:
        wordcount = 0
        total_wordcount = 0
        order = 0
        # Retrieve all the blocks that belong to the document
        blocks = Block.objects.filter(block_document=self)
        segments = []
        for order, block in enumerate(blocks):
            if wordcount + len(block.block_content) >= 10000:#if over the word count it will go back a block and return
                total_wordcount += wordcount
                segments.append((order, total_wordcount))
                wordcount = 0
            elif order == len(blocks) - 1:
                total_wordcount += wordcount
                segments.append((order, total_wordcount))
            wordcount += len(block.block_content)        
        return segments
    
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
