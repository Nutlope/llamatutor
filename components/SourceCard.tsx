import Image from "next/image";

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <div className="flex h-[79px] w-full items-center gap-2.5 rounded-lg border border-gray-100 px-1.5 py-1 shadow-md md:w-auto">
      <div className="">
        <Image
          unoptimized
          src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
          alt={source.url}
          className="rounded-full p-1"
          width={36}
          height={36}
        />
      </div>
      <div className="flex max-w-[192px] flex-col justify-center gap-1">
        <h6 className="line-clamp-2 text-xs font-light">{source.name}</h6>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={source.url}
          className="truncate text-xs font-light text-[#1B1B16]/30"
        >
          {source.url}
        </a>
      </div>
    </div>
  );
};

export default SourceCard;
