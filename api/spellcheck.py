"""
Module for spell check related code. Currently only contains aspell integration
for the MVP, but may be extended to use AWS Kendra, custom dictionaries,
consistency checking .etc.
"""

import subprocess

class Mistake():
    def __init__(self, word: str, location: int, suggestions: list[str]):
        self.word = word
        """
        The actual word that was misspelt.
        """
        
        self.start = location
        """
        The character index at which the mistake starts.
        """
        
        self.end = self.start + len(word)
        """
        The character index at which the mistake ends (exclusive).
        """
        
        self.suggestions = suggestions
        """
        The suggestions returned by aspell.
        """

    def __repr__(self) -> str:
        return str(self.__dict__)
    
class Metric():
    def __init__(self, block:int, word:str, count:int):
        self.word = word    
        """
        The most misspelled word
        """
        
        self.block = block
        """
        The block with the most errors by block_order
        """

        self.count = count
        """
        The total errors in the document
        """

def check(content: str) -> list[Mistake]:
    """
    Takes a string and returns an array of mistake objects representing
    the errorrs in that string.
    """
    
    raw_output = subprocess.run(
        ["aspell", "-a"],
        text=True,
        input=content,
        stdout=subprocess.PIPE
    ).stdout
    
    mistakes = []
    
    for line in raw_output.splitlines()[1:]:
        if len(line) == 0:
            pass
        elif line[0] == "&":
            word, number_of_suggestions, location, *suggestions = line.split()[1:]
            mistakes.append(Mistake(word, int(location.rstrip(":")), suggestions))
        elif line[0] == "#":
            word, location = line.split()[1:]
            mistakes.append(Mistake(word, int(location.rstrip(":")), []))

    return mistakes
