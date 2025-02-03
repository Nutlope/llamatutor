import { suggestions } from "@/utils/utils";
import Image from "next/image";
import type { FC } from "react";
import desktopImg from "../public/desktop-screenshot.png";
import mobileImg from "../public/screenshot-mobile.png";
import InitialInputArea from "./InitialInputArea";

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  ageGroup: string;
  setAgeGroup: React.Dispatch<React.SetStateAction<string>>;
  handleInitialChat: () => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  ageGroup,
  setAgeGroup,
  handleInitialChat,
}) => {
  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center sm:mt-36">
        <a
          className="mb-4 inline-flex h-7 shrink-0 items-center gap-[9px] rounded-[50px] border-[0.5px] border-solid border-[#E6E6E6] bg-[rgba(234,238,255,0.65)] bg-white px-5 py-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
          href="https://togetherai.link/"
          target="_blank" rel="noreferrer"
        >
          <Image
            unoptimized
            src="/togethercomputer.png"
            alt="hero"
            width={20}
            height={20}
          />
          <span className="text-center text-sm font-medium italic">
            Powered by <b>Llama 3.1</b> and <b>Together AI</b>
          </span>
        </a>
        <h2 className="mt-2 bg-custom-gradient bg-clip-text text-center text-4xl font-medium tracking-tight text-gray-900 sm:text-6xl">
          Your Personal{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text font-bold text-transparent">
            Tutor
          </span>
        </h2>
        <p className="mt-4 text-balance text-center text-sm sm:text-base">
          Enter a topic you want to learn about along with the education level
          you want to be taught at and generate a personalized tutor tailored to
          you!
        </p>

        <div className="mt-4 w-full pb-6">
          <InitialInputArea
            promptValue={promptValue}
            handleInitialChat={handleInitialChat}
            setPromptValue={setPromptValue}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-[30px] lg:flex-nowrap lg:justify-normal">
          {suggestions.map(({ name, id, Icon }) => (
            <button
              type="button"
              className="flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded border border-solid border-[#C1C1C1] px-2.5 py-2 transition hover:bg-gray-200"
              onClick={() => handleClickSuggestion(name)}
              key={id}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-light leading-[normal] text-[#1B1B16]">
                {name}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-sm font-light leading-[normal] text-[#1B1B16]">
          Fully open source!{" "}
          <span className="text-sm font-medium underline">
            <a
              href="https://github.com/Nutlope/llamatutor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star it on github.
            </a>
          </span>
        </p>
      </div>
      <div className="mx-auto max-w-7xl">
        <Image
          src={desktopImg}
          alt="hero"
          className="my-32 max-w-full max-lg:hidden"
        />
        <Image
          src={mobileImg}
          alt="hero"
          className="my-5 max-w-full lg:hidden"
        />
      </div>
    </>
  );
};

export default Hero;
