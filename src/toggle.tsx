// Toggle.tsx
import React from 'react';
import './App.css';

interface ToggleProps {
  options: string[];
  selectedOption: number | null;  // null if not selected
  onClick: (index: number) => void;
  disabled: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ options, selectedOption, onClick, disabled }) => {
  return (
    <div className={`toggle-switch ${disabled ? 'disabled' : ''}`}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`option ${selectedOption === index ? 'selected' : ''}`}
          onClick={() => onClick(index)}
          disabled={disabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Toggle;
