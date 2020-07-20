from os import listdir
from os.path import isfile, join
import csv
mypath = "../data/"
onlyfiles = [f for f in listdir(mypath) ]
langs = {}
topics = set()
with open('languages.csv', 'w') as f:
    csvwriter = csv.writer(f, delimiter=' ',quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for f in onlyfiles:
	lang = f[0:f.rfind('_')]
	print(lang)
	if lang in langs:
	  langs[lang].add(f[f.rfind('_')+1:])
	else:
	  langs[lang] = set()
	  langs[lang].add(f[f.rfind('_')+1:])
print(langs)
#    csvwriter.writerow([onlyfiles, ','.join(list(topics))])
