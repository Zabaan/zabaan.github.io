from os import listdir
from os.path import isfile, join
mypath = "../data_new/"
onlyfiles = [f[0:-5] for f in listdir(mypath) ]
with open("languages.csv","w") as f:
    f.write("\n".join(onlyfiles))
