import { decrypt, encrypt } from '$lib/encryptor.js';
import fetchRiddleObject from '$lib/fetchRiddleObject.js';

export const load = ({ cookies }) => {
  fetchRiddleObject().then(({ question, answer }) => {
    // Encrypt the answer and store as cookie
    const answerCypher = encrypt(answer);
    cookies.set("cypher", answerCypher);

    // Send the question to the client
    return { question }
  });
};

export const actions = {
  guess: async ({ cookies, request }) => {
    // Get the answer cypher from the cookie and decrypt it
    const answerCypher = cookies.get('cypher');
    const correctAnswer = decrypt(answerCypher);
    
    // Get the user's answer
    const data = await request.formData();
    const userAnswer = data.get('answer');

    // Compare the user's answer to the correct answer
    if (userAnswer === correctAnswer) {
      console.log('Correct answer');
    }
  },
};