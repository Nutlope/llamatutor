"use client";

import Answer from "@/components/Answer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InputArea from "@/components/InputArea";
import Sources from "@/components/Sources";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { getSystemPrompt } from "@/utils/utils";
import FollowUpQs from "@/components/FollowUpQs";

export default function Home() {
  const [promptValue, setPromptValue] = useState("");
  const [question, setQuestion] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [sources, setSources] = useState<{ name: string; url: string }[]>([]);
  const [isLoadingSources, setIsLoadingSources] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  const handleInitialChat = async (newQuestion?: string) => {
    newQuestion = newQuestion || promptValue;

    setShowResult(true);
    setLoading(true);
    setQuestion(newQuestion);
    setPromptValue("");

    await Promise.all([
      handleSourcesAndChat(newQuestion),
      handleFollowUpQs(newQuestion),
    ]);

    setLoading(false);
  };

  const handleChat = async (messages?: { role: string; content: string }[]) => {
    const chatRes = await fetch("/api/getChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!chatRes.ok) {
      throw new Error(chatRes.statusText);
    }

    // This data is a ReadableStream
    const data = chatRes.body;
    if (!data) {
      return;
    }
    let fullAnswer = "";

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          fullAnswer += text;
          // Update messages with each chunk
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === "assistant") {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + text },
              ];
            } else {
              return [...prev, { role: "assistant", content: text }];
            }
          });
        } catch (e) {
          console.error(e);
        }
      }
    };

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
  };

  async function handleSourcesAndChat(question: string) {
    setIsLoadingSources(true);
    let sourcesResponse = await fetch("/api/getSources", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    let sources;
    if (sourcesResponse.ok) {
      sources = await sourcesResponse.json();

      setSources(sources);
    } else {
      setSources([]);
    }
    setIsLoadingSources(false);

    const parsedSourcesRes = await fetch("/api/getParsedSources", {
      method: "POST",
      body: JSON.stringify({ sources }),
    });
    let parsedSources;
    if (parsedSourcesRes.ok) {
      parsedSources = await parsedSourcesRes.json();
      console.log({ parsedSources });
    }

    const initialMessage = [
      { role: "system", content: getSystemPrompt(parsedSources) },
      { role: "user", content: `${question}` },
    ];
    setMessages(initialMessage);
    await handleChat(initialMessage);
  }

  async function handleFollowUpQs(question: string) {
    let res = await fetch("/api/getFollowUps", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    let questions = await res.json();
    setSimilarQuestions(questions);
  }

  // TODO: Only pass this into like the header to reset. That's it.
  const reset = () => {
    setShowResult(false);
    setPromptValue("");
    setQuestion("");
    setSimilarQuestions([]);
  };

  return (
    <>
      <Header />
      <main className="flex-grow px-4 pb-4">
        {!showResult && (
          <Hero
            promptValue={promptValue}
            setPromptValue={setPromptValue}
            setMessages={setMessages}
            handleChat={handleChat}
            messages={messages}
            handleInitialChat={handleInitialChat}
          />
        )}
        {showResult && (
          <div className="mt-2 flex h-full min-h-[68vh] w-full grow flex-col justify-between">
            <div className="w-full space-y-2">
              <div className="space-y-2">
                <div className="flex w-full items-start gap-3 px-5 pt-2 lg:px-10">
                  <p className="font-bold uppercase text-gray-900">Topic:</p>
                  <p>{question}</p>
                </div>
                <div className="container">
                  <Answer messages={messages} />
                  <Sources sources={sources} isLoading={isLoadingSources} />
                  {/* <FollowUpQs
                    similarQuestions={similarQuestions}
                    setMessages={setMessages}
                    handleChat={handleChat}
                  /> */}
                </div>
              </div>

              <div className="pt-1 sm:pt-2" ref={chatContainerRef}></div>
            </div>
            <div className="container px-4 lg:px-0">
              <InputArea
                disabled={loading}
                promptValue={promptValue}
                setPromptValue={setPromptValue}
                setMessages={setMessages}
                handleChat={handleChat}
                messages={messages}
                handleInitialChat={handleInitialChat}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
