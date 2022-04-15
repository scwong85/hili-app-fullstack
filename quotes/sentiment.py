import nltk
nltk.download('subjectivity')
nltk.download('punkt')
nltk.download('vader_lexicon')
from nltk import tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def sentiment_analyzer(text):
    result = {}
    text = str(text)
    lines_list = tokenize.sent_tokenize(text)
    for sentence in lines_list:
        sid = SentimentIntensityAnalyzer()
        sentence_score = sid.polarity_scores(sentence)['compound']
        result[sentence] = sentence_score
    overall = sid.polarity_scores(text)['compound']
    return result, overall