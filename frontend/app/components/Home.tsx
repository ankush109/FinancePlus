"use client";

import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

import { useGetAllUsersQuery } from "../hooks/query/useGetAllUserQuery";

const Home = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [userData, setUserData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  const handleSortByAge = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === "asc") return b.age - a.age;
      return a.age - b.age;
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setUserData(sortedData);
  };

  const filteredUsers = userData.filter((user) => {
    return (
      (search.trim()
        ? user.name.toLowerCase().includes(search.toLowerCase())
        : true) &&
      (!filterGender || user.gender === filterGender)
    );
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by name..."
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
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="truncate">{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell className="text-right">{user.age}</TableCell>
              <TableCell className="text-right">{user.dob}</TableCell>
              <TableCell className="truncate max-w-[250px] overflow-hidden text-ellipsis">
                {user.about}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
