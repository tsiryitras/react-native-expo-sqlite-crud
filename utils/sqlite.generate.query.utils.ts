import { ColumnType } from "../types/colum.type";
import { QueryType } from "../types/query.type";

export function generateCreateTableQuery<T extends Record<string, any>>(
  tableName: string,
  schema: T
): string {
  const columns = Object.keys(schema).map((key) => {
    let columnType: string;
    let constraints: string = "";

    switch (typeof (schema as Record<string, any>)[key]) {
      case "string":
        columnType = ColumnType.TEXT;
        break;
      case "number":
        columnType = ColumnType.NUMBER;
        break;
      default:
        columnType = ColumnType.NUMBER;
    }

    if (key === "id") {
      constraints = `${ColumnType.PRIMARY_KEY} ${ColumnType.AUTO_INCREMENT}`;
    } else if ((schema as Record<string, any>)[key] !== undefined) {
      constraints = ColumnType.NOT_NULL;
    }

    return `${key} ${columnType} ${constraints}`;
  });

  return `${QueryType.CREATE} ${tableName} (${columns.join(", ")});`;
}

export function generateInsertDataQuery<T extends Record<string, any>>(
  tableName: string,
  data: T
): string {
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data)
    .map((value) =>
      typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value
    )
    .join(", ");

  return `${QueryType.INSERT}  ${tableName} (${columns}) VALUES (${values});`;
}

export function generateUpdateDataQuery<T extends Record<string, any>>(
  tableName: string,
  id: string | number,
  data: T
): string {
  const setClause = Object.entries(data)
    .map(([key, value]) =>
      typeof value === "string"
        ? `${key} = '${value.replace(/'/g, "''")}'`
        : `${key} = ${value}`
    )
    .join(", ");

  return `${QueryType.UPDATE} ${tableName} SET ${setClause} WHERE id = ${
    typeof id === "string" ? `'${id}'` : id
  };`;
}
