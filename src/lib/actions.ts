"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "../../auth";

const FormSchema = z.object({
  id: z.string(),
  status: z.enum(["draft", "published"]),
  title: z.string({
    invalid_type_error: "Please type a title.",
  }),
  blocks: z.array(
    z.object({
      type: z.string(),
      data: z.object({
        text: z.string(),
      }),
    })
  ),
  tags: z.array(z.string(), {
    invalid_type_error: "Please select at least one tag.",
  }),
});

const CreatePost = FormSchema.omit({
  id: true,
});

export async function createPost(formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    status: formData.get("status"),
    title: formData.get("title"),
    blocks: formData.get("blocks"),
    tags: formData.getAll("tags"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { v4: uuidv4 } = require("uuid");
  const id = uuidv4();
  const { status, title, blocks, tags } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO post (id, title, data, tags, created_at, updated_at, deleted_at, status, likes, views)
      VALUES (${id}, ${title}, ${blocks}, ${tags}, ${date}, ${date}, NULL, ${status}, 0, 0)
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted post." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete post." };
  }
}

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials. Please try again.";
        default:
          return "Something went wrong. Please try again.";
      }
    }

    throw error;
  }
}
