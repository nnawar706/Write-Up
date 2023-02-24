import React, { useState } from "react";

export default function Dashboard() {

    const [paragraph, setParagraph] = useState("");

    const [paragraphTitle, setParagraphTitle] = useState("");
    const [keywords, setKeywords] = useState("");
    const [mode, setMode] = useState("");
    const [numWords, setNumWords] = useState("");


    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(paragraph);
        setIsCopied(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        const res = await fetch("/api/returnParagraph", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                paragraphTitle,
                keywords,
                mode,
                numWords,
            }),
        });
        setIsGenerating(false);
        const data = await res.json();
        setParagraph(JSON.stringify(data));
    };

    return (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12">
                <div className="">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        
                        <div className="flex flex-col">
                            <label className="sr-only text-gray-400" htmlFor="paragraphTitle">
                                Paragraph Title
                            </label>
                            <input 
                            type="text"
                            className="block w-full rounded-md bg-black border border-gray-400 
                            shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                            px-4 py-2 placeholder-gray-600 my-2 text-gray-100"
                            name="paragraphTitle"
                            placeholder="Paragraph Title"
                            id="paragraphTitle"
                            value={paragraphTitle}
                            onChange={(e) => setParagraphTitle(e.target.value)} required />
                        </div>

                        <div className="flex flex-col">
                            <label className="sr-only text-gray-400" htmlFor="keywords">
                                Keywords (Optional)
                            </label>
                            <textarea
                            rows={7}
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            name="keywords"
                            id="keywords"
                            placeholder="Keywords (Optional)"
                            className="block w-full rounded-md bg-black border border-gray-400
                            shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                            px-4 py-2 placeholder-gray-600 my-2 text-gray-100" />
                        </div>

                        <div className="flex flex-col">
                            <label className="sr-only text-gray-400" htmlFor="mode">
                                Select Mode
                            </label>
                            <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="block w-full rounded-md bg-black border border-gray-400
                            shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                            px-4 py-2 placeholder-gray-600 my-2 text-gray-100"
                            name="mode"
                            id="mode">
                                <option value="default">Select Mode (Optional)</option>
                                <option value="standard">Standard</option>
                                <option value="formal">Formal</option>
                                <option value="creative">Creative</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="sr-only text-gray-400" htmlFor="numWords">
                                Words (Optional)
                            </label>
                            <input 
                            type="number"
                            className="block w-full rounded-md bg-black border border-gray-400 
                            shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                            px-4 py-2 placeholder-gray-600 my-2 text-gray-100"
                            name="words"
                            placeholder="Number of Words (Default 200)"
                            id="words"
                            value={numWords}
                            onChange={(e) => setNumWords(e.target.value)} />
                        </div>

                        <button className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                        ${
                            isGenerating || paragraphTitle === "" ? "cursor-not-allowed opacity-50" : ""
                        }`} type="submit" disabled={isGenerating || paragraphTitle === ""}>
                            {isGenerating ? "Generating..." : "Generate Paragraph"}
                        </button>
                    </form>
                </div>

                <div className="">
                    <div className="flex flex-col">
                        <label htmlFor="output" className="sr-only">
                            Output
                        </label>
                        <textarea
                        rows={paragraph === "" ? 7 : 15}
                        name="output"
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                        disabled={paragraph === ""}
                        id="output"
                        className="block w-full rounded-md bg-black border border-gray-400 
                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                        px-4 py-2 placeholder-gray-600 my-2 text-gray-100" />

                        <button onClick={handleCopy}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        disabled={paragraph === ""}>
                            {isCopied ? "Copied" : "Copy to Clipboard"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}