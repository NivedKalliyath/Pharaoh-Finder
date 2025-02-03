// Import Dependencies
import React from 'react';
import { Pyramid } from 'lucide-react';

// List of cities
const cities = [
  { id: 'ra', name: 'Ra', description: 'City of the Sun God' },
  { id: 'horus', name: 'Horus', description: 'City of the Sky God' },
  { id: 'bastet', name: 'Bastet', description: 'City of the Cat Goddess' },
  { id: 'anubis', name: 'Anubis', description: 'City of the Death God' },
  { id: 'osiris', name: 'Osiris', description: 'City of the Afterlife' },
];

// CitySelector component
function CitySelector({ selectedCity, onSelectCity }){
  const firstRow = cities.slice(0, 3);
  const secondRow = cities.slice(3);
  return(
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <h3 className="text-xl font-semibold mb-4">Select Your City</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
        {firstRow.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                selectedCity === city.id
                  ? 'bg-amber-600 text-amber-50'
                  : 'bg-amber-950/40 hover:bg-amber-800/40'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Pyramid className="w-5 h-5" />
                <span className="font-bold">{city.name}</span>
              </div>
              <p className="text-sm opacity-80">{city.description}</p>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 w-2/3 mx-auto">
          {secondRow.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                selectedCity === city.id
                  ? 'bg-amber-600 text-amber-50'
                  : 'bg-amber-950/40 hover:bg-amber-800/40'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Pyramid className="w-5 h-5" />
                <span className="font-bold">{city.name}</span>
              </div>
              <p className="text-sm opacity-80">{city.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CitySelector;
