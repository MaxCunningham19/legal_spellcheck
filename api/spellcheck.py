import time
import requests
import os
from . import spellcheck_constants as const

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
    return os.environ.get('BING_API_KEY')

def check(content: str) -> list[Mistake]:
    '''
    Takes a string and returns an array of mistake objects representing
    the errors in that string.
    '''
    time.sleep(0.33334)  # Limits us to our rate on MS Azure

    response = requests.post(
        const.BING_ENDPOINT,
        headers={
            'Content-Type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': get_key(),
        },
        params={
            'mkt': 'en-US',
            'mode': 'proof',
            'preContextText': '',
            'postContextText': '',
        },
        data={
            'text' : content
        }
    )
    
    return [Mistake(token[const.TOKEN_VALUE],
                    token[const.TOKEN_RELATIVE_POSITION],
                    [suggestion[const.SUGGESTION]
                     for suggestion in token[const.SUGGESTIONS]])
            for token in response.json()[const.FLAGGED_TOKENS]
            if token[const.MISTAKE_TYPE] == const.UNKOWN_TOKEN]
