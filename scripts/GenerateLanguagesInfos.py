from os import listdir
from os.path import isfile, join
import csv

mypath = "../data/"
onlyfiles = [f for f in listdir(mypath)]
langs = {}
topics = set()
with open('languages.csv', 'w') as f:
    csvwriter = csv.writer(f, delimiter='\t', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for file in onlyfiles:
        subfiles = [d for d in listdir(mypath+file)]
        for sf in subfiles:
            topics.add(sf[sf.rfind('_')+1:])
        csvwriter.writerow([file, ','.join(list(topics))])
        # lang = file[0:file.rfind('_')]
        # print(lang)
        # if lang in langs:
        #     langs[lang].add(file[file.rfind('_') + 1:])
        # else:
        #     langs[lang] = set()
        #     langs[lang].add(file[file.rfind('_') + 1:])
print(langs)
#    csvwriter.writerow([onlyfiles, ','.join(list(topics))])
