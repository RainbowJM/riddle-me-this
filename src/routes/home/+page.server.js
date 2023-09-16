import { decrypt, encrypt } from '$lib/encryptor.js';
import fetchRiddleObject from '$lib/fetchRiddleObject.js';
import isCorrectAnswer from '$lib/isCorrectAnswer';
import { setTodayStandings } from '../../store/standings';

export const load = async ({ cookies }) => {
	const storedQuestion = cookies.get('question')?.toString();
	const answerCypher = cookies.get('cypher')?.toString();

	if (storedQuestion && answerCypher) return Promise.resolve({ question: storedQuestion });

	return fetchRiddleObject().then(({ question, answer }) => {
		// Encrypt the answer and store as cookie
		const answerCypher = encrypt(answer);
		cookies.set('cypher', answerCypher);

		// Store the question as cookie
		cookies.set('question', question);

		// Send the question to the client
		return { question };
	});
};

export const actions = {
	guess: async ({ cookies, request }) => {
		// Get the answer cypher from the cookie and decrypt it
		const answerCypher = cookies.get('cypher');
		const correctAnswer = decrypt(answerCypher).toLowerCase();

		// Get the user's answer
		const data = await request.formData();
		const userAnswer = data.get('answer')?.toString().toLowerCase();

		// Compare the user's answer to the correct answer
		const isCorrect = isCorrectAnswer(userAnswer, correctAnswer);

		// Get the uid of the user
		const uid = cookies.get('uid');

		// If the answer isCorrect store the winner
		if (isCorrect && uid) setTodayStandings(uid);

		// Clear riddle the cookies
		cookies.delete('question');
		cookies.delete('cypher');

		return { isCorrect, userAnswer, correctAnswer };
	}
};
