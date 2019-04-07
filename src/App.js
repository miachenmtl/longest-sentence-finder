import React, { useState } from 'react';

import findLongestSentence from './findLongestSentence';
import './App.css';

const App = () => {
  const [inputText, updateInputText] = useState('');

  return (
    <div className="App">

      <h1>
        Longest Sentence Finder
      </h1>


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
      <button type="button" onClick={() => findLongestSentence(inputText)}>
        Find the longest sentence!
      </button>

      <footer className="footer">
      </footer>

    </div>
  );
}

export default App;
