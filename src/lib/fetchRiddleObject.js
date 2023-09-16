import axios from "axios"
import { PUBLIC_RIDDLE_API_URL } from '$env/static/public';

/**
 * API Call to Riddle API to retreive a riddleObject
 *
 * The riddleObject is an object that has `question` and `answer` string properties
 *
 * @returns {Promise<{ question:string, answer:string }>} riddleObject
 * @throws `Error` a user friendly Fetch error
 */
export default async () => {
  // Initialize default Riddle Object
  let riddleObject = {
    question: "",
    answer: "",
  };
  
  // Loop through fetch calls to find max two word answers
  let isRiddleFound = false;
  while (!isRiddleFound) {
    await axios.get(PUBLIC_RIDDLE_API_URL)
      .then((res) => {
        if ((res.data.answer.match(/ /g) || []).length <= 1 && res.data.riddle.length < 100) {
          riddleObject.question = res.data.riddle;
          riddleObject.answer = res.data.answer.toLowerCase();
          isRiddleFound = true;
        }
      })
      .catch((err) => {
        console.warn(`fetchRiddleObject non-fatal Error: ${err.message}`);
        isRiddleFound = false;
      });
  }

  // Return the riddle object
  return riddleObject;
}
