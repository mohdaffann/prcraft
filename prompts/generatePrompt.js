import basicPrompt from "./basic.prompt.js";
import detailed from "./detailed.prompt.js";
import brief from "./brief.prompt.js";
import technical from "./technical.prompt.js";

const generatePrompt = (diff, options) => {
    let modePrompt = technical;
    if (options.brief) modePrompt = brief;
    if (options.detailed) modePrompt = detailed;
    const basicPromptWithDiff = basicPrompt(diff);

    return `${modePrompt}\n${basicPromptWithDiff}`
}

export default generatePrompt