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
  if (userAnswer.length < 4) return false;

  // True if correct answer contains userAnswer
  if (correctAnswer.includes(userAnswer)) return true;
 
  // False in any other scenario
  return false;
}