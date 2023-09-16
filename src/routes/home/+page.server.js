import { decrypt, encrypt } from '$lib/encryptor.js';
import fetchRiddleObject from '$lib/fetchRiddleObject.js';
import isCorrectAnswer from '$lib/isCorrectAnswer';

/** @type {import('./$types').PageServerLoad} */
export const load = ({ cookies }) =>
  fetchRiddleObject().then(({ question, answer }) => {
    // Encrypt the answer and store as cookie
    const answerCypher = encrypt(answer);
    cookies.set("cypher", answerCypher);

    // Send the question to the client
    return { question };
  });


/** @type {import('./$types').Actions} */
export const actions = {
  guess: async ({ cookies, request }) => {
    // Get the answer cypher from the cookie and decrypt it
    const answerCypher = cookies.get('cypher');
    const correctAnswer = decrypt(answerCypher).toLowerCase();
    
    // Get the user's answer
    const data = await request.formData();
    const userAnswer = data.get('answer')?.toString().toLowerCase();

    // Compare the user's answer to the correct answer
    console.log(userAnswer);
    console.log(correctAnswer);
    return {
      isCorrect: isCorrectAnswer(userAnswer, correctAnswer),
      userAnswer,
      correctAnswer,
    };
  },
};