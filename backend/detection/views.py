import os
import io
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from ultralytics import YOLO
from PIL import Image

# Load YOLOv8 model with the correct path
MODEL_PATH = os.path.join(settings.BASE_DIR, 'detection', 'models', 'best.pt')
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = YOLO(MODEL_PATH)

@api_view(['POST'])
def detect_aircraft(request):
    if 'image' not in request.FILES:
        return JsonResponse({'error': 'No image provided'}, status=400)
    
    image_file = request.FILES['image']
    image = Image.open(io.BytesIO(image_file.read()))

    # Run YOLOv8 detection
    results = model(image)
    
    # Process results
    has_aircraft = len(results[0].boxes) > 0
    is_enemy = False

    if has_aircraft:
        # Get the predicted class (Modify based on your training class labels)
        predicted_class = results[0].boxes[0].cls.item()
        is_enemy = predicted_class == 1  # Adjust based on your class mapping

    return JsonResponse({
        'has_aircraft': has_aircraft,
        'is_enemy': is_enemy
    })
