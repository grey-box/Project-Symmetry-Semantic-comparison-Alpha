# REF: README.md
from nltk.translate.bleu_score import sentence_bleu
from nltk.tokenize import sent_tokenize
from nltk.translate.bleu_score import SmoothingFunction
import time
import colors
from bert_score import score as bert_score

'''
The compare_bertScore function compares the similarity between sentences from two
texts using the BERT score. The function assigns colors to pairs of sentences that
have a similarity score above a given threshold and returns dictionaries containing
these pairs.
Parameters
source (str): The source text to be compared. This text will be tokenized into sentences.
target (str): The target text to be compared against the source text. This text will 
also be tokenized into sentences.
colors (list): A list of colors to be assigned to the pairs of matching sentences. The 
colors are used to visually distinguish different pairs.
similarity (float, optional): The threshold for the BERT score to consider two 
sentences as similar. Default value is 0.1.
Returns
source_pair_dict (dict): A dictionary where the keys are sentences from the source text 
and the values are lists containing the matching sentence from the target text and the 
assigned color.
target_pair_dict (dict): A dictionary where the keys are sentences from the target text
and the values are lists containing the matching sentence from the source text and the 
assigned color.
Check Similarity Threshold: If the BERT score is greater than or equal to the specified 
similarity threshold, the function assigns a color to the pair and adds them to the 
dictionaries.
    
Contributors:
Ahmad Ahsan Saleem
'''
def compare_bertScore(source, target, colors, similarity=0.1):
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
            P, R, F1 = bert_score([src], [tar], lang="en")
            score = F1.mean().item()
            print("Bert Score" , score)
            if score >= similarity:
                i += 1 # Increase i so that new color can be assigned
                # Check for duplicates
                if (src not in source_pair_dict and tar not in target_pair_dict):
                  
                    source_pair_dict[src] = [tar, colors[i]]
                   
                    target_pair_dict[tar] = [src, colors[i]]
    end_time_1 = time.time()
    print(f"Iteration Time:  {end_time_1 - start_time_1}")
    return source_pair_dict, target_pair_dict

## Test Case for Bert Score #########
#colorsGenerated=colors.gen_colors()
#print(compare_bertScore("source","source",colorsGenerated,0.1))