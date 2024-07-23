import ReactMarkdown from "react-markdown";
import FinalInputArea from "./FinalInputArea";
import { useEffect, useRef } from "react";

export default function Chat({
  messages,
  disabled,
  promptValue,
  setPromptValue,
  setMessages,
  handleChat,
  topic,
}: {
  messages: { role: string; content: string }[];
  disabled: boolean;
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  handleChat: () => void;
  topic: string;
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex grow flex-col gap-4 overflow-hidden">
      <div className="flex grow flex-col overflow-hidden lg:p-4">
        <p className="uppercase text-gray-900">
          <b>Topic: </b>
          {topic}
        </p>
        <div className="mt-2 overflow-y-scroll rounded-lg border border-solid border-[#C2C2C2] bg-white px-5 lg:p-7">
          {messages.length > 2 ? (
            <div className="prose-sm max-w-5xl lg:prose">
              {messages.slice(2).map((message, index) =>
                message.role === "assistant" ? (
                  <ReactMarkdown key={index} className="w-full">
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p
                    key={index}
                    className="w-fit rounded-xl bg-gray-100 p-4 font-bold"
                  >
                    {message.content}
                  </p>
                ),
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4 py-5">
              {Array.from(Array(10).keys()).map((i) => (
                <div
                  key={i}
                  className={`${i < 5 && "hidden sm:block"} h-10 animate-pulse rounded-md bg-gray-300`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white lg:p-4">
        <FinalInputArea
          disabled={disabled}
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleChat={handleChat}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
