import pytest
from nltk import sent_tokenize

from app.scripts.blue_Score import BlueScore

def test_two_sentences_are_the_same():
    originalSentence = 'Canada has 35 million people.'
    referenceSentence = 'Canada has 35 million people.'
    assert BlueScore.isSentenceSame(originalSentence, referenceSentence) == True

def test_two_sentences_are_not_then_same():
    originalSentence = 'America is 40 years old'
    referenceSentence = 'Canada has 35 million people.'
    assert BlueScore.isSentenceSame(originalSentence, referenceSentence) == False

def test_sentence_is_in_reference_set():
    originalSentences = 'Canada has 35 million people'
    referenceSentences = ['Canada has 35 million people']
    assert BlueScore.checkIfSentenceSetContainsSentence(originalSentences, referenceSentences) == True

def test_sentence_is_not_in_reference_set():
    originalSentences = 'Canada has 35 million people'
    referenceSentences = ['','Different']
    assert BlueScore.checkIfSentenceSetContainsSentence(originalSentences, referenceSentences) == False

def test_sentence_is_not_in_reference_set_add_to_list():
    originalSentences = 'Canada has 35 million people'
    referenceSentences = ['', 'Different']
    assert BlueScore.missingSentence == ['','Different']