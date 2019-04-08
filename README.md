 [Demo](miachenmtl.github.io/longest-sentence-finder)

# Longest Sentence Finder
This is a work in progress. Planned/potential features include:
* Count by words option.
* Clear text button.
* Nicer UI.
* Find n longest sentences.
* Better testing (`enzyme` needs to support hooks!).
* Smarter algorithm that allows for human correction of edge cases.
There are other apps and libraries that can find the longest sentence, but they tend to rely on naive implementations that will split 'Mme. X. arrives.' into three sentences.

## Explanation
The algorithm works by:
1. Splitting the input text into sentence candidates:
  * Handles `.`, `!`, `?`, `...`, `!!?!!????`, etc.
  * Includes closing parentheses and quotation marks, e.g. `'But you already knew that.'` instead of `'But you already knew that.`.
2. Searching for full stops that should not mark the end of the sentence:
  * Looks for titles of address (e.g. `Mx.`, `Dr.`, `Rev.`) by flagging any pattern that looks like 'X.', 'Xy.', 'Xyy.' where X is a capital letter and y is a lowercase letter. NB: This won't find 'Mlle.', for example.
  * Looks for periods used to indicate decimal places, e.g. '`123.234`'.
  * Looks for initialisms (e.g. `U.S.S.R.`).
3. Splicing together any sentence candidates found in previous step with next sentence candidate.
4. Among these sentences, the algorithm returns the sentence or sentences that have the most characters.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
