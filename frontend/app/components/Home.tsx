"use client";
import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Loader } from "lucide-react";
import { useGetAllUsersQuery } from "../hooks/query/useGetAllUserQuery";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useDeleteMutation } from "../hooks/mutation/useDeleteMutation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Gender } from "../types/FormSchema";
import LoaderComponent from "./LoaderComponent";
import { useDebounceValue } from "../hooks/hook";

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userData, setUserData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [filterGender, setFilterGender] = useState<Gender>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>("asc");
  const [totalPages, settotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { mutate: deleteUser } = useDeleteMutation();
  const debouncedSearch = useDebounceValue(search);
  const { data, isLoading, refetch, isFetching } = useGetAllUsersQuery(
    sortOrder,
    filterGender,
    debouncedSearch,
    currentPage
  );

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data.users);
      settotalPages(data?.data.totalPageCount);
    }
  }, [data?.data]);

  useEffect(() => {
    console.log(debouncedSearch, "debounced search!");
    refetch();
  }, [filterGender, debouncedSearch, currentPage]);
  const handleSortByAge = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    refetch();
  };

  if (isLoading)
    return (
      <p>
        {" "}
        <LoaderComponent />
      </p>
    );

  const handleDeleteUser = (user_id: number) => {
    deleteUser(user_id, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="p-5 border-2 border-gray-300 m-5 rounded-2xl">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />

        <Select
          onValueChange={(value: Gender) => setFilterGender(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>

        <div onClick={() => router.push("/add")}>
          <Button className="cursor-pointer">
            Add User
            <IoMdAdd />
          </Button>
        </div>

        <Button onClick={handleSortByAge} className="ml-auto">
          Sort by Age {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>

      <Table className="w-full border">
        <TableCaption>List of Registered Users</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[100px]">Gender</TableHead>
            <TableHead className="text-right w-[80px]">Age</TableHead>
            <TableHead className="text-right w-[150px]">
              Date of Birth
            </TableHead>
            <TableHead className="text-left w-[300px]">About</TableHead>
            <TableHead className="">Edit</TableHead>
            <TableHead className="">Delete</TableHead>
          </TableRow>
        </TableHeader>

        {isFetching ? (
          <div className="flex  items-center  h-[300px]">
            <LoaderComponent />
          </div>
        ) : userData.length > 0 ? (
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="truncate">{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell className="text-right">{user.age}</TableCell>
                <TableCell className="text-right">
                  {dayjs(user.dob).format("DD/MM/YY")}
                </TableCell>
                <TableCell className="truncate max-w-[250px] overflow-hidden text-ellipsis">
                  {user.about}
                </TableCell>
                <TableCell className="w-[20px]">
                  <div onClick={() => router.push(`/edit/${user.id}`)}>
                    <MdEdit size={20} className="cursor-pointer" />
                  </div>
                </TableCell>
                <TableCell className="w-[20px]">
                  <div onClick={() => handleDeleteUser(user.id)}>
                    <MdDelete size={20} className="cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <p className="text-center mt-4">No users found.</p>
        )}
      </Table>

      <div className="flex justify-end items-center mt-4 gap-4">
        <Button
          className="cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
