'use client';

import React, { useState } from 'react';

interface ColorPickerProps {
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker({ 
  label, 
  value = '#000000', 
  onChange 
}: ColorPickerProps) {
  const [color, setColor] = useState(value);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange && onChange(newColor);
  };

  return (
    <div className="flex items-center space-x-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input 
          type="color" 
          value={color}
          onChange={handleColorChange}
          className="h-10 w-14 p-1 border rounded cursor-pointer"
        />
        <span className="ml-2 text-sm text-gray-600">{color}</span>
      </div>
    </div>
  );
}
