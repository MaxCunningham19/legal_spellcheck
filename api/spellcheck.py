"""
Module for spell check related code. Currently only contains aspell integration
for the MVP, but may be extended to use Azure Spell Check, custom dictionaries,
consistency checking .etc.
"""
import json
import requests

from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient


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


def get_key(secret_name):
    # Key vault url
    key_vault_url = f"https://spell-check-api-key.vault.azure.net"

    # Create a SecretClient using the default credential
    credential = DefaultAzureCredential(additionally_allowed_tenants=['*'])
    client = SecretClient(vault_url=key_vault_url, credential=credential)

    # Get the secret from the key vault
    retrieved_secret = client.get_secret(secret_name).value

    return retrieved_secret


def call(content):
    # Set subscription key and endpoint
    api_key = get_key('bing-spell-check-api-key')
    spell_check_endpoint = "https://api.bing.microsoft.com/v7.0/spellcheck"

    # Set query parameters
    params = {
        "mkt": "en-US",
        "mode": "proof",
        "preContextText": "",
        "postContextText": "",
    }

    # Set headers
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Ocp-Apim-Subscription-Key": api_key,
    }

    data = {'text': content}

    # Send request
    try:
        response = requests.post(spell_check_endpoint,
                                 headers=headers, params=params, data=data)
        json_response = response.json()
        return json_response
    except requests.exceptions.RequestException as e:
        print(f"Unexpected Request Error: {e}")
        raise
    except Exception as e:
        print(f"Unexpected Error: {e}")
        raise



def check(content: str) -> list[Mistake]:
    """
    Takes a string and returns an array of mistake, where they're located and suggestions objects representing
    the errorrs in that string.
    """

    json_data = call(content)

    mistakes = []

    for flaggedToken in json_data["flaggedTokens"]:
        mistake = {"offset": flaggedToken["offset"],
                   "token": flaggedToken["token"], "suggestions": []}
        for suggestion in flaggedToken["suggestions"]:
            mistake["suggestions"].append(
                {"suggestion": suggestion["suggestion"]})
        mistakes.append(mistake)

    return mistakes


# Tests
# text = "Ths is a testt to see if thre aree any mistakes in this sentence."
# mistakes = check(text)
# print(mistakes)