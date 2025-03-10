import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import LoaderComponent from "./LoaderComponent";
import Link from "next/link";

interface UserTableProps {
  userData: any[];
  isLoading: boolean;
  isFetching: boolean;
  handleDeleteUser: (id: number) => void;
}
const UserTable: React.FC<UserTableProps> = ({
  userData,
  isFetching,
  handleDeleteUser,
  isLoading,
}) => {
  return (
    <Table className="w-full border">
      <TableCaption>List of Registered Users</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead className="w-[200px]">Email</TableHead>
          <TableHead className="w-[100px]">Gender</TableHead>
          <TableHead className="text-right w-[80px]">Age</TableHead>
          <TableHead className="text-right w-[150px]">Date of Birth</TableHead>
          <TableHead className="text-left w-[300px]">About</TableHead>
          <TableHead className="">Edit</TableHead>
          <TableHead className="">Delete</TableHead>
        </TableRow>
      </TableHeader>

      {isFetching || isLoading ? (
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
                <Link href={`/edit/${user.id}`}>
                  <MdEdit size={20} className="cursor-pointer" />
                </Link>
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
  );
};

export default UserTable;
