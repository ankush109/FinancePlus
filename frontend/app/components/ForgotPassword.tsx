"use client";
import { useForgotPasswordMutation } from "@/app/hooks/mutation/useForgotPasswordMutation";
import React, { use } from "react";
import toast from "react-hot-toast";

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
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { ForgotPasswordSchema } from "@/app/types/FormSchema";

const ForgotPassword = () => {
  const { mutate: ForgotPassword } = useForgotPasswordMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    setIsSubmitting(true);
    ForgotPassword(data.email, {
      onSuccess: () => {
        toast.success("Password reset link sent to your email!");
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
        setIsSubmitting(false);
      },
    });
  }
  return (
    <div className="p-5 m-5 bg-white lg:w-1/2 rounded-2xl flex gap-5 flex-col">
      <div className="text-2xl font-medium">Reset Password</div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
