export type Question = {
  questionText: string;   
  options: string[][];   
  correctAnswer: string [];
};

// Utility function to shuffle the order of any array elements.
export const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const questions: Question[] = [
  {
    questionText: "An animal cell contains:",
    options: [
      ["Cell wall", "Ribosomes"],      
      ["Cytoplasm", "Chloroplast"], 
      ["Cellulose", "Mitochondria"] 
    ],
    correctAnswer: ["Ribosomes", "Cytoplasm", "Mitochondria"] 
  },
  {
    questionText: "Which are the best sports people & teams?",
    options: [
      ["Liverpool", "Man Utd", "Chelsea"],   
      ["Serena Williams", "Naomi Osaka"]   
    ],  
    correctAnswer: ["Man Utd", "Serena Williams"]
  },
  {
    questionText: "What are the ideal conditions inside an office?",
    options: [
      ["Bad pay", "Good pay"],                 
      ["Free coffee", "Expensive coffee"],        
      ["Bear in office", "Dog in office"],     
      ["Lot of meetings", "Less meetings"]       
    ],
    correctAnswer: ["Good pay", "Free coffee", "Dog in office", "Less meetings"]
  }
];
