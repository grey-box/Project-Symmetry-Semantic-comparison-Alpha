from nltk import sent_tokenize
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction


def test_blue_score_function():
    orginalArticle = ['Canada  35 million people.']
    referenceArticle = ['Canada hope hop people  ottawa.']
    print(sent_tokenize('hello,hey. yo'))
    bleu_score = sentence_bleu([orginalArticle[0].split()],
                               referenceArticle[0].split(),
                               smoothing_function=SmoothingFunction().method7)
    print(bleu_score)
    assert 1==1
