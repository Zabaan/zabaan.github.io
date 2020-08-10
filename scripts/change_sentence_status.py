import pandas as pd
import os
import json


if __name__ == '__main__':
    main_folder = input("Enter the path to the folder with sentence ids to remove: ")

    if os.path.exists(main_folder):
        parent_dir = os.path.dirname(os.getcwd())
        current_changes = {}
        for file_name in os.listdir(main_folder):
            if file_name.startswith("Zabaan_") and file_name.endswith(".csv"):
                name_parts = file_name.replace("Zabaan_", "").replace(".csv", "").split("_")
                lang = name_parts[0]
                cat = lang + "_" + name_parts[1]
                sentence_id = "_".join(name_parts[0:-1])
                file_nr = int(name_parts[-1]) * 200
                data_file_name = cat + "_sentences_" + str(file_nr).zfill(4)
                data_file_path = os.path.join(parent_dir, "data", lang, cat, data_file_name)

                data_file_path_to_change = data_file_path.split("zabaan.github.io/")[1] + ".csv"
                if data_file_path_to_change not in current_changes:
                    current_changes[data_file_path_to_change] = []
                current_changes[data_file_path_to_change].append(sentence_id)

        if os.path.exists(os.path.join(parent_dir, "to_rm", "rm_log.json")):
            with open(os.path.join(parent_dir, "to_rm", "rm_log.json"), "r+") as rm_log:
                old_changed_sentences = json.load(rm_log)
                for f in current_changes:
                    if f not in old_changed_sentences:
                        old_changed_sentences[f] = []
                    old_changed_sentences[f].extend([x for x in current_changes[f] if
                                                     x not in old_changed_sentences[f]])
                rm_log.seek(0)
                json.dump(old_changed_sentences, rm_log, indent=4)
        else:
            with open(os.path.join(parent_dir, "to_rm", "rm_log.json"), "w") as rm_log:
                json.dump(current_changes, rm_log, indent=4)


        print("*******************************************\n"
              "path to the changed files and sentence ids:\n"
              "*******************************************\n",
              os.path.join(parent_dir, "to_rm", "rm_log.json"))
        print("\n*********************************************\n"
              "The following sentences' STATUS will be \n"
              "changed to N in the corresponding data files:\n"
              "*********************************************\n",
              json.dumps(current_changes, indent=4))

        for file_path in current_changes:
            data = pd.read_csv(os.path.join(parent_dir, file_path), sep="\t")
            # if "clean_STATUS" not in data.columns:
            #     data["clean_STATUS"] = data["STATUS"]
            # data.loc[data.ID.isin(current_changes[file_path]), 'clean_STATUS'] = 'N'
            data.loc[data.ID.isin(current_changes[file_path]), 'STATUS'] = 'N'
            data.to_csv(os.path.join(parent_dir, file_path), sep="\t", index=False)
    else:
        print("The path is not valid!")


