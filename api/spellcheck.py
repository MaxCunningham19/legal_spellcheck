import json
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


def get_key(self):
    # KEY VAULT LOGIC TO RETRIEVE THE API KEY FOR BING SPELL CHECK
    pass


def check(content: str) -> list[Mistake]:
    """
    Takes a string and returns an array of mistake objects representing
    the errors in that string.
    """

    endpoint = 'https://api.bing.microsoft.com/v7.0/spellcheck'  # barely changes so its a constant but you can make it dynamic
    api_key = get_key() # get it from azure key vault (should be converted to str)

    mistakes = [] # mistakes array

    # Set query parameters (required for the POST request to the spell check endpoint)
    params = {
        "mkt": "en-US",
        "mode": "proof",
        "preContextText": "",
        "postContextText": "",
    }

    data = {"text": content} # this is where the data is being passed in from 'content' and sent as a payload through the POST request

    # Set headers (also essential to the spellcheck api)
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Ocp-Apim-Subscription-Key": api_key,
    }

    # Send request
    response = requests.post(endpoint, headers=headers, params=params, data=data) # The actual request
    json_response = response.json() # parse as JSON

    for token in json_response['flaggedTokens']:    # loop through the objects
        if token['type'] == 'UnknownToken':
            mistakes.append(token['token']) # add it to the mistakes list

    # another loop to get all the suggestions into their own list (OPTIONAL)
    # if you decide that you need something like this, a function for calling the api should be separate,
    # and another function for combing through the data and putting it into its own list or whatever

    suggestions = []
    for token in json_response["flaggedTokens"]:
        for suggestion in token["suggestions"]:
            suggestions.append(suggestion["suggestion"])


    return mistakes



# Tests
#text = "Ths is a testt to see if thre aree any mistakes in this sentence."
#mistakes = check(text)
#print(mistakes)

#print()