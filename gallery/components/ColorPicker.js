import React, { useState } from 'react';
import HexColorPicker from 'react-colorful';

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    onChange(newColor);
  };

  return (
    <div className="relative">
      <div
        className="w-16 h-16 bg-gray-300 cursor-pointer hover:bg-gray-400"
        style={{ backgroundColor: color }}
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
      >
        yo
        {showPicker && (
          <div className="absolute left-0 z-10 top-full">
            <HexColorPicker color={color} onChange={handleColorChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;