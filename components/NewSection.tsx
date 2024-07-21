import Image from "next/image";
import sectionBg from "../public/section-bg.png";
import arrowIcon from "../public/arrow-icon.png";
import { FC } from "react";
import githubIcon from "../public/github-icon.png"

const NewSection: FC = () => {
  return (
    <div className="relative w-full h-[770px] m-0 p-0">
      <Image
        src={sectionBg}
        alt="section background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10"
      />
      <div className="text-white relative flex flex-col items-center justify-center h-full p-10 text-center">
        <h2 className="text-[52px] mb-4">
          Powered by <b>Llama 3.1 405B</b> and <b>Llama Guard</b>
        </h2>
        <p className="w-[758px] mb-8">
          This app leverages the new 405B Llama model to deliver personalized educational content to everyone and Llama Guard to keep the content safe for everyone, all powered through the Together AI inference engine 2.0.
        </p>
        <div className="flex gap-4">
          <button className="bg-white flex w-[151px] h-[48px] cursor-pointer items-center justify-center gap-[5px] rounded border px-2.5 py-2 transition hover:bg-gray-200">
            <Image
              unoptimized
              src={arrowIcon}
              alt="Try it out!"
              width={14}
              height={14}
              className="w-[14px]"
            />
            <span className="text-sm font-light leading-[normal] text-[#1B1B16]">
              Try it now!
            </span>
          </button>
          <button className="bg-[#075BC6] flex w-[194px] h-[48px] cursor-pointer items-center justify-center gap-[5px] rounded border border-[#252525] px-2.5 py-2 transition hover:bg-[#1064CF]">
            <Image
              unoptimized
              src={githubIcon}
              alt="Star on Github"
              width={14}
              height={14}
              className="w-[16px] color-"
            />
            <span className="text-sm font-light leading-[normal] text-[#ffffff]">
              Star on Github
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSection;
