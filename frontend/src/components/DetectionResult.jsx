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
              <p className="text-red-200">
                ⚠️ WARNING: Enemy aircraft detected! This aircraft does not match {cityName}'s defensive pattern.
              </p>
            ) : (
              <p className="text-green-200">
                ✓ Friendly aircraft detected. Aircraft matches {cityName}'s defensive pattern.
              </p>
            )
          ) : (
            <p className="text-amber-200">
              No aircraft detected in the image.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetectionResult;