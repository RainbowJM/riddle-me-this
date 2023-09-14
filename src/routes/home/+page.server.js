// import '$lib/firebase/process.js'
import { getRiddleObject } from '$lib/firebase/process.js';

export const load = () => getRiddleObject();

export const actions = {
    guess: async ({ request }) => {
        const data = await request.formData();
        const answer = data.get('answer');


    },

};