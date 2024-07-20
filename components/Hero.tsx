import Image from "next/image";
import { FC } from "react";
import InputArea from "./InputArea";

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleDisplayResult: () => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  handleDisplayResult,
}) => {
  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
      <a
        className="bg-[rgba(234,238,255,0.65)] mb-4 inline-flex h-7 shrink-0 items-center gap-[9px] rounded-[50px] border-[0.5px] border-solid border-[#E6E6E6] bg-white px-5 py-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
        href="https://www.together.ai/"
        target="_blank"
      >
        <Image
          unoptimized
          src="/meta-llama-small.png"
          alt="hero"
          width={30}
          height={30}
        />
        <span className="text-center font-medium italic">
          Powered by Together AI and Llama 3.1
        </span>
      </a>
      <h2 className="bg-custom-gradient text-gray-900 bg-clip-text mt-2 text-center text-6xl font-medium tracking-tight">
        Your Personal <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text font-bold">Tutor</span>
      </h2>
      <p className="mt-4 text-center text-balance">Enter a topic you want to learn along with your age group and generate the most advanced chat bot tailored to you!</p>

      {/* input section */}
      <div className="w-full pb-6 mt-4">
        <InputArea
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleDisplayResult={handleDisplayResult}
        />
      </div>

      {/* Suggestions section */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pb-[30px] lg:flex-nowrap lg:justify-normal">
        {suggestions.map((item) => (
          <div
            className="flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded border border-solid border-[#C1C1C1] px-2.5 py-2 hover:bg-gray-200 transition"
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

      {/* Github link section */}
      <p className="text-center text-sm font-light leading-[normal] text-[#1B1B16]">
        Fully open source!{" "}
        <span className="text-sm font-medium underline text-blue-500">
          <a
            href="https://github.com/Nutlope/llamateacher"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star it on github.
          </a>
        </span>
      </p>
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
    name: "Photosynthesis",
    icon: "/img/icon _leaf_.svg",
  },
  {
    id: 2,
    name: "Basketball",
    icon: "/img/icon _dumbell_.svg",
  },
  {
    id: 3,
    name: "History of the NBA",
    icon: "/img/icon _atom_.svg",
  },
  {
    id: 4,
    name: "Geometry",
    icon: "/img/icon _leaf_.svg",
  },
];

export default Hero;
