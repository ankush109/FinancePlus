"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { LoginInputSchema } from "../types/FormSchema";
import { useLoginMutation } from "../hooks/mutation/useLoginMutation";
import { fetchUserDetails, loginSuccess } from "../store/slices/AuthSlice";
import { AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const { mutate: LoginUser } = useLoginMutation();
  const [issubmitting, setissubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginInputSchema>>({
    resolver: zodResolver(LoginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginInputSchema>) {
    setissubmitting(true);
    LoginUser(data, {
      onSuccess: (response) => {
        setissubmitting(!issubmitting);
        dispatch(loginSuccess({ token: response.data.accessToken }));
        dispatch(fetchUserDetails());
        toast.success("user logged in successfully!");
        router.push("/");
      },
      onError: (error: any) => {
        setissubmitting(false);
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred";

        toast.error(errorMessage);
      },
    });
  }

  return (
    <div className="w-1/2 p-10 m-10 border-2 border-gray-200 rounded-3xl bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 "
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-red-400 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={issubmitting}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex justify-between flex-row-reverse items-center gap-2 mt-5">
        <div className="flex justify-center items-center gap-2">
          <span>Don't have an account?</span>
          <Link
            href="/register"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
}
