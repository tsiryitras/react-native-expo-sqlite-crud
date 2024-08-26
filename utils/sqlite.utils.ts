import * as SQLite from "expo-sqlite";
import { AppConfig } from "../configuration/constant.configuration";
import { ColumnType } from "../types/colum.type";
import { QueryType } from "../types/query.type";
import { ReducerWithoutAction } from "react";
import { InsertResponse } from "../types/response.type";
import {
  generateCreateTableQuery,
  generateInsertDataQuery,
  generateUpdateDataQuery,
} from "./sqlite.generate.query.utils";

export interface TableKeys<T> {}

export const OpenDb = async () => {
  return await SQLite.openDatabaseAsync(AppConfig.dbName);
};

export async function initTable<T extends Record<string, any>>(
  tableName: string,
  tableKeys: T
) {
  const db = await OpenDb();

  const query = generateCreateTableQuery(tableName, tableKeys);

  db.execAsync(query);
}

export const getAll = async <T>(tableName: string): Promise<T[]> => {
  try {
    const db = await OpenDb();
    const res = await db.getAllAsync(`${QueryType.GET_ALL} ${tableName}`);
    return res as T[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertData = async <T>(
  tableName: string,
  data: any
): Promise<InsertResponse> => {
  try {
    const db = await OpenDb();
    const query = generateInsertDataQuery(tableName, data);
    db.runAsync(query);
    return { status: "OK" };
  } catch (error) {
    console.log(error);
    return { status: "Error", message: String(error) };
  }
};

export const updateDataById = async <T>(
  tableName: string,
  id: string,
  data: any
): Promise<InsertResponse> => {
  try {
    const db = await OpenDb();
    const query = generateUpdateDataQuery(tableName, id, data);
    db.runAsync(query);
    return { status: "OK" };
  } catch (error) {
    console.log(error);
    return { status: "Error", message: String(error) };
  }
};

export const deleteDataById = async (
  tableName: string,
  id: string
): Promise<InsertResponse> => {
  try {
    const db = await OpenDb();
    const query = `${QueryType.DELETE} ${tableName} WHERE id = ${id};`;
    await db.runAsync(query);
    return { status: "OK" };
  } catch (error) {
    console.log(error);
    return { status: "Error", message: String(error) };
  }
};
