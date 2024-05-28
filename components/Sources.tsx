import Image from "next/image";
import React from "react";
import { sources } from "./data";
import SourceCard from "./SourceCard";

const Sources = () => {
 return (
  <div className='container w-full h-auto shrink-0 border bg-white rounded-lg border-solid border-[#C2C2C2] lg:p-10 p-5'>
   <div className='flex items-start gap-4 pb-3 lg:pb-3.5'>
    <Image src='/img/sources.png' alt='footer' width={24} height={24} />
    <h3 className='text-black text-base   font-bold leading-[152.5%] uppercase'>
     sources:{" "}
    </h3>
   </div>
   <div className='flex max-w-[890px] w-full items-center content-center gap-[15px] flex-wrap'>
    {sources.map((item) => (
     <SourceCard data={item} key={item.id} />
    ))}
   </div>
  </div>
 );
};

export default Sources;
