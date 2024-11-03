import { CircleX } from "lucide-react";
import Image from "next/image";

const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="relative flex justify-center items-center w-screen h-screen overflow-hidden"
    >
      <Image width={500} height={500} src="/manual/Manual-small.png" />
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-4 p-2 rounded-lg bg-[#ffebeb]"
      >
        <CircleX className="text-red-700" />
      </button>
    </div>
  );
};

export default Modal;
