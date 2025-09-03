"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, CopyIcon, HeartIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { api } from "../../../../../axios";

type Donations = {
  id: number;
  amount: number;
  specialMessage: string;
  userId: number;
  sender: {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    profile: {
      id: number;
      userId: number;
      name: string;
      about: string;
      avatarImage: string;
      backgroundImage: string;
      socialMediaURL: string;
      successMessage: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
export const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [donations, setDonations] = useState<Donations[]>([]);
  const { user } = useAuth();

  const totalEarnings = donations?.reduce((sum, d) => sum + d.amount, 0);

  const getDonations = async () => {
    if (!user?.id) return;

    try {
      const response = await api.get(`/donation/get-donation/${user?.id} `);
      setDonations(response.data);
      console.log("hahaha", response.data);
    } catch (error) {
      console.error("Failed to fetch donations", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getDonations();
    }
  }, [user]);

  return (
    <div className="w-[955px] h-[989px] flex flex-col gap-6  rounded-[8px]  absolute top-[145px] left-[700px] px-[24px]">
      <div className="w-[907px] h-[257px] flex flex-col gap-[12px] px-6 py-6 rounded-[8px] border border-[#efefe7]">
        <div className="w-full h-[48px] flex justify-between ">
          <div className="flex h-full gap-3">
            <Avatar>
              <AvatarImage src={user?.profile.avatarImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 h-full">
              <p className="font-bold text-[16px]">{user?.profile.name}</p>
              <p className="text-[14px]">
                {" "}
                buymecoffee.com/{user?.profile?.name}
              </p>
            </div>
          </div>
          <Button className="w-[159px] h-10">
            <CopyIcon />
            Share page link
          </Button>
        </div>
        <Separator className="h-[33px]" />
        <div className="w-[859px] h-[104px] flex flex-col gap-6">
          <div className="h-10 flex gap-[16px]">
            <p className="font-semibold text-[20px]">Earnings</p>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="alltime">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="font-bold text-[36px]">${totalEarnings}</p>
        </div>
      </div>

      <div className="w-[907px] h-[708px] flex flex-col gap-3">
        <div className="w-full h-9 flex justify-between">
          <p className="font-semibold text-[16px]">Recent transactions</p>
          <button
            className="w-[109px] h-full flex gap-3 border border-[#e4e4e7] border-dashed rounded-[6px] justify-center items-center"
            onClick={() => setShow(!show)}
          >
            <ChevronDown className="w-4 h-4" />
            <p className="font-medium text-[14px]">Amount</p>
          </button>
        </div>
        {show && (
          <div className="w-[198px] h-[136px] flex flex-col px-1 py-1 shadow-md rounded-2xl relative left-[709px]">
            <div className="px-2 py-[6px] h-[32px] ">
              <div className="w-[174px] h-5 flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4"></input>
                <p>$1</p>
              </div>
            </div>
            <div className="px-2 py-[6px] h-[32px] ">
              <div className="w-[174px] h-5 flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4"></input>
                <p>$2</p>
              </div>
            </div>
            <div className="px-2 py-[6px] h-[32px] ">
              <div className="w-[174px] h-5 flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4"></input>
                <p>$5</p>
              </div>
            </div>
            <div className="px-2 py-[6px] h-[32px] ">
              <div className="w-[174px] h-5 flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4"></input>
                <p>$10</p>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-fit flex flex-col px-6 py-6 gap-4 rounded-[8px] border border-[#e4e4e7] items-center">
          {donations.length === 0 ? (
            <div className="w-[385px] h-[136px] flex flex-col gap-5  items-center">
              <div className="w-[64px] h-[64px] flex justify-center items-center rounded-[17776px] bg-[#f4f4f5]">
                <HeartIcon className="w-[28px] h-[28px]" />
              </div>
              <div className="w-[385px] h-[52px] flex flex-col gap-1 items-center">
                <p className="font-semibold text-4">
                  You don’t have any supporters yet
                </p>
                <p className="text-4">
                  Share your page with your audience to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-[16px]">Supporters</p>
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="w-[859px] flex flex-col gap-1 border border-[#efefef] p-4 rounded-lg"
                >
                  <div className="w-[835px] flex justify-between">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage
                          src={donation.sender.profile.avatarImage}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-[14px]">
                          {donation.sender.profile.name}
                        </p>
                        <p className="text-[12px]">
                          {donation.sender.profile.socialMediaURL}
                        </p>
                      </div>
                    </div>
                    <div className="w-[258px] flex flex-col gap-1 items-end justify-center px-4">
                      <p className="font-bold text-[16px]">
                        +${donation.amount}
                      </p>
                      <p></p>
                    </div>
                  </div>
                  <div className="text-[14px] italic text-gray-700 border-l-4 border-indigo-500 pl-4 max-w-lg break-words">
                    {donation.specialMessage}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
