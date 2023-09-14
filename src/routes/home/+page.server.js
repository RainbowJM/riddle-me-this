export function load() {
    return {
        question: "What is the riddle?"
    }
};

export const actions = {
    guess: async ({ request }) => {
        const data = await request.formData();
        const answer = data.get('answer');

        if (answer === "IBIS") {
            return { success: true };
        } else {
            return { incorrect: true };
        }
    },

};