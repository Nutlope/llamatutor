"use client";

import Answer from "@/components/Answer";
import Hero from "@/components/Hero";
import InputArea from "@/components/InputArea";
import SimilarTopics from "@/components/SimilarTopics";
import Sources from "@/components/Sources";
import Image from "next/image";
import { useRef, useState } from "react";
import { getAnswer, getSimilarQuestions, getSources } from "./actions";
import { readStreamableValue } from "ai/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [promptValue, setPromptValue] = useState("");
  const [question, setQuestion] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<{ name: string; url: string }[]>([]);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleDisplayResult = async (newQuestion?: string) => {
    newQuestion = newQuestion || promptValue;

    setShowResult(true);
    setLoading(true);
    setQuestion(newQuestion);
    setPromptValue("");

    await handleSourcesAndAnswer(newQuestion);
    await handleSimilarQuestions(newQuestion);

    setLoading(false);
  };

  async function handleSourcesAndAnswer(question: string) {
    let sources = await getSources(question);
    setSources(sources);

    let answer = await getAnswer(question, sources);

    let textContent = "";
    for await (const delta of readStreamableValue(answer)) {
      textContent = textContent + delta;
      setAnswer(textContent);
    }
  }

  async function handleSimilarQuestions(question: string) {
    let similarQs = await getSimilarQuestions(question);
    setSimilarQuestions(similarQs);
  }

  const reset = () => {
    setShowResult(false);
    setPromptValue("");
    setQuestion("");
    setAnswer("");
    setSources([]);
    setSimilarQuestions([]);
  };

  return (
    <>
      <Header />
      <main className="h-full px-4 pb-4">
        {!showResult && (
          <Hero
            promptValue={promptValue}
            setPromptValue={setPromptValue}
            handleDisplayResult={handleDisplayResult}
          />
        )}

        {showResult && (
          <div className="flex h-full min-h-[68vh] w-full grow flex-col justify-between">
            <div className="container w-full space-y-2">
              <div className="container space-y-2">
                <div className="container flex w-full items-start gap-3 px-5 pt-2 lg:px-10">
                  <div className="flex w-fit items-center gap-4">
                    <Image
                      src={"/img/message-question-circle.svg"}
                      alt="message"
                      width={30}
                      height={30}
                      className="size-[24px]"
                    />
                    <p className="pr-5 font-bold uppercase leading-[152%] text-black">
                      Question:
                    </p>
                  </div>
                  <div className="grow">&quot;{question}&quot;</div>
                </div>
                <>
                  <Sources sources={sources} />
                  <Answer answer={answer} />
                  <SimilarTopics
                    similarQuestions={similarQuestions}
                    handleDisplayResult={handleDisplayResult}
                    reset={reset}
                  />
                </>
              </div>

              <div className="pt-1 sm:pt-2" ref={chatContainerRef}></div>
            </div>
            <div className="container px-4 lg:px-0">
              <InputArea
                promptValue={promptValue}
                setPromptValue={setPromptValue}
                handleDisplayResult={handleDisplayResult}
                disabled={loading}
                reset={reset}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
