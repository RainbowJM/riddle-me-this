/**
 * Function to compare the `userAnswer` to the `correctAnswer` and returns a boolean
 *
 * @param {string | undefined} userAnswer
 * @param {string | undefined} correctAnswer
 * @returns {boolean} true if `userAnswer` is correct, false otherwise
 */
export default (userAnswer, correctAnswer) => {
  // False if Missing Parameters
  if (!userAnswer || !correctAnswer) return false;

  // False if answer is too short
  if (userAnswer.length < 3 && correctAnswer.length >= 3) return false;

  // True if correct answer contains userAnswer
  let test;
  let reg = new RegExp(`(the |a |an |)(${userAnswer})(!|\\?)*`, 'gi')
  console.log(reg)
  if (test = correctAnswer.match(reg)) return true;
  console.log('test:', test)
  // False in any other scenario
  return false;
}