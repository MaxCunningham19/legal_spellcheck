"""
Module for spell check related code. Currently only contains aspell integration
for the MVP, but may be extended to use AWS Kendra, custom dictionaries,
consistency checking .etc.
"""

import subprocess
import boto3

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

def check(content: str) -> list[Mistake]:
    """
    Takes a string and returns an array of mistake objects representing
    the errors in that string.
    """

    kendra = boto3.client("kendra", aws_access_key_id='something',
                          aws_secret_access_key='somethign',
                          region_name='eu-west-1')
    index_id = "something"
    max_suggestions = 5

    mistakes = []

    # Split the content into words
    words = content.split()

    # Loop through each word and retrieve query suggestions
    for i, word in enumerate(words):
        response = kendra.get_query_suggestions(
            IndexId=index_id,
            QueryText=word,
            MaxSuggestionsCount=max_suggestions
        )

        # Check if the word has any suggestions
        if not response['Suggestions']:
            mistakes.append(Mistake(word, sum(len(w) + 1 for w in words[:i]), []))

    return mistakes