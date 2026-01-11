import Groq from "groq-sdk";
import generatePrompt from "./prompts/generatePrompt.js";


const generatePR = async (prompt) => {


    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    })


    const res = await groq.chat.completions.create({
        messages: [
            { role: 'user', content: prompt }
        ],
        model: "llama-3.3-70b-versatile"
    });

    const content = res.choices?.[0]?.message?.content;

    if (!content) throw new Error('No response from AI');

    try {
        return JSON.parse(content)
    } catch (error) {
        throw new Error(`Invalid json from Ai , ${error.message}`)
    }

}

export { generatePR }