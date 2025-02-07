import React, { useState } from 'react';
import CitySelector from './components/CitySelector';
import ImageUpload from './components/ImageUpload';
import DetectionResult from './components/DetectionResult';

// Aircraft data categorized by region
const aircraftData = {
  "Horus": ["F‑117", "F‑14", "F‑15", "F‑16", "F‑22", "F‑35", "F‑4", "F‑18", "J‑10", "J‑20", "J‑35", "JAS‑39", "JF‑17", "Mig‑29", "Mig‑31", "Su‑57", "Mirage2000", "Rafale", "KF‑21", "YF‑23", "EF‑2000"],
  "Osiris": ["A‑10", "Su‑34", "AV‑8B", "Vulcan", "B‑1", "B‑2", "B‑21", "Tornado", "Tu‑22M", "Tu‑95", "XB‑70", "Su‑24", "Su‑25", "H‑6", "Tu‑160", "JH‑7", "B‑52"],
  "Anubis": ["FA‑400M", "AG‑600", "An‑124", "An‑22", "An‑225", "An‑72", "C‑130", "C‑17", "C‑2", "C‑390", "C‑5", "KC‑135", "KJ‑600", "P‑3", "SR‑71", "U‑2", "US‑2", "V‑22", "Y‑20", "E‑2", "E‑7", "Be‑200", "WZ‑7"],
  "Ra": ["AH‑64", "CH‑47", "CL‑415", "Ka‑27", "Ka‑52", "Mi‑24", "Mi‑26", "Mi‑28", "Mi‑8", "UH‑60", "Z‑19", "MQ‑9", "RQ‑4", "TB‑001", "TB‑2", "KAAN"]
};

function App(){
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAircraftTable, setShowAircraftTable] = useState(false);

  // Function to handle image upload and send it to the backend
  const handleImageUpload = async (file) =>{
    setSelectedImage(file);
    setIsProcessing(true);
    setDetectionResult(null);
    try{
      const formData = new FormData();
      formData.append('image', file);
      formData.append('city', selectedCity);
      const response = await fetch('http://localhost:8000/api/detect', {
        method: 'POST',
        body: formData,
      });
      if(!response.ok){
        throw new Error('Detection failed');
      }
      const data = await response.json();
      setDetectionResult({
        hasAircraft: data.has_aircraft,
        isEnemy: data.is_enemy,
        confidence: data.confidence,
        detected_city: data.detected_city,
        image_url: data.image_url,
      });
    }
    catch(error){
      console.error('Error during detection:', error);
      alert('Failed to process image. Please try again.');
    }
    finally{
      setIsProcessing(false);
    }
  };

  return(
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-800 text-amber-100">
      {/* Header Section */}
      <header className="py-6 px-4 bg-amber-950/50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Pharaoh Finder</h1>
          </div>
          {/* Toggle Button for Aircraft Data Table */}
          <button
            onClick={() => setShowAircraftTable(!showAircraftTable)}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors"
          >
            {showAircraftTable ? 'Hide Aircraft Data' : 'Show Aircraft Data'}
          </button>
        </div>
      </header>

      {/* Aircraft Data Table */}
      {showAircraftTable && (
        <div className="mb-8 bg-amber-950/30 p-6 rounded-lg backdrop-blur-sm shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Aircraft by Region</h2>
          <table className="w-full border-collapse border border-amber-700">
            <thead>
              <tr className="bg-amber-700">
                <th className="border border-amber-600 px-4 py-2">Region</th>
                <th className="border border-amber-600 px-4 py-2">Aircraft</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(aircraftData).map(([region, aircrafts]) => (
                <tr key={region} className="odd:bg-amber-800 even:bg-amber-700">
                  <td className="border border-amber-600 px-4 py-2 font-semibold">{region}</td>
                  <td className="border border-amber-600 px-4 py-2">{aircrafts.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
