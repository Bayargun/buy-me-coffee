"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "../../../../../axios";
import { toast } from "sonner";
import { useAuth } from "../../../../../_providers/AuthProvider";

const formSchema = z
  .object({
    currentPassword: z.string().min(4),
    newPassword: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

export const SetNewPassword = () => {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.patch("/auth/update-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        userId: user?.id,
      });
      if (response.data.success) {
        toast("Password amjilttai soligdloo.");
        form.reset();
      } else {
        toast("Password solihod aldaa garlaa.");
      }
    } catch (error) {
      console.error("Password update failed:", error);
      alert("Something went wrong!");
    }
  }
  return (
    <div className="w-[650px] h-fit flex flex-col gap-6 py-6 px-6 border border-[#e4e4e7] rounded-[8px]">
      <p className="font-bold text-[16px]">Set a new password</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter current password"
                    className="w-full"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter new password"
                    className="w-full"
                    {...field}
                    type="password"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    className="w-full"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
