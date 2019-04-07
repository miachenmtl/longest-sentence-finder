import findLongestSentence, {
  splitInputTextByStopPunctuation,
  generateIndicesOfSentencesToSplice,
  spliceSentences,
  getLongestSentences
} from './findLongestSentence';

describe('Test suite for splitInputTextByStopPunctuation private function', () => {
  it('should split the input string into substrings based on \'.!?', () => {
    const testString = '(Recorded [None the less].) [It’s preferable somehow.]'
      + ' \'Somewhere as it stands.\' ([As it comes my life.]) My moments not the'
      + ' millionth part... All lost (nearly all someone) listening another'
      + ' noting or the same.';
    const expected = [
      '(Recorded [None the less].)',
      ' [It’s preferable somehow.]',
      ' \'Somewhere as it stands.\'',
      ' ([As it comes my life.])',
      ' My moments not the millionth part...',
      ' All lost (nearly all someone) listening another noting or the same.'
    ];
    const actual = splitInputTextByStopPunctuation(testString);
    expect(actual).toEqual(expected);
  });
});

describe('Test suite for generateIndicesOfSentencesToSplice private function', () => {
  it('should flag strings that end in a potential title of personal address', () => {
    const testString = '(Recorded [None the Ms. less].) [It’s preferable somehow.]'
      + ' Somewhere as it stands. ([As it comes my life.]) My Jr. moments not the'
      + ' millionth part... All Mx. lost (nearly all someone) listening another'
      + ' noting or the same.';
    const splitText = splitInputTextByStopPunctuation(testString)
      /*
        '(Recorded [None the Ms.',
        ' less].)',
        ' [It’s preferable somehow.]',
        ' Somewhere as it stands.',
        ' ([As it comes my life.])',
        ' My Jr.',
        ' moments not the millionth part...',
        ' All Mx.',
        ' lost (nearly all someone) listening another noting or the same.'
      */
      const expected = [0, 5, 7];
      const actual = generateIndicesOfSentencesToSplice(splitText);
      expect(actual).toEqual(expected);
  });

  it('flags strings that are for marking decimal places', () => {
    const testString = '$123.23 is very expensive!! How much is that? $32. Not bad for 2.';
    const splitSentences = splitInputTextByStopPunctuation(testString);
    /*
      '$123.',
      '23 is very expensive!!',
      ' How much is that?',
      ' $32.',
      ' Not bad for 2.'
    */
    const expected = [0];
    const actual = generateIndicesOfSentencesToSplice(splitSentences);
    expect(actual).toEqual(expected);
  });

  it('catches initialisms', () => {
    const testString = 'Back in the U.S.S.R., e.g.';
    const split = splitInputTextByStopPunctuation(testString);
    /*
      'Back in the U.',
      'S.',
      'S.',
      'R.',
      ', e.',
      'g.'
    */
    const expected = [0, 1, 2, 3, 4];
    const actual = generateIndicesOfSentencesToSplice(split);
    expect(actual).toEqual(expected);
  });
});

describe('Test suite for spliceSentences private function', () => {
  it('should mutate an array by splicing together at the specified indices', () => {
    const testArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const indices = [0, 2, 4, 5, 7];
    const expected = ['ab', 'cd', 'efg', 'h'];
    spliceSentences(testArray, indices);
    expect(testArray).toEqual(expected);
  });
});

describe('Test suite for getLongestSentences private function', () => {
  it('should return an array of the longest sentence(s)', () => {
    const testArray = [
      '123',
      '12345',
      '1234',
      '123456789',
      '123',
      '123456789',
      '12345'
    ];
    const expected = ['123456789', '123456789'];
    const actual = getLongestSentences(testArray);
    expect(actual).toEqual(expected);
  });
});

describe('Test suite for findLongestSentence main function', () => {
  it('call the provided callback with the longest sentences array', () => {
    const spy = jest.fn();
    const testString = '(Recorded [None the Ms. less].) [It’s preferable somehow.]'
      + ' Somewhere as it stands. ([As it comes my life.]) My Jr. moments not the'
      + ' millionth part... All Mx. lost (nearly all someone) listening another'
      + ' noting or the same.';
    const expected = [' All Mx. lost (nearly all someone) listening another noting or the same.'];
    findLongestSentence(testString, spy);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toEqual(expected);
  });
});
