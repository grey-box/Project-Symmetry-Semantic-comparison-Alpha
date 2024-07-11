from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction


class BlueScore:
    def __init__(self):
        self

    @staticmethod
    def checkIfSentenceSetContainsSentence(sentence, sentenceSet):
        isInSet = False
        for referenceSentence in sentenceSet:
            if(BlueScore.isSentenceSame(sentence, referenceSentence)):
                isInSet = True
                break
        return isInSet
    @staticmethod
    def isSentenceSame(originalSentence, referenceSentence):
        blueScore = sentence_bleu([originalSentence.split()],referenceSentence.split(),smoothing_function=SmoothingFunction().method7)
        if blueScore >0.2:
            return True
        return False