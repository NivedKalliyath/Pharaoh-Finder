import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
 
function DetectionResult({ result, cityName }) {
  return (
    <div className={`p-6 rounded-lg ${
      result.hasAircraft && result.isEnemy
        ? 'bg-red-900/50'
        : result.hasAircraft
        ? 'bg-green-900/50'
        : 'bg-amber-900/50'
    }`}>
      <div className="flex items-center gap-4">
        {result.hasAircraft ? (
          result.isEnemy ? (
            <AlertTriangle className="w-8 h-8 text-red-400" />
          ) : (
            <Shield className="w-8 h-8 text-green-400" />
          )
        ) : (
          <Shield className="w-8 h-8 text-amber-400" />
        )}
        
        <div>
          <h3 className="text-xl font-bold mb-2">Detection Results</h3>
          {result.hasAircraft ? (
            result.isEnemy ? (
              <div>
                <p className="text-red-200 mb-2">
                  ⚠️ WARNING: Enemy aircraft detected! This aircraft belongs to {result.detected_city}.
                </p>
                <p className="text-red-300 text-sm">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            ) : (
              <div>
                <p className="text-green-200 mb-2">
                  ✓ Friendly aircraft detected. Confirmed {cityName} aircraft.
                </p>
                <p className="text-green-300 text-sm">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            )
          ) : (
            <p className="text-amber-200">
              No aircraft detected in the image.
            </p>
          )}
        </div>
      </div>
 
      {/* Display Image with Bounding Box */}
      {result.image_url && (
        <div className="mt-4">
          <img src={result.image_url} alt="Detection Result" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
 
export default DetectionResult;