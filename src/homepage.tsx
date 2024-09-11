import React, { useState, useEffect } from 'react';
import Toggle from './toggle';
import { questions, shuffleArray } from './questions';
import './App.css';

const Homepage: React.FC = () => {
  const [shuffledQuestions] = useState(() => shuffleArray([...questions]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctnessRatio, setCorrectnessRatio] = useState(0);
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // useEffect hook to shuffle the options for the current question and reset selections.
  useEffect(() => {
    const shuffled = currentQuestion.options.map((optionSet: string[]) => shuffleArray(optionSet));
    
    // Update state with shuffled options and reset selected options to null.
    setShuffledOptions(shuffled);
    setSelectedOptions(new Array(currentQuestion.options.length).fill(null));
    
    // Reset feedback and correctness tracking.
    setIsCorrect(null);
    setIsLocked(false);
    setCorrectnessRatio(0); 
  }, [currentQuestionIndex]);

  // Function to handle when the user selects an option.
  const handleOptionClick = (toggleIndex: number, selectedIndex: number) => {
    if (!isLocked) { 
      const updatedOptions = [...selectedOptions];
      updatedOptions[toggleIndex] = selectedIndex;  // Update the selected option for the current toggle
      setSelectedOptions(updatedOptions);

      // Calculate the number of correct answers based on the user's selections.
      const totalCorrect = updatedOptions.reduce((count, selected, index) => {
        if (selected !== null && shuffledOptions[index][selected] === currentQuestion.correctAnswer[index]) {
          return count + 1;
        }
        return count;
      }, 0);

      // Calculate the correctness ratio (how many correct answers compared to total options).
      const correctRatio = totalCorrect / currentQuestion.options.length;
      setCorrectnessRatio(correctRatio);  // Update correctness ratio

      // Check if all options have been selected.
      const allSelected = updatedOptions.every(opt => opt !== null);
      if (allSelected) {
        // If all answers are selected, check if the answer is fully correct.
        const isAnswerCorrect = totalCorrect === currentQuestion.options.length;
        setIsCorrect(isAnswerCorrect); 
        setIsLocked(isAnswerCorrect); 
      } else {
        setIsCorrect(null);
      }
    }
  };

  // Function to move to the next question.
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);  // Move to the next question
    } else {
      alert('You’ve completed all questions!'); 
      window.location.reload();
    }
  };

  // Function to calculate the background gradient based on correctness ratio.
  const calculateBackgroundGradient = () => {
    const gradientStart = `rgba(255, 236, 210, ${1 - correctnessRatio})`;
    const gradientEnd = `rgba(252, 182, 159, ${correctnessRatio})`;
    return `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`;
  };

  return (
    <div className="homepage" style={{ background: calculateBackgroundGradient()}}>
      <h1>{currentQuestion.questionText}</h1>
      <div className="switch-container">
        {shuffledOptions.map((optionSet, toggleIndex) => (
          <Toggle
            key={toggleIndex} 
            options={optionSet}
            selectedOption={selectedOptions[toggleIndex]}
            onClick={(selectedIndex: number) => handleOptionClick(toggleIndex, selectedIndex)}
            disabled={isLocked} 
            correctnessRatio={correctnessRatio}
          />
        ))}
      </div>

      {/* Feedback message for correct/incorrect answers */}
      <div className="feedback-container">
        {isCorrect === false && <p className="error-message">The answer is incorrect</p>}
        {isCorrect && <p className="success-message">Correct! The answer is locked.</p>}
      </div>

      {/* Button to move to the next question, visible only when the answer is correct */}
      <div className="button-container">
        {isLocked && (
          <button className="next-button" onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default Homepage;
