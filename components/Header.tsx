import Image from "next/image";
import logo from "../public/new-logo.svg";

const Header = () => {
  return (
    <div className="container mb-10 h-[60px] px-4 sm:mb-40 lg:h-[80px] lg:px-0">
      <div className="grid h-full grid-cols-12">
        <div className="col-span-5"></div>
        <div className="col-span-2 flex items-center justify-center">
          <a href="/">
            <Image src={logo} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
