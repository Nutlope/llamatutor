import { FC } from "react";
import { Select } from "@headlessui/react";

type TInputAreaProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleDisplayResult: () => void;
  disabled?: boolean;
  reset?: () => void;
};

const InputArea: FC<TInputAreaProps> = ({
  promptValue,
  setPromptValue,
  handleDisplayResult,
  disabled,
  reset,
}) => {
  return (
    <form
      className="mx-auto flex w-full items-center justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        if (reset) reset();
        handleDisplayResult();
      }}
    >
      <div className="flex w-full rounded-full border">
        <input
          type="text"
          placeholder="Teach me about..."
          className="block w-full rounded-l-full border-r p-6 text-gray-900 placeholder:text-gray-400"
          disabled={disabled}
          value={promptValue}
          required
          onChange={(e) => setPromptValue(e.target.value)}
        />
        <div className="flex items-center justify-center">
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md rounded-r-full border-0 bg-transparent px-4 text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
      {/* <button
        disabled={disabled}
        type="submit"
        className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[3px] bg-[linear-gradient(154deg,#1E3A8A_23.37%,#3B82F6_91.91%)] disabled:pointer-events-none disabled:opacity-75"
      >
        {disabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <TypeAnimation />
          </div>
        )}

        <Image
          unoptimized
          src={"/img/arrow-narrow-right.svg"}
          alt="search"
          width={24}
          height={24}
          className={disabled ? "invisible" : ""}
        />
      </button> */}
    </form>
  );
};

export default InputArea;
