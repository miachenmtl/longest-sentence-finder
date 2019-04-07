
// Zero or one open parenthesis
// One or more of anything that is not '(.?!'
// '.!?'
// Zero or one closed parenthesis
const splitInputTextByStopPunctuation = inputText =>
  inputText.match(/\(?[^(.?!]+[.!?]\)?/g);

const generateIndicesOfSentencesToSplice = (sentences) => {
  let toBeSplicedIndices = [];
  sentences.forEach((sentence, i) => {
    const isEndingWithTitle = sentence.match(/[ ]+[A-Z][^(.?!]{0,2}\./);
    if (isEndingWithTitle) {
      toBeSplicedIndices.push(i);
    } else {
      const isEndingInNumber = sentence.match(/\d\.$/);
      const hasDecimalPlaces = i < sentences.length - 1 ? !!sentences[i + 1].match(/^\d/) : false;
      if (isEndingInNumber && hasDecimalPlaces) {
        toBeSplicedIndices.push(i);
      } else {
        const isInitialism = !!sentence.match(/[ ]+\w.$/) || !!sentence.match(/^\w\.$/);
        if (isInitialism) toBeSplicedIndices.push(i);
      }
    }
  });
  return toBeSplicedIndices;
}

const spliceSentences = (splitText, toBeSplicedIndices) => {
  for (let i = toBeSplicedIndices.length - 1; i >= 0; i -= 1) {
    if (i !== toBeSplicedIndices.length - 1 || toBeSplicedIndices[i] < splitText.length - 1) {
      const fullSentence = splitText.slice(toBeSplicedIndices[i], toBeSplicedIndices[i] + 1);
      console.log(fullSentence);
      splitText.splice(i, 2, fullSentence);
    }
  }
}

const getLongestSentencesAnswer = splitText => splitText.reduce(
  (acc, cur, i) => {
    if (i === 1) {
      acc = {
        maxLength : splitText[0].length,
        longestSentences: [splitText[0]]
      };
    }

    const isBigger = cur.length > acc.maxLength;
    if (isBigger) {
      acc.maxLength = cur.length;
      acc.longestSentences = [splitText[i]];
    } else {
      const isEqual = cur.length === acc.maxLength;
      if (isEqual) {
        acc.longestSentences.push(splitText[i]);
      }
    }

    return acc;
  }
)

const findLongestSentence = (inputText) => {
  const splitText = splitInputTextByStopPunctuation(inputText);
  console.log(splitText);

  const toBeSplicedIndices = generateIndicesOfSentencesToSplice(splitText);

  spliceSentences(splitText, toBeSplicedIndices);

  const { longestSentences, maxLength } = getLongestSentencesAnswer(splitText);

  console.log(longestSentences);
  console.log(maxLength);
}

export default findLongestSentence;
