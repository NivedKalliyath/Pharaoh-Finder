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
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Select Your City</h3>
      {/* Grid layout for city buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Loop through the cities array and generate buttons */}
        {cities.map((city) => (
          <button
            key={city.id} // Each button needs a unique key
            onClick={() => onSelectCity(city.id)} // Update the selected city when clicked
            className={`p-4 rounded-lg transition-all duration-300 ${
              selectedCity === city.id
                ? 'bg-amber-600 text-amber-50' // Highlight selected city
                : 'bg-amber-950/40 hover:bg-amber-800/40' // Default style with hover effect
            }`}
          >
            {/* City name with an icon */}
            <div className="flex items-center gap-2 mb-2">
              <Pyramid className="w-5 h-5" />
              <span className="font-bold">{city.name}</span>
            </div>

            {/* Short description of the city */}
            <p className="text-sm opacity-80">{city.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CitySelector;
