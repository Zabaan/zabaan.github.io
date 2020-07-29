from os import listdir
from os.path import isfile, join
import csv

mypath = "../data/"
onlyfiles = [f for f in listdir(mypath)]
langs = {}
topics = set()
langcode_to_langname = {}

with open('lang_codes_iso.csv', 'r') as f:
    lines = f.read().split("\n")
    for l in lines:
        pars = l.split("\t")
        langcode_to_langname[pars[0]] = pars[-1]

print(langcode_to_langname)

with open('languages.csv', 'w') as f:
    csvwriter = csv.writer(f, delimiter='\t', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    onlyfiles = sorted(onlyfiles)
    for file in onlyfiles:
        if file.startswith("."):
            pass
        else:
            subfiles = [d for d in listdir(mypath + file)]
            for sf in sorted(subfiles):
                print(sf)
                if ".DS_Store" in sf:
                    pass
                else:
                    topics.add(sf[sf.rfind('_') + 1:])
            csvwriter.writerow([file, ','.join(list(topics)), langcode_to_langname[file]])
            # lang = file[0:file.rfind('_')]
            # print(lang)
            # if lang in langs:
            #     langs[lang].add(file[file.rfind('_') + 1:])
            # else:
            #     langs[lang] = set()
            #     langs[lang].add(file[file.rfind('_') + 1:])
print(langs)
#    csvwriter.writerow([onlyfiles, ','.join(list(topics))])
