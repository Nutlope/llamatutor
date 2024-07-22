import ReactMarkdown from "react-markdown";
import FinalInputArea from "./FinalInputArea";

export default function Chat({
  messages,
  disabled,
  promptValue,
  setPromptValue,
  setMessages,
  handleChat,
  handleInitialChat,
}: {
  messages: { role: string; content: string }[];
  disabled: boolean;
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  handleChat: () => void;
  handleInitialChat: () => void;
}) {
  return (
    <div className="flex h-screen flex-col gap-4">
      <div className="no-scrollbar flex-grow overflow-y-auto p-4">
        <div className="flex w-full rounded-lg border border-solid border-[#C2C2C2] bg-white p-5 lg:p-7">
          {messages.length > 2 ? (
            <div className="prose max-w-5xl">
              {messages.slice(2).map((message, index) =>
                message.role === "assistant" ? (
                  <ReactMarkdown key={index} className="w-full">
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p key={index} className="font-bold">
                    User: {message.content}
                  </p>
                ),
              )}
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2">
              <div className="h-6 w-full max-w-[1200px] animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-80 animate-pulse rounded-md bg-gray-300" />
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white p-4">
        <FinalInputArea
          disabled={disabled}
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          setMessages={setMessages}
          handleChat={handleChat}
          messages={messages}
          handleInitialChat={handleInitialChat}
        />
      </div>
    </div>
  );
}
