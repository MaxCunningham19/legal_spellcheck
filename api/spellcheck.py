import json
import time
import requests
import os

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


def get_key():
    key = os.environ.get('BING_API_KEY')
    return key


def check(content: str) -> list[Mistake]:
    """
    Takes a string and returns an array of mistake objects representing
    the errors in that string.
    """
    time.sleep(0.33334)     # Limits us to our rate on MS Azure
    endpoint = 'https://api.bing.microsoft.com/v7.0/spellcheck'  # barely changes so its a constant but you can make it dynamic
    api_key = get_key() # get it from azure key vault (should be converted to str)

    mistakes = [] # mistakes array
    mistakes_position = [] # position of the mistakes
    object_mistakes = [] # an array of the object mistakes
    suggestions = [] # suggestions array
    sugg = []
    position = [] # used for for loop
    count = 0 # used for indexing
    
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
            mistakes_position.append(token['offset'])

        for suggestion in token["suggestions"]:
                sugg.append([suggestion])
        suggestions.append(sugg) 
        position.append(count) # just putting numbers in eg [1, 2, 3, 4, ...] based on number of mistakes
        count+=1       
        i = 0
                

    for count in position:
        accident = Mistake(mistakes[count], mistakes_position[count], suggestions[count]) # creates object mistakes
        object_mistakes.append(accident) # creates an array of mistakes to return
    
    return object_mistakes

