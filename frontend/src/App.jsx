// Import Dependencies
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import CitySelector from './components/CitySelector';
import ImageUpload from './components/ImageUpload';
import DetectionResult from './components/DetectionResult';

function App(){
  const [selectedCity, setSelectedCity] = useState(''); // State to keep track of the selected city
  const [selectedImage, setSelectedImage] = useState(null); // State to store the uploaded image
  const [detectionResult, setDetectionResult] = useState(null); // State to store the detection results (enemy or not)
  const [isProcessing, setIsProcessing] = useState(false); // State to indicate if the system is processing an image
  
  // Function to handle image upload and send it to the backend
  const handleImageUpload = async (file) =>{
    setSelectedImage(file); // Store the uploaded image in state
    setIsProcessing(true); // Show loading indicator
    setDetectionResult(null); // Reset previous results

    try{
      const formData = new FormData();
      formData.append('image', file); // Attach the image file
      formData.append('city', selectedCity); // Attach selected city info

      // Send the image and city to the backend for processing
      const response = await fetch('http://localhost:8000/api/detect/', {
        method: 'POST',
        body: formData,
      });

      if(!response.ok){
        throw new Error('Detection failed'); // Throw an error if the request fails
      }

      // Parse the response from the backend
      const data = await response.json();

      // Store detection results in state
      setDetectionResult({
        hasAircraft: data.has_aircraft, // Whether an aircraft is detected
        isEnemy: data.is_enemy, // Whether aircraft is enemy
      });
    }
    catch(error){
      console.error('Error during detection:', error);
      alert('Failed to process image. Please try again.'); // Show an alert if something goes wrong
    }
    finally{
      setIsProcessing(false); // Hide loading indicator
    }
  };

  return(
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-800 text-amber-100">
      {/* Header Section */}
      <header className="py-6 px-4 bg-amber-950/50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Pharaoh Finder</h1>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-950/30 p-8 rounded-lg backdrop-blur-sm shadow-xl">
            {/* Section Title */}
            <h2 className="text-3xl font-bold mb-8 text-center">
              Aircraft Detection System
            </h2>
            {/* City Selector Component */}
            <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
            {/* Show Image Upload component only if a city is selected */}
            {selectedCity && (
              <ImageUpload onImageUpload={handleImageUpload} isProcessing={isProcessing} />
            )}
            {/* Show Detection Result component only if an image has been processed */}
            {detectionResult && selectedImage && (
              <DetectionResult result={detectionResult} cityName={selectedCity} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;