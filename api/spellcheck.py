"""
Module for spell check related code. Currently only contains aspell integration
for the MVP, but may be extended to use AWS Kendra, custom dictionaries,
consistency checking .etc.
"""
import time
import requests
import json

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
    # Set subscription key and endpoint
    api_key = "apikey"
    spell_check_endpoint = "https://api.bing.microsoft.com/v7.0/spellcheck"

# Set query parameters
    params = {
        "mkt": "en-US",
        "mode": "proof",
        "preContextText": "",
        "postContextText": "",
    }
    text = "Ths is a testt to see if thre aree any mistakes in this sentence."

    data = {"text": text}

# Set headers
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Ocp-Apim-Subscription-Key": api_key,
    }

# Send request
    response = requests.post(spell_check_endpoint, headers=headers, params=params, data=data)
    json_response = response.json()
    print(json.dumps(json_response, indent=4))

#text = "Ths is a testt to see if thre aree any mistakes in this sentence."
#mistakes = check(text)
#print(mistakes)
    