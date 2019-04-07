
// Zero or one open parenthesis
// One or more of anything that is not '(.?!'
// '.!?'
// Zero or one closed parenthesis
export const splitInputTextByStopPunctuation = inputText =>
  inputText.match(/[^.?!]+[.!?]+[\])'"`’”]*/g);

export const generateIndicesOfSentencesToSplice = (sentences) => {
  let toBeSplicedIndices = [];
  sentences.forEach((sentence, i) => {
    const isEndingWithTitle = !!sentence.match(/[ ]+[A-Z][a-z]{0,2}\./);
    if (isEndingWithTitle) {
      toBeSplicedIndices.push(i);
    } else {
      const isEndingInNumber = !!sentence.match(/\d\.$/);
      const hasDecimalPlaces = i < sentences.length - 1 ? !!sentences[i + 1].match(/^\d/) : false;
      if (isEndingInNumber && hasDecimalPlaces) {
        toBeSplicedIndices.push(i);
      } else {
        const isEndingInInitial = !!sentence.match(/[ ][a-zA-Z]\.$/);
        const isInitial = !!sentence.match(/^[a-zA-Z]\.$/) && i < sentences.length - 1;
        const isInitialism = isEndingInInitial || isInitial;
        if (isInitialism) toBeSplicedIndices.push(i);
      }
    }
  });
  return toBeSplicedIndices;
}

export const spliceSentences = (splitText, toBeSplicedIndices) => {
  for (let i = toBeSplicedIndices.length - 1; i >= 0; i -= 1) {
    if (i !== toBeSplicedIndices.length - 1 || toBeSplicedIndices[i] < splitText.length - 1) {
      const fullSentence = splitText.slice(toBeSplicedIndices[i], toBeSplicedIndices[i] + 2).join('');
      splitText.splice(toBeSplicedIndices[i], 2, fullSentence);
    }
  }
}

export const getLongestSentences = splitText => {
  let longestSentences =  [''];
  let maxLength = 0;
  splitText.forEach(sentence => {
    const isBigger = sentence.length > maxLength;
    if (isBigger) {
      maxLength = sentence.length;
      longestSentences = [sentence];
    } else {
      const isEqual = sentence.length === maxLength;
      if (isEqual) {
        longestSentences.push(sentence);
      }
    }
  });
  return longestSentences;
}


const findLongestSentence = (inputText, setLongestSentences) => {
  const splitText = splitInputTextByStopPunctuation(inputText);
  if (!splitText) {
    window.alert('You must enter at least one sentence');
    return;
  }

  const toBeSplicedIndices = generateIndicesOfSentencesToSplice(splitText);

  spliceSentences(splitText, toBeSplicedIndices);

  const longestSentences = getLongestSentences(splitText);

  setLongestSentences(longestSentences);
}

export default findLongestSentence;
