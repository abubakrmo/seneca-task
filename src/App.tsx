import React from 'react';
import './App.css';
import Homepage from './homepage';


const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content container">
        <Homepage/>
      </div>
    </div>
  );
};

export default App;
