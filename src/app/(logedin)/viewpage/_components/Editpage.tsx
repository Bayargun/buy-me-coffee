"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CameraIcon, CoffeeIcon, HeartIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../axios";
import Link from "next/link";

type Supporters = {
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
const UPLOAD_PRESET = "guneegod";
const CLOUD_NAME = "dqd01lbfy";
export const EditPage = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [supporters, setSupporters] = useState<Supporters[]>([]);
  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const result = response.data.url;
      return result;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handlebackground = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.profile?.id) return;

    const url = await uploadImage(file);
    if (!url) return;
    try {
      await api.patch("/profile/background", {
        userId: user.id,
        backgroundImage: url,
      });
      setImagePreview(url);
    } catch (error) {
      console.error("Error updating background image:", error);
    }
  };
  useEffect(() => {
    if (user?.profile?.backgroundImage) {
      setImagePreview(user.profile.backgroundImage);
    }
  }, [user?.profile?.backgroundImage]);

  const getSupporters = async () => {
    if (!user?.id) return;

    try {
      const response = await api.get(`/donation/get-donation/${user?.id} `);
      setSupporters(response.data);
      console.log("hahaha", response.data);
    } catch (error) {
      console.error("Failed to fetch donations", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getSupporters();
    }
  }, [user]);
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[319px] bg-[#f4f4f5] flex justify-center items-center">
        {imagePreview ? (
          <div className="w-full h-full relative">
            <img
              src={imagePreview}
              alt="Background"
              className="object-cover w-full h-full relative"
            />
            <Button
              variant="secondary"
              className="w-[149px] h-10 absolute top-[16px] left-[80%]"
              onClick={() =>
                document.getElementById("background-upload")?.click()
              }
              disabled={uploading}
            >
              <CameraIcon />
              {uploading ? "Uploading..." : "Change cover"}
            </Button>
            <input
              id="background-upload"
              type="file"
              accept="image/*"
              className="hidden"
              aria-hidden="true"
              onChange={handlebackground}
            />
          </div>
        ) : (
          <>
            <Button
              className="w-[181px] h-10"
              onClick={() =>
                document.getElementById("background-upload")?.click()
              }
              disabled={uploading}
            >
              <CameraIcon />
              {uploading ? "Uploading..." : "Add a cover image"}
            </Button>
            <input
              id="background-upload"
              type="file"
              accept="image/*"
              className="hidden"
              aria-hidden="true"
              onChange={handlebackground}
            />
          </>
        )}
      </div>
      <div className="w-[1280px] h-fit flex gap-5 absolute top-[300px] left-[400px]">
        <div className="w-fit h-fit flex flex-col gap-5">
          <div className="w-[632px] h-[273px] flex flex-col gap-2 px-6 py-6 rounded-[8px] border border-[#e4e4e7]  bg-white">
            <div className="w-[191px] h-[48px] flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={user?.profile.avatarImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold text-[20px]">{user?.profile.name}</p>
              <Link href="/settings">
                <Button
                  variant="secondary"
                  className="w-[96px] h-10 mx-90 cursor-pointer"
                >
                  Edit page
                </Button>
              </Link>
            </div>
            <Separator />
            <div className="w-[584px] h-fit flex flex-col gap-3">
              <div className="w-full h-9 text-[16px] font-semibold">
                About {user?.profile.name}
              </div>
              <div className="w-full h-20 ">{user?.profile.about}</div>
            </div>
          </div>
          <div className="w-[632px] h-[116px] flex flex-col gap-3 px-6 py-6 rounded-[8px] border border-[#e4e4e7] bg-white ">
            <div className="w-[584px] h-[36px] font-semibold text-[16px]">
              Social media URL
            </div>
            <div className="w-[584px] h-[20xp] ">
              {user?.profile.socialMediaURL}
            </div>
          </div>
          <div className="w-[632px] h-fit flex flex-col gap-6 px-6 py-6 rounded-[8px] border border-[#e4e4e7] bg-white ">
            {supporters.length === 0 ? (
              <div className="w-[584px] h-[392px] flex flex-col gap-3">
                <div className="w-full h-[36px] font-semibold text-[16px] ">
                  Recent Supporters
                </div>
                <div className="w-full h-[344px] flex flex-col gap-[16px]">
                  <div className="w-full h-[140px] flex flex-col gap-6 justify-center items-center border border-[#e4e4e7] rounded-[8px]">
                    <div className="w-[385px] h-[92px] flex flex-col gap-4 justify-center items-center ">
                      <div className="w-[64px] h-[64px] flex items-centers">
                        <HeartIcon />
                      </div>
                      <div className="w-full h-[24px] font-semibold text-[16px] flex justify-center">
                        Be the first one to support {user?.profile.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="font-semibold text-[16px]">Supporters</p>
                {supporters.map((support) => (
                  <div
                    key={support.id}
                    className="w-[584px] flex flex-col gap-1 border border-[#efefef] p-4 rounded-lg"
                  >
                    <div className="w-[835px] flex justify-between">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage
                            src={support.sender.profile.avatarImage}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-[14px]">
                            {support.sender.profile.name}
                          </p>
                          <p className="text-[12px]">
                            {support.sender.profile.socialMediaURL}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-[14px] italic text-gray-700 border-l-4 border-indigo-500 pl-4 max-w-lg break-words">
                      {support.specialMessage}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-[628px] h-[509px] flex flex-col gap-8 px-6 py-6 rounded-[8px] border border-[#e4e4e7] bg-white">
          <div className="w-[580px] h-[122px] flex flex-col gap-6">
            <div className="w-full h-[36px] font-semibold text-[16px]">
              Buy {user?.profile.name} a Coffee
            </div>
            <div className="w-full h-[62px] flex flex-col gap-2">
              <p>Select amount:</p>
              <div className="w-[337px] h-10 flex gap-3">
                <Button
                  variant="secondary"
                  className=" hover:bg-black hover:text-white cursor-pointer"
                >
                  <CoffeeIcon />
                  $1
                </Button>
                <Button
                  variant="secondary"
                  className=" hover:bg-black hover:text-white cursor-pointer"
                >
                  <CoffeeIcon />
                  $2
                </Button>
                <Button
                  variant="secondary"
                  className=" hover:bg-black hover:text-white cursor-pointer"
                >
                  <CoffeeIcon />
                  $5
                </Button>
                <Button
                  variant="secondary"
                  className=" hover:bg-black hover:text-white cursor-pointer"
                >
                  <CoffeeIcon />
                  $10
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[580px] h-[235px] flex flex-col gap-5">
            <div className="w-full h-[62px] flex flex-col gap-2">
              <p className="font-medium text-[14px]">
                Enter BuyMeCoffee or social acount URL:
              </p>
              <Input className="w-full h-10 "></Input>
            </div>
            <div className="w-full h-[153px] gap-2 flex flex-col">
              <p className="font-medium text-[14px]">Special message:</p>
              <Textarea
                className="w-full h-[131px] "
                placeholder="Thank you for being so awesome everyday!"
              ></Textarea>
            </div>
          </div>
          <div className="w-[580px] h-10 flex justify-between">
            <Link href="/Home">
              <Button className="w-[580px] h-10">Back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
