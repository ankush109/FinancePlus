"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateInputSchema } from "../types/FormSchema";

import { EditUserFormProps } from "../types/authTypes";
import { useUpdateUserMutation } from "../hooks/mutation/useUpdateUserMutation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useGetGenderQuery } from "../hooks/query/useGetGenderQuery";

dayjs.extend(utc);

export function EditUserForm({ userId, userData }: EditUserFormProps) {
  const [issubmitting, setissubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: updateUser } = useUpdateUserMutation();

  const [ageError, setageError] = useState(false);
  const { data, isLoading } = useGetGenderQuery();
  const genders = data?.data;
  const form = useForm<z.infer<typeof updateInputSchema>>({
    resolver: zodResolver(updateInputSchema),
    defaultValues: {
      email: userData.email || "",
      name: userData.name || "",
      age: userData.age || 0,
      dob: userData.dob ? dayjs(userData.dob) : dayjs(),
      gender: userData.gender || "",
      about: userData.about || "",
    },
  });

  function onSubmit(formData: z.infer<typeof updateInputSchema>) {
    setissubmitting(true);
    const formattedDate = dayjs(formData.dob)
      .utc()
      .startOf("day")
      .toISOString();

    const age = dayjs().diff(dayjs(formattedDate), "year");
    const userData = { ...formData, dob: formattedDate, age: age };

    updateUser(
      { user_id: userId, userData },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
          setissubmitting(false);
          queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
          queryClient.invalidateQueries({
            queryKey: ["user-details", userId],
          });
        },
        onError: (error: any) => {
          setissubmitting(false);
          const errorMessage =
            error?.response?.data?.message || "An unexpected error occurred";
          toast.error(errorMessage);
        },
      }
    );
  }

  return (
    <div className=" p-5 m-5 flex gap-5 flex-col bg-white h-[100vh]">
      <div className="text-2xl font-medium">Edit User Details</div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col m-2 p-2 gap-2 w-1/2"
          >
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={field.value ? dayjs(field.value) : null}
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {!isLoading
                        ? genders?.map((gender: any) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))
                        : "loading"}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="about"
              control={form.control}
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
              Update User
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
