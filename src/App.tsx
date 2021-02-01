import React from 'react';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App" aria-label="App container">
      <Main testProp={'lorem ipsum'} />
    </div>
  );
}

export default App;
