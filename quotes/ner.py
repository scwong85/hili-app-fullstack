import spacy

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")

def ner_tagging(text):
    text= str(text)
    doc = nlp(text)

    if len(doc.ents) != 0:
        return doc.ents
    else:
        return 0