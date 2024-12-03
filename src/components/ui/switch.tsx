'use client';

import React, { useState } from 'react';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ 
  label, 
  checked: controlledChecked, 
  onChange, 
  disabled = false 
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(controlledChecked || false);

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !internalChecked;
    
    if (onChange) {
      onChange(newChecked);
    } else {
      setInternalChecked(newChecked);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {label && (
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={controlledChecked ?? internalChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent transition-colors 
          duration-200 ease-in-out focus:outline-none focus:ring-2 
          focus:ring-primary focus:ring-offset-2
          ${
            (controlledChecked ?? internalChecked) 
              ? 'bg-primary' 
              : 'bg-gray-200'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform 
            rounded-full bg-white shadow ring-0 transition 
            duration-200 ease-in-out
            ${
              (controlledChecked ?? internalChecked) 
                ? 'translate-x-5' 
                : 'translate-x-0'
            }
          `}
        />
      </button>
    </div>
  );
}
