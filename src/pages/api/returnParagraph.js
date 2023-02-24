const generateParagraph = async ({
    paragraphTitle,
    keywords,
    mode,
    numWords,
}) => {
    try {
        const response = await fetch(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    prompt: `Write a ${numWords || 200} word paragraph on ${paragraphTitle} in a ${mode || "normal"} tone. ${keywords ? `Incorporate the following keywords: ${keywords}.` : ""}`,
                    max_token: 300,
                    temperature: 0.5,
                }),
            }
        );

        const data = await response.json();
        return data.choices[0].text;

    } catch (e) {
        console.error(e);
    }
};

export default async function handler(req, res) {
    const { paragraphTitle, keywords, mode, numWords } = req.body;

    const paragraph = await generateParagraph({
        paragraphTitle,
        keywords,
        mode,
        numWords,
    });

    res.status(200).json({
        paragraph,
    });
}