import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container flex min-h-[72px] items-center justify-between border-t border-[#D2D2D2] px-4 pb-3 pt-5 lg:min-h-[72px] lg:px-0 lg:py-5">
      <a href="/" className="flex items-center gap-2.5">
        <Image
          unoptimized
          src="/new-logo.svg"
          alt="footer"
          width={160}
          height={30}
        />
      </a>
      <div className="flex items-center gap-3">
        <Link href={"https://x.com/nutlope"} target="_blank">
          <Image
            unoptimized
            src="/twitter.svg"
            alt="twitter"
            width={15}
            height={15}
          />
        </Link>
        <Link href={"https://github.com/Nutlope/llamatutor"} target="_blank">
          <Image
            unoptimized
            src={"/github.svg"}
            alt="facebook"
            width={16}
            height={16}
          />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Footer;
