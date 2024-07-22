import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";

export default function Chat({
  messages,
  topic,
}: {
  messages: { role: string; content: string }[];
  topic: string;
}) {
  return (
    <div className="container flex w-full rounded-lg border border-solid border-[#C2C2C2] bg-white p-5 lg:p-7">
      <div className="flex w-full items-start gap-3 px-5 pt-2 lg:px-10">
        <p className="font-bold uppercase text-gray-900">Topic:</p>
        <p>{topic}</p>
      </div>
      <div className="flex w-full flex-wrap content-center items-center gap-[15px]">
        <div className="w-full">
          {messages ? (
            <>
              <div className="prose">
                {messages.slice(2).map((message, index) =>
                  message.role === "assistant" ? (
                    <ReactMarkdown key={index}>{message.content}</ReactMarkdown>
                  ) : (
                    <p key={index} className="font-bold">
                      User: {message.content}
                    </p>
                  ),
                )}
              </div>
              {messages.length > 2 ? (
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
              ) : null}
            </>
          ) : (
            <div className="flex w-full flex-col gap-2">
              <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
              <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
            </div>
          )}
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}
