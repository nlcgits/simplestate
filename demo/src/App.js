import React from 'react';
import logo from './logo.svg';
import HelloButton from './Components/HelloButton';
import HelloButtonClass from './Components/HelloButtonClass';
import YoButton from './Components/YoButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloButton name="Avi" />
        <HelloButtonClass name="Jack" />
        <HelloButton name="Sam" />
        <HelloButtonClass name="Susie" />
        <HelloButton name="Rob" />
        <HelloButtonClass name="Albert" />
        <YoButton name="Max" />
        <YoButton name="Inga" />
        <YoButton name="Rachel" />
      </header>
    </div>
  );
}

export default App;