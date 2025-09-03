import { HeartIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export const Homepage = () => {
  return (
    <div className="w-screen h-screen bg-white relative">
      <div className="w-full h-[76px] bg-white flex justify-between items-center py-[14px] px-[24px]">
        <div className="flex">
          <button className="w-[64px] h-10 flex items-center justify-center font-semibold">
            FAQ
          </button>
          <button className="flex w-[103px] h-10 items-center justify-center font-semibold">
            Wall of <HeartIcon className="w-[16px] h-[15px]" />
          </button>
          <button className="w-[137px] h-10 flex justify-center items-center font-semibold">
            Resources
          </button>
        </div>
        <img src="./buy-me-coffee.png" className="w-[175px] h-[30px]"></img>
        <div className="w-[400px] h-[48px] flex gap-10 justify-end items-center">
          <Link href="./sign-in">
            <button className="w-[87px] h-[48px] cursor-pointer relative overflow-hidden group text-black rounded-[9999px]">
              <span className="absolute inset-0 bg-gray-400 scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out origin-center"></span>
              <span className="relative z-10">Log in</span>
            </button>
          </Link>
          <Link href="./sign-up">
            <button className="bg-[#ffdd00] w-[87px] h-[48px] rounded-[9999px] cursor-pointer hover:bg-[#ffdd00d4]">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="w-[full] h-fit flex flex-col gap-9 items-center mt-30">
        <div className="w-fit h-fit flex gap-3">
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <p>Loved by 1,000,000+ creators</p>
        </div>
        <p className="font-extrabold text-[100px] text-center">
          Fund your <br />
          creative work
        </p>
        <p className="font-medium text-[24px] text-center">
          Accept support. Start a membership. Setup a shop. Its easier <br />
          than you think.
        </p>
        <Link href="./sign-up">
          <button className="bg-[#ffdd00] w-[255px] h-[74px] rounded-[9999px] cursor-pointer hover:bg-[#ffdd00d4] text-[24px] font-semibold">
            Start my page
          </button>
        </Link>
        <p>Its free and takes less than a minute!</p>
      </div>
    </div>
  );
};
