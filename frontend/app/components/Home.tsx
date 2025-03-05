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
import { ArrowUp, ArrowDown } from "lucide-react";
import { useGetAllUsersQuery } from "../hooks/query/useGetAllUserQuery";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useDeleteMutation } from "../hooks/mutation/useDeleteMutation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAllUsersQuery();
  const [userData, setUserData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutate: deleteUser } = useDeleteMutation();
  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data?.data]);

  const handleSortByAge = () => {
    const sortedData = [...userData].sort((a, b) =>
      sortOrder === "asc" ? b.age - a.age : a.age - b.age
    );
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setUserData(sortedData);
  };

  if (isLoading) return <p>Loading...</p>;

  const filteredUsers = userData.filter((user) => {
    return (
      (search.trim()
        ? user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        : true) &&
      (filterGender !== "all"
        ? !filterGender || user.gender === filterGender
        : true)
    );
  });
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

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-5 border-2 border-gray-300 m-5 rounded-2xl">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />

        <Select onValueChange={setFilterGender}>
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

        {paginatedUsers.length > 0 ? (
          <TableBody>
            {paginatedUsers.map((user) => (
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
