"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
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

import toast from "react-hot-toast";
import { LoginInputSchema } from "../types/FormSchema";
import { useLoginMutation } from "../hooks/mutation/useLoginMutation";
import { fetchUserDetails, loginSuccess } from "../store/slices/AuthSlice";
import { AppDispatch } from "../store/store";

export function LoginForm() {
  const { mutate: LoginUser } = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof LoginInputSchema>>({
    resolver: zodResolver(LoginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginInputSchema>) {
    LoginUser(data, {
      onSuccess: (response) => {
        console.log(response.data.accessToken, "Re[op");
        dispatch(loginSuccess({ token: response.data.accessToken })); // Store token in Redux
        dispatch(fetchUserDetails()); // Fetch user details immediately
      },
      onError: () => {
        toast.error("Error occurred while registering");
      },
    });
  }

  return (
    <div className="w-1/2 p-10 m-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
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
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
