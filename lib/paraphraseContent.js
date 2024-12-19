export const paraphraseContent = (content) => {
    const text = content.replace(/<[^>]*>/g, ''); 

    return text.length > 300 ? text.substring(0, 150)  : text;
}