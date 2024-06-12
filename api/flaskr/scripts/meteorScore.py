# REF: README.md
from nltk.translate.bleu_score import sentence_bleu
from nltk.tokenize import sent_tokenize , word_tokenize
from nltk.translate.bleu_score import SmoothingFunction
import time
from nltk.translate.meteor_score import meteor_score
import colors

'''
The compare_meteorScore function is designed to compare the similarity between
 sentences from two texts using the METEOR score. The function assigns colors to 
 pairs of sentences that have a similarity score above a given threshold and returns dic
 tionaries containing these pairs.


param:
    source: Article in a users native language
    target: Same article as source but in another language
    colors: randomly generated list of colors for highlighting
    similarity: similarity score that will be used to determine matching sentences
return:
    dictionaries of the form:
        {
            "sentence": ["matching sentence", "highlight color"],
            ...
        }
    source_pair_dict:   dictionary with sentences from source as key and value as a list containing matching sentences
                        from target and color to be highlighted
    target_pair_dict:   dictionary with sentences from target as key and value as a list containing matching sentences
                        from source and color to be highlighted
    
Contributors:
Aidan Hayes, Joseph LaBianca Ahmad Ahsan Saleem
'''
def compare_meteorScore(source, target, colors, similarity=0.1):
    # Tokenize paragraphs so they can be traversed as an array
    source_list = sent_tokenize(source)
    target_list = sent_tokenize(target)
    i = 0 # Initialize count for color assignment
    
    # Intialize dictionaries
    source_pair_dict = dict()
    target_pair_dict = dict()
    start_time_1 = time.time()

    # Iteration over both articles
    for src in source_list:
        for tar in target_list:
            # Determine if the current sentence has a match or not
            start_time = time.time()
            # Meteor Score comparison
            tokenized_src = word_tokenize(src)
            tokenized_tar = word_tokenize(tar)
            score = meteor_score([tokenized_src], tokenized_tar)
            print("Meteor score",score )
            if score >= similarity:
                i += 1 # Increase i so that new color can be assigned
                # Check for duplicates
                if (src not in source_pair_dict and tar not in target_pair_dict):
                  
                    source_pair_dict[src] = [tar, colors[i]]
                   
                    target_pair_dict[tar] = [src, colors[i]]
    end_time_1 = time.time()
    print(f"Iteration Time:  {end_time_1 - start_time_1}")
    return source_pair_dict, target_pair_dict

############### Test case for Meteor Score ###############
# colorsGenerated=colors.gen_colors()
# print(compare_meteorScore("source","source",colorsGenerated,0.1))