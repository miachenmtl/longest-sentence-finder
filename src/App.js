import React, { useState } from 'react';

import Answer from './Answer';
import findLongestSentence from './findLongestSentence';
import './App.css';

const App = () => {
  const [inputText, updateInputText] = useState('');
  const [answer, updateAnswer] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>
          Longest Sentence Finder
        </h1>
      </header>

      <label htmlFor="input">
        Paste text here:
      </label>
      <br />
      <textarea
        id="input"
        name="input"
        rows={20}
        cols={100}
        onChange={
          (event) => updateInputText(event.target.value)
        }
      />
      <br />
      <br />
      <button type="button" onClick={() => findLongestSentence(inputText, updateAnswer)}>
        Find the longest sentence!
      </button>
      <Answer answer={answer} />
      <footer className="footer">
      </footer>
    </div>
  );
}

export default App;
