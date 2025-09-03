"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
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
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { api } from "../../../../../axios";
import { toast } from "sonner";

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
export const PersonalInfo = () => {
  const { user } = useAuth();
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
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      form.setValue("photo", url);
      setImagePreview(url);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.patch("profile/edit-account", {
        userId: user?.id,
        name: values.name,
        about: values.about,
        photo: values.photo,
        social: values.social,
      });
      if (response.data.success) {
        toast("Profile amjilltai soligdloo");

        form.reset({
          name: "",
          about: "",
          social: "",
          photo: "",
        });
      } else {
        toast("Profile solihod aldaa garlaa.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    }
  }
  return (
    <div className="w-full h-[671px] flex flex-col gap-6 px-6 py-6 border border-[#e4e4e7] rounded-[8px]">
      <p className="font-bold text-[16px]">Personal info</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name here"
                    className="w-full"
                    {...field}
                  />
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
                    placeholder="About..."
                    className="w-full h-[131px]"
                    {...field}
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
                  <Input placeholder="https://" className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};
