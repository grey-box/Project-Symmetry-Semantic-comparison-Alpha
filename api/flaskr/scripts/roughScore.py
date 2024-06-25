# REF: README.md
from nltk.translate.bleu_score import sentence_bleu
from nltk.tokenize import sent_tokenize
from nltk.translate.bleu_score import SmoothingFunction
import time
import colors
from rouge_score import rouge_scorer

'''
compare_roughScore
Description
The compare_roughScore function compares two text sources using the Rouge-L metric to measure the similarity
 between their sentences. It assigns colors to matched sentences for easy visualization of similarities.

Parameters
source (str): The source text to be compared.
target (str): The target text to be compared.
colors (list): A list of colors to assign to matched sentence pairs.
similarity (float, optional): The similarity threshold for considering two sentences as a match. 
Default is 0.1.
Returns
source_pair_dict (dict): A dictionary with sentences from the source text as keys and a list containing 
the matching target sentence and assigned color as values.
target_pair_dict (dict): A dictionary with sentences from the target text as keys and a list containing 
the matching source sentence and assigned color as values.
    
Contributors:
Aidan Hayes, Joseph LaBianca , Ahmad Ahsan Saleem
'''
def compare_roughScore(source, target, colors, similarity=0.1):
    # Tokenize paragraphs so they can be traversed as an array
    source_list = sent_tokenize(source)
    target_list = sent_tokenize(target)
    i = 0 # Initialize count for color assignment
    
    # Intialize dictionaries
    source_pair_dict = dict()
    target_pair_dict = dict()
    start_time_1 = time.time()
    # Initialize Rouge
    rouge = rouge_scorer.RougeScorer(['rougeL'], use_stemmer=True)

    # Iteration over both articles
    for src in source_list:
        for tar in target_list:
            # Determine if the current sentence has a match or not
            start_time = time.time()
            scores = rouge.score(src, tar)
            score = scores['rougeL'].fmeasure
            print("Rough Score", score)
            if score >= similarity:
                i += 1 # Increase i so that new color can be assigned
                # Check for duplicates
                if (src not in source_pair_dict and tar not in target_pair_dict):
                  
                    source_pair_dict[src] = [tar, colors[i]]
                   
                    target_pair_dict[tar] = [src, colors[i]]
    end_time_1 = time.time()
    print(f"Iteration Time:  {end_time_1 - start_time_1}")
    return source_pair_dict, target_pair_dict


##### Test case for Rough Score ###########################
# colorsGenerated=colors.gen_colors()
# print(compare_roughScore("source","source",colorsGenerated,0.1))