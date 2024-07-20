import Image from "next/image";
import logo from "../public/instructor.png";

const Header = () => {
  return (
    <div className="container h-[60px] px-4 lg:h-[80px] lg:px-0">
      <div className="grid h-full grid-cols-12">
        <div className="col-span-5"></div>
        <div className="col-span-2 flex items-center justify-center">
          <a href="/">
            <Image src={logo} alt="" className="size-10" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
