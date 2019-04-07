import PropTypes from 'prop-types';
import React from 'react';

const Answer = ({ answer }) => {
  const { length } = answer;
  if (length === 0) return null;
  const charLength = answer[0].length;
  let message = '';
  if (length > 1) message += 'It\'s a tie! The longest sentences have ';
  else message += 'The longest sentence has ';
  message += `${charLength} characters.\n`;
  message += length > 1 ? 'They are:\n' : 'It is:\n';
  return (
    <div>
      <p>
        {message}
      </p>
      <ul>
        {answer.map((sentence, i) => (
          <li key={i}>
            {sentence}
          </li>
        ))}
      </ul>
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default Answer;
