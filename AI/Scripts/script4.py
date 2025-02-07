import os
import shutil
import glob
import pandas as pd
from sklearn.model_selection import train_test_split

# Set the base folder path where your 'images' and 'labels' folders are located.
base_folder = '/Users/adithyasarma/Desktop/AI_Aspects/DatasetFiles/dataset'  # Change this to your dataset base folder

# Define the source folders
images_src = os.path.join(base_folder, 'images')
labels_src = os.path.join(base_folder, 'labels')

# Define destination folders for splits (train, test, val)
splits = ['train', 'test', 'val']
for split in splits:
    os.makedirs(os.path.join(base_folder, split, 'images'), exist_ok=True)
    os.makedirs(os.path.join(base_folder, split, 'labels'), exist_ok=True)

# Get the list of label files (assuming .txt for YOLO format; change to .csv if needed)
# Here, we assume that for each image file (e.g., img001.jpg) there is a corresponding label file (img001.txt)
label_files = glob.glob(os.path.join(labels_src, '*.txt'))

# Build a list of entries with filename and "primary" class
data = []
for lf in label_files:
    base_name = os.path.splitext(os.path.basename(lf))[0]  # e.g., img001
    # Read the label file; assume that each non-empty line begins with the class id (an integer)
    with open(lf, 'r') as f:
        lines = [line.strip() for line in f if line.strip()]
    if not lines:
        # If no labels, you can decide to skip this file.
        continue
    # Get the primary class as the first token from the first line
    primary_class = lines[0].split()[0]
    data.append({'filename': base_name, 'class': primary_class})

# Ensure we have some data to split
if not data:
    raise ValueError("No labeled files found for splitting.")

# Create a DataFrame for convenience
df = pd.DataFrame(data)

# For stratification, we need to have the "class" column. If the classes are strings, that's fine.
# First, split into train (70%) and temporary (30%)
df_train, df_temp = train_test_split(
    df, test_size=0.30, random_state=42, stratify=df['class']
)

# Now split df_temp equally into test (15%) and val (15%)
df_test, df_val = train_test_split(
    df_temp, test_size=0.5, random_state=42, stratify=df_temp['class']
)

print("Split counts:")
print("Train:", len(df_train))
print("Test:", len(df_test))
print("Validation:", len(df_val))

# Function to move corresponding image and label files to destination
def move_files(df_subset, split_name):
    for _, row in df_subset.iterrows():
        base_filename = row['filename']
        # Determine source image file (look for common extensions)
        img_file = None
        for ext in ['.jpg', '.jpeg', '.png']:
            candidate = os.path.join(images_src, base_filename + ext)
            if os.path.exists(candidate):
                img_file = candidate
                break
        if img_file is None:
            print(f"Warning: No image file found for {base_filename}. Skipping.")
            continue
        
        # Determine source label file (assumed to be .txt)
        label_file = os.path.join(labels_src, base_filename + '.txt')
        if not os.path.exists(label_file):
            print(f"Warning: No label file found for {base_filename}. Skipping.")
            continue

        # Destination paths
        dest_img = os.path.join(base_folder, split_name, 'images', os.path.basename(img_file))
        dest_label = os.path.join(base_folder, split_name, 'labels', os.path.basename(label_file))
        
        # Move the files
        shutil.move(img_file, dest_img)
        shutil.move(label_file, dest_label)

# Move files for each split
move_files(df_train, 'train')
move_files(df_test, 'test')
move_files(df_val, 'val')

print("Files moved to train/test/val folders with corresponding images and labels.")
