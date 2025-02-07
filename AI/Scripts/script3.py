import os
import pandas as pd

# Define the class-to-ID mapping
class_mapping = {
    'horus': 0,
    'osiris': 1,
    'anubis': 2,
    'ra': 3
}

# Folder paths
labels_folder = '/Users/adithyasarma/Desktop/AI_Aspects/DatasetFiles/dataset/labels'
yolo_labels_folder = '/Users/adithyasarma/Desktop/AI_Aspects/DatasetFiles/dataset/yololabels'

# Ensure output folder exists
os.makedirs(yolo_labels_folder, exist_ok=True)

# Process each CSV file
for csv_file in os.listdir(labels_folder):
    if csv_file.endswith('.csv'):
        csv_path = os.path.join(labels_folder, csv_file)
        df = pd.read_csv(csv_path)

        # Prepare YOLO file
        yolo_filename = os.path.splitext(csv_file)[0] + '.txt'
        yolo_path = os.path.join(yolo_labels_folder, yolo_filename)

        with open(yolo_path, 'w') as yolo_file:
            for index, row in df.iterrows():
                # Get class ID
                class_name = row['class'].lower()
                class_id = class_mapping.get(class_name)
                
                if class_id is None:
                    print(f"Warning: Class '{class_name}' not found in mapping. Skipping.")
                    continue

                # Normalize coordinates
                width, height = row['width'], row['height']
                xmin, ymin, xmax, ymax = row['xmin'], row['ymin'], row['xmax'], row['ymax']
                
                x_center = ((xmin + xmax) / 2) / width
                y_center = ((ymin + ymax) / 2) / height
                bbox_width = (xmax - xmin) / width
                bbox_height = (ymax - ymin) / height

                # Write YOLO formatted data
                yolo_file.write(f"{class_id} {x_center:.6f} {y_center:.6f} {bbox_width:.6f} {bbox_height:.6f}\n")

print("Conversion completed successfully!")