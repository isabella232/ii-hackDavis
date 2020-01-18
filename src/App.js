import React from 'react';
import Navigation from './Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation></Navigation>
        <p>
          Indigenous Interpreters
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
