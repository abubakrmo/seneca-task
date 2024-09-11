// Toggle.tsx
import React from 'react';
import './App.css';

interface ToggleProps {
  options: string[];
  selectedOption: number | null;  // null if not selected
  onClick: (index: number) => void;
  disabled: boolean;
  correctnessRatio: number;  // Pass the correctness ratio to sync toggle with background
}

const Toggle: React.FC<ToggleProps> = ({ options, selectedOption, onClick, disabled, correctnessRatio }) => {
  return (
    <div className={`toggle-switch ${disabled ? 'disabled' : ''}`} 
         style={{ background: `linear-gradient(135deg, rgba(255, 218, 185, ${correctnessRatio}), rgba(173, 216, 230, ${1 - correctnessRatio}))` }}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`option ${selectedOption === index ? 'selected' : ''}`}
          onClick={() => onClick(index)}
          disabled={disabled}
          style={{
            background: selectedOption === index
              ? `rgba(173, 216, 230, ${correctnessRatio})`
              : `rgba(255, 218, 185, ${1 - correctnessRatio})`,
            color: selectedOption === index ? '#000' : '#333'  // Adjust color for selected vs unselected options
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Toggle;
