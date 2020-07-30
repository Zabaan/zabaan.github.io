import re, os, os.path
import norm_arabic

folder = "/Users/romanovienna/Dropbox/4.Projects/_ReadeRs/zabaan.github.io/data/arabic/arabic_news/"
folderTest = "/Users/romanovienna/Dropbox/4.Projects/_ReadeRs/zabaan.github.io/data/arabic/arabic_news_test/"
files = os.listdir(folder)

ARABIC = tuple(["arabic", "persian", "urdu", "pashto"])

for file in files:
    if file.startswith("."):
        pass
    else:
        with open(folder+file, "r", encoding="utf8") as f1:
            print(file)
            data = f1.read().split("\n")
            print(len(data))

            dataNew = []

            for d in data:
                d = d.split("\t")
                if len(d) == 9:
                    d[1] = norm_arabic.normalization(d[1])
                    d = "\t".join(d)
                    dataNew.append(d)
                else:
                    print(d)
                    print(len(d))

            dataNew = "\n".join(dataNew)
            with open(folderTest+file, "w", encoding="utf8") as f9:
                f9.write(dataNew)
