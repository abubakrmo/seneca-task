// ToggleGame.tsx
import React, { useState, useEffect } from 'react';
import Toggle from './toggle';
import { questions, shuffleArray } from './questions';
import './App.css';

const Homepage: React.FC = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleArray([...questions]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctnessRatio, setCorrectnessRatio] = useState(0);  // Track proportion of correct answers

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Shuffle options for each question and reset the state for selections
  useEffect(() => {
    const shuffled = currentQuestion.options.map((optionSet : string[]) => shuffleArray(optionSet));
    setShuffledOptions(shuffled);
    setSelectedOptions(new Array(currentQuestion.options.length).fill(null));  // Initialize selected options as null
    setIsCorrect(null);
    setIsLocked(false);
    setCorrectnessRatio(0);  // Reset the correctness ratio for the new question
  }, [currentQuestionIndex]);

  // Handle toggle selection and update background proportionally
  const handleOptionClick = (toggleIndex: number, selectedIndex: number) => {
    if (!isLocked) {
      const updatedOptions = [...selectedOptions];
      updatedOptions[toggleIndex] = selectedIndex;
      setSelectedOptions(updatedOptions);

      // Calculate how correct the current selection is
      const totalCorrect = updatedOptions.reduce((count, selected, index) => {
        if (selected !== null && shuffledOptions[index][selected] === currentQuestion.correctAnswer[index]) {
          return count + 1;
        }
        return count;
      }, 0);

      const correctRatio = totalCorrect / currentQuestion.options.length;  // Ratio of correct answers
      setCorrectnessRatio(correctRatio);  // Update the correctness ratio

      // Check if all answers are selected and correct
      const allSelected = updatedOptions.every(opt => opt !== null);
      if (allSelected) {
        const isAnswerCorrect = totalCorrect === currentQuestion.options.length;
        setIsCorrect(isAnswerCorrect);
        setIsLocked(isAnswerCorrect);  // Lock if all correct
      } else {
        setIsCorrect(null);  // Reset correctness if not all toggles are selected
      }
    }
  };

  // Move to the next question
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      alert('You’ve completed all questions!');
    }
  };

  // Function to determine the background gradient based on correctness ratio
  const calculateBackgroundGradient = () => {
    // Transitioning from a light peach to a light blue gradient in proportion to correctness
    const gradientStart = `#ffecd2, ${1 - correctnessRatio})`; // Lighter peach
    const gradientEnd = `#fcb69f, ${correctnessRatio})`; // Softer transition with the peach tone
    return `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`;
  };

  return (
    <div className="game-container" style={{ background: calculateBackgroundGradient() }}>
      <h1>{currentQuestion.questionText}</h1>
      <div className="switch-container">
        {shuffledOptions.map((optionSet, toggleIndex) => (
          <Toggle
            key={toggleIndex}
            options={optionSet}
            selectedOption={selectedOptions[toggleIndex]}
            onClick={(selectedIndex: number) => handleOptionClick(toggleIndex, selectedIndex)}
            disabled={isLocked}
            correctnessRatio={correctnessRatio}  // Pass correctness ratio to the toggle for synced styling
          />
        ))}
      </div>
      <div className="feedback-container">
        {isCorrect === false && <p className="error-message">The answer is incorrect</p>}
        {isCorrect && <p className="success-message">Correct! The answer is locked.</p>}
      </div>
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
