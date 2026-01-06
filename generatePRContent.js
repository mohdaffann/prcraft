import Groq from "groq-sdk";

const generatePrompt = (diff, options) => {

    let theme = '';

    if (options.brief) {
        theme = 'The theme of the template is to generate a brief concise response.\n'
    } else if (options.technical) {
        theme = 'The theme of the template is to focus on technical implementations and architectural design choices and its impact.\n'
    } else if (options.detailed) {
        theme = 'The theme of the template is to provide a comprehensive, detailed description with multiple sections.\n'
    }

    const prompt = `${theme} 
     You are a senior software engineer reviewing a GitHub pull request.

    Your task is to generate a high quality pull request title and description , based strictly on provided diff.

    RULES:
    - The title must be concise , professional and under 72 characters.
    - Use an imperative tone ('fix' , 'use' , etc,..)
    - Do not include emojis
    - The description must explain WHY the change was made , not just WHAT 
    - Highlight important behaviour changes or impacts
    - Use bullet points only IF it improves clarity
    - Omit mentioning line numbers , git diff , filenames explicitly
    - Do not invent features or changes not present in the diff

    Output format: Return ONLY VALID JSON with NO markdown , NO codeblocks and NO backtics
    Just return raw JSON like below:
    {
        title : '...',
        description : '...'
    }

    GIT Diff: ${diff}
    `;

    return prompt;


}

const generatePR = async (diff, options) => {
    if (!diff || diff.trim().length === 0) throw new Error('Empty diff provided');

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    })

    const prompt = generatePrompt(diff, options);

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

export { generatePR, generatePrompt }