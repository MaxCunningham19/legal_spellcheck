import json
import time
import requests
import os
import spellcheck_constants as const


class Mistake():
    def __init__(self, word: str, location: int, suggestions: list[str]):
        self.word = word
        '''
        The actual word that was misspelt.
        '''

        self.start = location
        '''
        The character index at which the mistake starts.
        '''

        self.end = self.start + len(word)
        '''
        The character index at which the mistake ends (exclusive).
        '''

        self.suggestions = suggestions
        '''
        The suggestions returned by Azure Bing Spell Check.
        '''

    def __repr__(self) -> str:
        return str(self.__dict__)


def get_key():
    key = os.environ.get('BING_API_KEY')
    return key


def check(content: str) -> list[Mistake]:
    '''
    Takes a string and returns an array of mistake objects representing
    the errors in that string.
    '''
    time.sleep(0.33334)  # Limits us to our rate on MS Azure
    api_key = get_key()  # get key from Key Vault or ENV variables

    # initalise variables to format response from Spellcheck API
    mistakes = []
    mistakes_position = []  # position of the mistakes
    object_mistakes = []
    suggestions = []
    sugg = []
    position = []  # used for for loop
    count = 0  # used for indexing

    # Set query parameters (required for the POST request to the spell check endpoint)
    params = {
        'mkt': 'en-US',
        'mode': 'proof',
        'preContextText': '',
        'postContextText': '',
    }

    data = {'text': content}  # format json for API

    # Set required headers
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': api_key,
    }

    # Send request & parse as JSON
    response = requests.post(const.BING_ENDPOINT, headers=headers,
                             params=params, data=data)
    json_response = response.json()

    for token in json_response[const.FLAGGED_TOKENS]:    # loop through mistakes
        if token[const.MISTAKE_TYPE] == const.UNKOWN_TOKEN:
            mistakes.append(token[const.TOKEN_VALUE])
            mistakes_position.append(token[const.TOKEN_RELATIVE_POSITION])

        for suggestion in token[const.SUGGESTIONS]:
            sugg.append([suggestion])
        suggestions.append(sugg) # just putting numbers in eg [1, 2, 3, 4, ...] based on number of mistakes
        position.append(count)
        count += 1

    for count in position:
        # creates object mistakes
        accident = Mistake(
            mistakes[count],
            mistakes_position[count],
            suggestions[count]
        )
        # creates an array of mistakes to return
        object_mistakes.append(accident)

    return object_mistakes
