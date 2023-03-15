"""
Module for spell check related code. Currently only contains aspell integration
for the MVP, but may be extended to use AWS Kendra, custom dictionaries,
consistency checking .etc.
"""
import time
import requests


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
        The suggestions returned by Azure Bing Spell Check.
        """

    def __repr__(self) -> str:
        return str(self.__dict__)


def check(content: str) -> list[Mistake]:
    """
    Takes a string and returns an array of mistake objects representing
    the errors in that string.
    """

    endpoint = 'https://api.bing.microsoft.com/v7.0/spellcheck'
    api_key = 'KEY_HERE'
    max_suggestions = 5

    mistakes = []

    # Split the content into words
    words = content.split()

    # Loop through each word and retrieve query suggestions
    for i, word in enumerate(words):
        time.sleep(1)
        params = {
            'mkt': 'en-US',
            'mode': 'proof',
            'text': word,
            'preContextText': ' '.join(words[:i]),
            'postContextText': ' '.join(words[i + 1:])
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': api_key
        }
        response = requests.post(endpoint, params=params, headers=headers).json()

        # Check if the word has any suggestions
        if not response['flaggedTokens']:
            mistakes.append(Mistake(word, sum(len(w) + 1 for w in words[:i]), []))
        else:
            suggestions = [suggestion['suggestion'] for suggestion in
                           response['flaggedTokens'][0]['suggestions'][:max_suggestions]]
            mistakes.append(Mistake(word, sum(len(w) + 1 for w in words[:i]), suggestions))

    return mistakes