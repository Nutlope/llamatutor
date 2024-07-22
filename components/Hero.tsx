import Image from "next/image";
import { FC } from "react";
import InputArea from "./InputArea";
import mainImg from "../public/new-hero.png";

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  handleChat: (messages?: { role: string; content: string }[]) => void;
  messages: { role: string; content: string }[];
  handleInitialChat: () => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  setMessages,
  handleChat,
  messages,
  handleInitialChat,
}) => {
  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center sm:mt-36">
      <a
        className="mb-4 inline-flex h-7 shrink-0 items-center gap-[9px] rounded-[50px] border-[0.5px] border-solid border-[#E6E6E6] bg-[rgba(234,238,255,0.65)] bg-white px-5 py-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
        href="https://www.together.ai/"
        target="_blank"
      >
        <Image
          unoptimized
          src="/togethercomputer.png"
          alt="hero"
          width={20}
          height={20}
        />
        <span className="text-center text-sm font-medium italic">
          Powered by <b>Llama 3</b> and <b>Together AI</b>
        </span>
      </a>
      <h2 className="mt-2 bg-custom-gradient bg-clip-text text-center text-6xl font-medium tracking-tight text-gray-900">
        Your Personal{" "}
        <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text font-bold text-transparent">
          Tutor
        </span>
      </h2>
      <p className="mt-4 text-balance text-center">
        Enter a topic you want to learn about along with the education level you
        want to be taught at and generate a personalized tutor tailored to you!
      </p>

      {/* input section */}
      <div className="mt-4 w-full pb-6">
        <InputArea
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          setMessages={setMessages}
          handleChat={handleChat}
          messages={messages}
          handleInitialChat={handleInitialChat}
        />
      </div>

      {/* Suggestions section */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pb-[30px] lg:flex-nowrap lg:justify-normal">
        {suggestions.map((item) => (
          <div
            className="flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded border border-solid border-[#C1C1C1] px-2.5 py-2 transition hover:bg-gray-200"
            onClick={() => handleClickSuggestion(item?.name)}
            key={item.id}
          >
            <Image
              unoptimized
              src={item.icon}
              alt={item.name}
              width={18}
              height={16}
              className="w-[18px]"
            />
            <span className="text-sm font-light leading-[normal] text-[#1B1B16]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <Image src={mainImg} alt="hero" className="my-32 max-w-7xl" />
    </div>
  );
};

type suggestionType = {
  id: number;
  name: string;
  icon: string;
};

const suggestions: suggestionType[] = [
  {
    id: 1,
    name: "Basketball",
    icon: "/Basketball.svg",
  },
  {
    id: 2,
    name: "Machine Learning",
    icon: "/Light.svg",
  },
  {
    id: 3,
    name: "Personal Finance",
    icon: "/finance.svg",
  },
  {
    id: 4,
    name: "U.S History",
    icon: "/us.svg",
  },
];

export default Hero;
