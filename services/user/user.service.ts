import {
  deleteDataById,
  getAll,
  insertData,
  OpenDb,
  updateDataById,
} from "../../utils/sqlite.utils";
import { CreateUserDto, User } from "./user.model";

export const getAllUsers = async () => {
  const res: User[] = await getAll("Users");
  return res;
};

export const createNewUser = async (createUserDto: CreateUserDto) => {
  const res = await insertData("Users", createUserDto);
  return res;
};

export const updateUserById = async (
  id: string,
  createUserDto: CreateUserDto
) => {
  const res = await updateDataById("Users", id, createUserDto);
  return res;
};

export const deleteUserById = async (id: string) => {
  const res = await deleteDataById("Users", id);
  return res;
};
