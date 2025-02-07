import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory
 
app = Flask(__name__)
CORS(app)
 
@app.route('/results/<filename>')
def get_result_image(filename):
    return send_from_directory(RESULTS_FOLDER, filename)
 
 
UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)
 
try:
    weights_path = 'models/best.pt'
    model = YOLO(weights_path)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
 
@app.route('/api/detect', methods=['POST'])
def detect_aircraft():
    try:
        if not model:
            return jsonify({'error': 'Model failed to load'}), 500
 
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
 
        image = request.files['image']
        city = request.form.get('city', '').strip()
 
        if not image or not city:
            return jsonify({'error': 'Image and city are required'}), 400
 
        filename = secure_filename(image.filename)
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        result_image_path = os.path.join(RESULTS_FOLDER, filename)
        image.save(image_path)
 
        results = model(image_path)
        detections = results[0]
        has_aircraft = len(detections.boxes) > 0
 
        detected_city = None
        confidence = None
        boxes = []
 
        if has_aircraft:
            img = cv2.imread(image_path)
 
            for box in detections.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                class_id = int(box.cls[0])
                confidence_value = box.conf.tolist()
                confidence = float(confidence_value[0]) if confidence_value else 0.0
                detected_city = detections.names[class_id]
 
                # Draw bounding box
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(img, f"{detected_city} {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
 
                boxes.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2})
 
            cv2.imwrite(result_image_path, img)
 
        is_enemy = has_aircraft and detected_city.lower() != city.lower()
 
        os.remove(image_path)
 
        return jsonify({
            'has_aircraft': has_aircraft,
            'is_enemy': is_enemy,
            'detected_city': detected_city,
            'confidence': confidence,
            'image_url': f'http://localhost:8000/results/{filename}',  # URL for the processed image
            'boxes': boxes
        })
 
    except Exception as e:
        return jsonify({'error': str(e)}), 500
 
if __name__ == '__main__':
    app.run(debug=True, port=8000)