import { Logo } from "./logo";

const Header = () => {
  return (
    <div className="container flex h-[60px] shrink-0 items-center justify-center px-4 lg:h-[80px] lg:px-0">
      <a href="/">
        <Logo className="w-30 sm:w-36" />
      </a>
    </div>
  );
};

export default Header;
