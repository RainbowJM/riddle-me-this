import axios from "axios"
import { PUBLIC_RIDDLE_API_URL } from '$env/static/public';

export default async () => {
  // Initialize default Riddle Object
  let riddleObject = {
      question: "",
      answer: "",
  };

  // Loop through fetch calls to find max two word answers
  let retry = true
  while (retry) {
    await axios.get(PUBLIC_RIDDLE_API_URL)
      .then((res) => {
        if ((res.data.answer.match(/ /g) || []).length <= 1) {
          riddleObject.question = res.data.riddle;
          riddleObject.answer = res.data.answer;
          retry = false
        }
      })
  }

  // Return the riddle object
  return riddleObject;
}
