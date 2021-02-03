import React from 'react';
import './App.css';
import Main from './features/main/Main';
import Counter from './features/counter/Counter';

function App() {
  return (
    <div className="App" aria-label="App container">
      <Main testProp={'lorem ipsum'} />
      <Counter />
    </div>
  );
}

export default App;
