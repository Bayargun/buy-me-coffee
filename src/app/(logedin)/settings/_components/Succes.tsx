"use client";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({
  success: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export const SuccesMsg = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      success: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-[650px] h-[317px] flex flex-col gap-6 py-6 px-6 border border-[#e4e4e7] rounded-[8px]">
      <p className="font-bold text-[16px]">Succes page</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="success"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation message</FormLabel>
                <FormControl>
                  <Textarea className="w-[602px] h-[131px]" {...field} />
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
