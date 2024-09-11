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

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Shuffle options for each question and reset the state for selections
  useEffect(() => {
    const shuffled = currentQuestion.options.map((optionSet : string[]) => shuffleArray(optionSet));
    setShuffledOptions(shuffled);
    setSelectedOptions(new Array(currentQuestion.options.length).fill(null));  // Initialize selected options as null
    setIsCorrect(null);
    setIsLocked(false);
  }, [currentQuestionIndex]);

  // Handle toggle selection
  const handleOptionClick = (toggleIndex: number, selectedIndex: number) => {
    if (!isLocked) {
      const updatedOptions = [...selectedOptions];
      updatedOptions[toggleIndex] = selectedIndex;
      setSelectedOptions(updatedOptions);

      // Check if all answers are selected
      const allSelected = updatedOptions.every(opt => opt !== null);

      if (allSelected) {
        // Compare selected answer with correct answer (by matching the text)
        const isAnswerCorrect = updatedOptions.every((selected, index) => {
          const selectedAnswer = shuffledOptions[index][selected];  // Get selected answer text
          const correctAnswer = currentQuestion.correctAnswer[index];  // Get correct answer text
          return selectedAnswer === correctAnswer;  // Compare selected answer with correct one
        });

        setIsCorrect(isAnswerCorrect);
        setIsLocked(isAnswerCorrect);  // Lock if correct
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
      window.location.reload()
    }
  };

  return (
    <div className="game-container">
      <h1 className='fw-bold'>{currentQuestion.questionText}</h1>
      <div className="switch-container">
        {shuffledOptions.map((optionSet, toggleIndex) => (
          <Toggle
            key={toggleIndex}
            options={optionSet}
            selectedOption={selectedOptions[toggleIndex]}
            onClick={(selectedIndex: number) => handleOptionClick(toggleIndex, selectedIndex)}
            disabled={isLocked}
          />
        ))}
      </div>
      <div className="feedback-container">
        {isCorrect === false && <p className="incorrect-message">The answer is incorrect</p>}
        {isCorrect && <p className="correct-message">Correct! The answer is locked.</p>}
      </div>
      <div className='button-container'>
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
