import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

function ImageUpload({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Upload Aircraft Image</h3>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-amber-400 bg-amber-950/50' : 'border-amber-700 bg-amber-950/30'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              onClick={() => {
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="mt-4 px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors"
            >
              Clear Image
            </button>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 opacity-50" />
              <div>
                <p className="mb-2">Drag and drop your image here, or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors"
                >
                  Browse Files
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;