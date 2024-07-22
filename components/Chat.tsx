// import { Toaster, toast } from "react-hot-toast";
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
    <div className="flex flex-col gap-4">
      <div className="flex w-full rounded-lg border border-solid border-[#C2C2C2] bg-white p-5 lg:p-7">
        {messages.length > 2 ? (
          <>
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
            {/* {messages.length > 2 ? (
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      messages[messages.length - 1].content.trim(),
                    );
                    toast("Answer copied to clipboard", {
                      icon: "✂️",
                    });
                  }}
                  className=""
                >
                  <Image
                    unoptimized
                    src="/img/copy.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </button>
              </div>
            ) : null} */}
          </>
        ) : (
          <div className="flex w-full flex-col gap-2">
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
          </div>
        )}
        {/* <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      /> */}
      </div>
      <div className="container px-4 lg:px-0">
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
