import os
import shutil

# Path to your dataset directory
dataset_path = '/Users/adithyasarma/Desktop/AI_Aspects/DatasetFiles/dataset'  # Change this to your dataset path

# Create subfolders for images and labels
images_folder = os.path.join(dataset_path, 'images')
labels_folder = os.path.join(dataset_path, 'labels')

os.makedirs(images_folder, exist_ok=True)
os.makedirs(labels_folder, exist_ok=True)

# Supported image extensions
image_extensions = ('.jpg', '.jpeg', '.png')

# Loop through all files in the dataset directory
for file_name in os.listdir(dataset_path):
    file_path = os.path.join(dataset_path, file_name)

    # Skip if it's already in images/labels folders
    if file_path in [images_folder, labels_folder]:
        continue

    # Move image files
    if file_name.lower().endswith(image_extensions):
        shutil.move(file_path, os.path.join(images_folder, file_name))

    # Move CSV label files
    elif file_name.lower().endswith('.csv'):
        shutil.move(file_path, os.path.join(labels_folder, file_name))

print("Dataset organized into 'images' and 'labels' folders successfully.")
