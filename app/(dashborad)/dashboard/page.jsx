"use client";
import React, { useState } from "react";

import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import Navbar from "@/components/navbar";
import { Button, TextField } from "@mui/material";

import Image from "next/image";
import ghost from "../../../public/Ghost.gif";
import copy from "../../../public/copy.png";
import tick from "../../../public/tick.png";

const API_KEY = "AIzaSyADi0JTYU8g0FcA4iWJBTBSyASPDScZvcI";

const formatBookText = (bookText) => {
  const lines = bookText.split("\n");
  let formattedText = "";

  lines.forEach((line) => {
    if (line.startsWith("*Title:")) {
      const title = line.substring(8).trim();
      formattedText += `<h1 class="res_title">${title}</h1>\n`;
    } else if (line.startsWith("*Chapter")) {
      const chapter = line.trim();
      formattedText += `<h2 class="my-custom-chapter-style">${chapter}</h2>\n`;
    } else if (line.startsWith("(Page")) {
      const pageInfo = line.trim();
      formattedText += `<p class="my-custom-page-info-style">${pageInfo}</p>\n`;
    } else {
      const content = line.trim().replace(/\*/g, ""); // Remove star symbols
      formattedText += `<p class="my-custom-content-style">${content}</p>\n`;
    }
  });

  return formattedText;
};

const DashboardPage = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const [inputs, setInputs] = useState({
    genre: "action",
    pages: 10,
    chapters: 3,
    wordsPerPage: 100,
    userPrompt: "Write a story about a magical adventure.",
  });

  const handleInputChange = (name) => (event) => {
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const handleGenerateClick = async () => {
    setLoading(true);
    const template = `Generate a {genre} story with the following specifications:
      - {pages} pages
      - {chapters} chapters
      - {wordsPerPage} words per page
      - do not generate any code
      -only generate the text in book format , whatever the user prompt is.
      -follow the instructions clearly , this is mandatory:generate exact {pages}, {chapters},{wordsPerPage} don't miss anything, don't exceed the mentiond number limits as well as lower than that
      -give the complete pages-do not give half of the number of pages
      -do not skip  title : give it for every result.
      -this one is mandatory don't skip this any case : when generating the result aslo attach page numbers(form where to where the chapter is). 
      -this is also mandatory : include the title and chapter  and page number should enclosed within the * and do  not include any special characters 
      -this format is also  mandatory:give the page individual page number after the chapter and generate {wordsPerPage} words 
      Consider the following prompt to create an engaging narrative:
      "Write a captivating {genre} story that unfolds over the course of {pages} pages and {chapters} chapters. Ensure each chapter is filled with interesting characters, unexpected twists, and a compelling storyline. Pay attention to the development of the plot, character arcs, and create a sense of anticipation to keep the reader engaged. The overall story should be immersive and provide a satisfying reading experience. Feel free to add elements of  or incorporate unique elements to make the story truly stand out. End each chapter in a way that leaves the reader eager to turn the page and discover what happens next. Be creative and imaginative in crafting a narrative that will captivate and entertain the audience from start to finish.". Consider the following prompt: "{userPrompt}"`;

    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: [
        "genre",
        "pages",
        "chapters",
        "wordsPerPage",
        "userPrompt",
      ],
    });

    const geminiModel = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      apiKey: API_KEY,
    });

    const llmChain = new LLMChain({
      llm: geminiModel,
      prompt: promptTemplate,
    });

    const result = await llmChain.call(inputs);
    const formattedResult = formatBookText(result.text);
    setResult(formattedResult);
    setLoading(false);
  };

  const handleCopy = () => {
    const plainTextResult = formatBookText(result).replace(
      /<\/?[^>]+(>|$)/g,
      ""
    );
    setCopied(plainTextResult);
    navigator.clipboard.writeText(plainTextResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="  bg-gradient-to-b from-[#fbc2eb]  via-30% to-[#a6c1ee] to-90% ... h-screen overflow-auto ">
      <Navbar className="" />

      <div className="  ">
        <div className="container mx-auto p-4 flex flex-col items-center    justify-start h-full">
          <div className="w-auto max-w-full rounded-lg  p-6 text-center">
            <h1 className="w-auto text-sm md:text-xl xl:text-4xl text-transparent bg-clip-text font-semibold font-mono text-white  ">
              Embark on a literary journey
              <br />
              <span className=" bg-clip-text text-[#6a11cb]">
                Innovative book generation platform AI
              </span>
            </h1>
          </div>
          <div className="w-full max-w-xl p-4 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
            {/* <label
              htmlFor="input"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Genere
            </label>
            <input
              type="text"
              id="input"
              placeholder={inputs.genre}
              onChange={handleInputChange("genre")}
              value={inputs.genre}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /> */}
            <TextField
              label="Genre"
              variant="outlined"
              required
              value={inputs.genre}
              onChange={handleInputChange("genre")}
              sx={{ marginBottom: 0 }}
              className="w-[150px] "
            />
            <TextField
              label="Number of Pages"
              required
              variant="outlined"
              type="number"
              value={inputs.pages}
              onChange={handleInputChange("pages")}
              sx={{ marginBottom: 2 }}
              className="w-[150px]  "
            />
            <TextField
              label="Number of Chapters"
              required
              variant="outlined"
              type="number"
              value={inputs.chapters}
              onChange={handleInputChange("chapters")}
              sx={{ marginBottom: 2 }}
              className="w-[150px] "
            />
            <TextField
              label="Words Per Page"
              variant="outlined"
              type="number"
              required
              value={inputs.wordsPerPage}
              onChange={handleInputChange("wordsPerPage")}
              sx={{ marginBottom: 2 }}
              className="w-[150px] "
            />
          </div>
          <div className="w-full max-w-full flex items-center justify-center ">
            <TextField
              label="User Prompt"
              variant="outlined"
              required
              value={inputs.userPrompt}
              onChange={handleInputChange("userPrompt")}
              sx={{
                marginBottom: 2,
                width: "70%",
                border: "none",
                borderRadius: "0",
              }}
              className="col-span-full text-gray-900 drop-shadow-md rounded-full border-none"
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={handleGenerateClick}
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? "Generating....." : " Generate Book"}
            </Button>
          </div>
          <div className="items-center ">
            {!loading && result && (
              // Result display
              <div className="container mx-auto p-4 max-w-3xl  h-full flex flex-col justify-start bg-white rounded-3xl mt-3">
                <div className="copy_icon " onClick={handleCopy}>
                  <Image
                    src={copied === true ? tick : copy}
                    alt="copy_icon"
                    // width={20}
                    // height={20}
                    className="w-[5%] h-[5%] z-10 object-contain hover:cursor-pointer"
                  />
                </div>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatBookText(result) }}
                />
              </div>
            )}

            {loading && (
              // Loading component while generating result
              <div className="mt-5 flex items-center justify-center h-full">
                <Image src={ghost} alt="Loading ..." />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
