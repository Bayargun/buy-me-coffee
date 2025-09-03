"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";
import { useAuth } from "../../../../../_providers/AuthProvider";
import axios from "axios";
import { CameraIcon } from "lucide-react";
import Image from "next/image";

const UPLOAD_PRESET = "guneegod";
const CLOUD_NAME = "dqd01lbfy";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name.",
  }),
  about: z.string().min(2, {
    message: "Please enter info about yourself.",
  }),
  social: z.string().url({ message: "Enter a valid URL." }),
  photo: z.string().url({ message: "Must be a valid image URL." }),
});
export const CompletePro = ({ onComplete }: { onComplete: () => void }) => {
  const { user, getUser } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      social: "",
      photo: "",
    },
  });

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

  const addProfile = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post("/profile/create-profile", {
        name: values.name,
        about: values.about,
        avatarImage: values.photo,
        socialMediaURL: values.social,
        userId: Number(user?.id),
      });
      onComplete();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    getUser();
  }, []);
  console.log("user", user);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      form.setValue("photo", url);
      setImagePreview(url);
    }
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addProfile(values);
  };
  return (
    <div className="w-[510px] h-[631px] flex flex-col gap-6">
      <div className="font-semibold text-[24px] text-black">
        Complete your profile page
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-[160px] h-[186px] flex flex-col gap-3">
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add photo</FormLabel>
                  <div className="relative w-40 h-40 border-dashed border-2 rounded-full flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile Preview"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <CameraIcon />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your name here"
                    {...field}
                    className="w-full h-[131px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social media URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-[510px] h-10 flex gap-[10px] justify-end ">
            <Button
              type="submit"
              className="border-2 w-[246px] h-10"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
