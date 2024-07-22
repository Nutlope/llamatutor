"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InputArea from "@/components/InputArea";
import Sources from "@/components/Sources";
import { useRef, useState } from "react";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { getSystemPrompt } from "@/utils/utils";
import Chat from "@/components/Chat";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [topic, setTopic] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [sources, setSources] = useState<{ name: string; url: string }[]>([]);
  const [isLoadingSources, setIsLoadingSources] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);

  const handleInitialChat = async () => {
    setShowResult(true);
    setLoading(true);
    setTopic(inputValue);
    setInputValue("");

    await Promise.all([
      handleSourcesAndChat(inputValue),
      handleFollowUpQs(inputValue),
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

  return (
    <>
      <Header />
      <main className="flex-grow px-4 pb-4">
        {showResult ? (
          <div className="mt-2 flex h-full min-h-[68vh] w-full grow flex-col justify-between">
            <div className="w-full space-y-2">
              <div className="space-y-2">
                <div className="flex gap-10">
                  <Chat messages={messages} topic={topic} />
                  <Sources sources={sources} isLoading={isLoadingSources} />
                </div>
              </div>

              <div className="pt-1 sm:pt-2" ref={chatContainerRef}></div>
            </div>
            <div className="container px-4 lg:px-0">
              <InputArea
                disabled={loading}
                promptValue={inputValue}
                setPromptValue={setInputValue}
                setMessages={setMessages}
                handleChat={handleChat}
                messages={messages}
                handleInitialChat={handleInitialChat}
              />
            </div>
          </div>
        ) : (
          <Hero
            promptValue={inputValue}
            setPromptValue={setInputValue}
            setMessages={setMessages}
            handleChat={handleChat}
            messages={messages}
            handleInitialChat={handleInitialChat}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
