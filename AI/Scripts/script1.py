import os
import re
import pandas as pd

def normalize_model(model_name):
    """
    Remove non-alphanumeric characters and convert to lowercase.
    This helps match "F-15" with "F15", "US-2" with "US2", etc.
    """
    return re.sub(r'[^a-zA-Z0-9]', '', model_name).lower()

# Define mapping sets with the original strings (with hyphens) for readability.
horus = {
    "F-117", "F-14", "F-15", "F-16", "F-22", "F-35", "F-4", "F-18", "J-10",
    "J-20", "J-35", "JAS-39", "JF-17", "Mig-29", "Mig-31", "Su-57", "Mirage2000",
    "Rafale", "KF-21", "YF-23", "EF-2000"
}

osiris = {
    "A-10", "Su-34", "AV-8B", "Vulcan", "B-1", "B-2", "B-21", "Tornado",
    "Tu-22M", "Tu-95", "XB-70", "Su-24", "Su-25", "H-6", "Tu-160", "JH-7", "B-52"
}

anubis = {
    "A-400M", "AG-600", "An-124", "An-22", "An-225", "An-72", "C-130", "C-17",
    "C-2", "C-390", "C-5", "KC-135", "KJ-600", "P-3", "SR-71", "U-2", "US-2",
    "V-22", "Y-20", "E-2", "E-7", "Be-200", "WZ-7"
}

ra = {
    "AH-64", "CH-47", "CL-415", "Ka-27", "Ka-52", "Mi-24", "Mi-26", "Mi-28",
    "Mi-8", "UH-60", "Z-19", "MQ-9", "RQ-4", "TB-001", "TB-2", "KAAN"
}

# Precompute normalized mapping sets for faster lookup.
norm_horus = {normalize_model(model): "Horus" for model in horus}
norm_osiris = {normalize_model(model): "Osiris" for model in osiris}
norm_anubis = {normalize_model(model): "Anubis" for model in anubis}
norm_ra = {normalize_model(model): "Ra" for model in ra}

def map_class(model_name):
    norm_name = normalize_model(model_name)
    if norm_name in norm_horus:
        return norm_horus[norm_name]
    elif norm_name in norm_osiris:
        return norm_osiris[norm_name]
    elif norm_name in norm_anubis:
        return norm_anubis[norm_name]
    elif norm_name in norm_ra:
        return norm_ra[norm_name]
    else:
        # If the model is not found, you can choose to either return the original
        # or assign a default value.
        print(f"Warning: '{model_name}' (normalized: '{norm_name}') not found in any mapping set. Leaving unchanged.")
        return model_name

# Folder containing the dataset CSV files (adjust the path if needed)
dataset_folder = "/Users/adithyasarma/Desktop/AI_Aspects/DatasetFiles/dataset"

# Process each CSV file in the dataset folder
for filename in os.listdir(dataset_folder):
    if filename.lower().endswith(".csv"):
        csv_path = os.path.join(dataset_folder, filename)
        print(f"Processing {csv_path} ...")
        
        try:
            df = pd.read_csv(csv_path)
        except Exception as e:
            print(f"Error reading {csv_path}: {e}")
            continue
        
        if "class" not in df.columns:
            print(f"File {filename} does not have a 'class' column. Skipping.")
            continue
        
        # Apply the mapping function to the "class" column
        df["class"] = df["class"].apply(map_class)
        
        # Overwrite the CSV file with updated class labels
        try:
            df.to_csv(csv_path, index=False)
            print(f"Updated {csv_path}")
        except Exception as e:
            print(f"Error writing {csv_path}: {e}")

print("All CSV files processed.")