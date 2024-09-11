import React from 'react';
import './App.css';
interface ToggleProps {
  options: string[];  // Array of options (text) for the toggle
  selectedOption: number | null;  // Index of the currently selected option; null if nothing is selected
  onClick: (index: number) => void;  // Function to handle when an option is clicked
  disabled: boolean;  // Boolean to disable the toggle when the question is locked or completed
  correctnessRatio: number;  // Ratio to indicate how correct the user's answers are, used to adjust the background gradient
}

const Toggle: React.FC<ToggleProps> = ({ options, selectedOption, onClick, disabled, correctnessRatio }) => {
  return (
    // The outer container of the toggle switch, applying a gradient background based on the correctness ratio
    <div className={`toggle-switch ${disabled ? 'disabled' : ''}`} 
         style={{ 
           background: `linear-gradient(135deg, rgba(255, 218, 185, ${correctnessRatio}), rgba(173, 216, 230, ${1 - correctnessRatio}))` 
         }}>
      {options.map((option, index) => (
        <button
          key={index}  // Unique key for each option in the array
          className={`option ${selectedOption === index ? 'selected' : ''}`}
          onClick={() => onClick(index)}
          disabled={disabled}
          style={{
            // Apply a different background color based on whether the option is selected or not, using the correctness ratio
            background: selectedOption === index
              ? `rgba(173, 216, 230, ${correctnessRatio})`
              : `rgba(255, 218, 185, ${1 - correctnessRatio})`,
            color: selectedOption === index ? '#000' : '#333'
          }}
        >
          {option} 
        </button>
      ))}
    </div>
  );
};

export default Toggle;
