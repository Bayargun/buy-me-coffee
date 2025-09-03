import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const Donation = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-[696px] h-[311px] flex flex-col gap-6 py-6 px-6  items-center">
        <div className="w-[648px] h-[108px] flex flex-col gap-5 items-center">
          <img src="./heart.png"></img>
          <div className="w-[448px] h-[24px] flex flex-col items-center font-semibold text-[16px]">
            Donation Complete!
          </div>
        </div>
        <div className="w-[510px] h-[131px] flex flex-col gap-2 px-3 py-2 border border-[#e4e4e7] rounded-[6px]">
          <div className="w-[486px] h-[32px] flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium text-[14px]">Jake :</p>
          </div>
          <p>
            Thank you for supporting me! It means a lot to have your support.
            It’s a step toward creating a more inclusive and accepting community
            of artists.
          </p>
        </div>
      </div>
      <Link href="./explore">
        <Button className="w-[148px] h-10">Return to explore</Button>
      </Link>
    </div>
  );
};
