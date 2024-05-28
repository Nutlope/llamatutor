import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SourceCardProps {
  data: {
    img: string;
    name: string;
    link: string;
  };
}

const SourceCard: React.FC<SourceCardProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-2.5 w-full md:w-auto rounded border bg-neutral-50 px-1.5 py-1 h-[79px]  border-solid border-[#C1C1C1]">
      <div className="">
        <Image src={data.img} alt={data.name} width={44} height={44} />
      </div>
      <div className="flex flex-col justify-center gap-[7px]  max-w-[192px]">
        <h6 className="text-[#1B1B16] text-sm   font-light leading-[normal]">
          {data.name}
        </h6>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={data.link}
          className=" text-[#1B1B16]/30 text-sm font-light truncate"
        >
          {data.link}
        </a>
      </div>
    </div>
  );
};

export default SourceCard;
