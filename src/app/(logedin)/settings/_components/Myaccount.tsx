"use client";
import { PersonalInfo } from "./Personalinfo";
import { SetNewPassword } from "./Newpassword";
import { CardChange } from "./Cardchange";
import { SuccesMsg } from "./Succes";

export const MyAcc = () => {
  return (
    <div className="w-[650px] h-fit flex flex-col gap-8 absolute top-[145px] left-[700px]">
      <p className="font-semibold text-[24px]">My account</p>
      <PersonalInfo />
      <SetNewPassword />
      <CardChange />
      <SuccesMsg />
    </div>
  );
};
