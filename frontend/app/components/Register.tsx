"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import utc from "dayjs/plugin/utc";
import { useRegisterMutation } from "../hooks/mutation/useRegisterMutation";
import toast from "react-hot-toast";
import { RegisterInputSchema } from "../types/FormSchema";
import { useRouter } from "next/navigation";
import { useGetGenderQuery } from "../hooks/query/useGetGenderQuery";
import LoaderComponent from "./LoaderComponent";
import Link from "next/link";

dayjs.extend(utc);

export function RegisterForm() {
  const [issubmitting, setissubmitting] = useState(false);
  const { mutate: registerUser } = useRegisterMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [ageError, setageError] = useState(false);
  const { data, isLoading } = useGetGenderQuery();
  const genders = data?.data;

  const form = useForm<z.infer<typeof RegisterInputSchema>>({
    resolver: zodResolver(RegisterInputSchema),
    defaultValues: {
      email: "",
      name: "",
      age: 18,
      password: "",
      gender: "",
      about: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterInputSchema>) {
    setissubmitting(true);
    const formattedDate = dayjs(data.dob).utc().startOf("day").toISOString();

    const age = dayjs().diff(dayjs(formattedDate), "year");

    const registerInputData = {
      ...data,
      age: age,
      dob: formattedDate,
    };

    registerUser(registerInputData, {
      onSuccess: () => {
        setissubmitting(false);
        toast.success("User registered successfully!");
        router.push("/login");
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
    <div className="lg:w-1/2 p-5 bg-white h-[100vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 m-10"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        const selectedDate = dayjs(newValue)
                          .utc()
                          .startOf("day");
                        const age = dayjs().diff(selectedDate, "year");
                        setageError(age < 18);
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {ageError ? <h1 className="">You have to be atleast 18</h1> : ""}
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {!isLoading ? (
                      genders?.map((gender: any) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))
                    ) : (
                      <LoaderComponent />
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={issubmitting}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="text-center mt-5">
        <Link href="/login" className="text-blue-500 font-medium">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
