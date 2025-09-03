import { Logo } from "./Logo";

export const YellowBack = () => {
  return (
    <div className="w-1/2 h-full bg-[#fbbf24] flex justify-center items-center">
      <div className="flex absolute top-8 left-20">
        <Logo />
      </div>
      <div className="w-[455px] h-[370px] flex flex-col gap-10 justify-center items-center">
        <img src="./illustration.png"></img>
        <div className="w-[455px] h-[90px] flex flex-col gap-3 items-center">
          <p className="font-bold text-[24px] text-black">
            Fund your creative work
          </p>
          <p className="text-[16px] text-black text-center">
            Accept support. Start a membership. Setup a shop. Its easier <br />{" "}
            than you think.
          </p>
        </div>
      </div>
    </div>
  );
};
