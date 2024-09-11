export type Question = {
    questionText: string;
    correctAnswer: boolean[];
  };
  
  export const questionSets: Question[] = [
    {
      questionText: 'Is the combination correct?',
      correctAnswer: [true, false, true],
    },
    {
      questionText: 'Which toggle is active?',
      correctAnswer: [false, true, false],
    },
    {
      questionText: 'Are all toggles off?',
      correctAnswer: [false, false, false],
    },
  ];
  
  export const getRandomizedQuestions = (): Question[] => {
    return questionSets.sort(() => Math.random() - 0.5);
  };
  