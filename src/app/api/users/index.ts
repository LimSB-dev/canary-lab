import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchUsers() {
  noStore();

  try {
    const users = await sql<IPost>`SELECT * FROM users`;

    return users.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}

export async function fetchUserById(id: string) {
  noStore();

  try {
    const user = await sql<IPost>`SELECT * FROM users WHERE id='${id}'`;

    return user.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}
