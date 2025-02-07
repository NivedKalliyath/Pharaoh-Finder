import os
import numpy as np
from ultralytics import YOLO

# Update these paths as needed
test_images_folder = "/Users/adithyasarma/Desktop/testimages"   # Folder containing your test images
model_path = "/Users/adithyasarma/Desktop/AI_Aspects/75EpochModel/ModelWeights/best.pt"                # Path to your YOLO model (last.pt)

# Allowed image extensions
image_extensions = (".jpg", ".jpeg", ".png")

# Load the YOLO model
model = YOLO(model_path)

# Lists to hold summary information
correct_classifications = []
wrong_classifications = []

# Process each image in the test images folder
for filename in os.listdir(test_images_folder):
    if not filename.lower().endswith(image_extensions):
        continue

    image_path = os.path.join(test_images_folder, filename)
    
    # Extract expected class from filename:
    # Assume filename format: "aircraft-classname.jpg"
    base_filename = os.path.splitext(filename)[0]
    parts = base_filename.split("-")
    if len(parts) < 2:
        print(f"Filename '{filename}' does not match expected format (aircraft-classname). Skipping.")
        continue
    expected_class = parts[-1].lower()  # Use the part after the last hyphen

    # Run inference on the image
    results = model(image_path)
    result = results[0]  # Assuming the first result is the one we need
    
    # Check if any detections were returned
    if not result.boxes or len(result.boxes) == 0:
        print(f"{filename}: No detections found. Expected '{expected_class}'.")
        wrong_classifications.append(filename)
        continue

    # Get confidences and predicted class IDs from detections
    confidences = result.boxes.conf.cpu().numpy()       # Detection confidences
    predicted_ids = result.boxes.cls.cpu().numpy()        # Class indices
    best_index = np.argmax(confidences)                   # Index of highest confidence detection

    # Use the model's names mapping to get the predicted class name
    predicted_class = result.names[int(predicted_ids[best_index])].lower()

    # Compare prediction with expected class
    if predicted_class == expected_class:
        print(f"{filename}: Correct classification. Expected and detected: '{predicted_class}'.")
        correct_classifications.append(filename)
    else:
        print(f"{filename}: Wrong classification. Expected: '{expected_class}', Detected: '{predicted_class}'.")
        wrong_classifications.append(filename)

# Print summary after processing all images
print("\nSummary:")
print("Correctly classified images:")
for img in correct_classifications:
    print(f"  - {img}")

print("Wrongly classified images:")
for img in wrong_classifications:
    print(f"  - {img}")
