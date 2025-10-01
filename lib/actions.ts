"use server";

import { Task } from "@/lib/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const API_BASE = "https://api.oluwasetemi.dev/tasks";

export async function createTask(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) throw new Error("Unauthorized");

  const payload: Partial<Task> = {
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    status: (formData.get("status") as Task["status"]) || "TODO",
    priority: (formData.get("priority") as Task["priority"]) || "LOW",
    start: formData.get("start") as string | null,
    end: formData.get("end") as string | null,
    duration: formData.get("duration")
      ? Number(formData.get("duration"))
      : null,
    archived: formData.get("archived") === "true",
    isDefault: formData.get("isDefault") === "true" ? true : null,
    parentId: formData.get("parentId") as string | null,
    children: (formData.get("children") as string | null) ?? '',
    tags: formData.get("tags") as string | null,
  };

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || `Failed to create task: ${res.statusText}`
    );
  }

  revalidatePath("/dashboard");
  return res.json();
}

export async function updateTask(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) throw new Error("Unauthorized");

  const payload: Partial<Task> = {
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    status: (formData.get("status") as Task["status"]) || undefined,
    priority: (formData.get("priority") as Task["priority"]) || undefined,
    start: formData.get("start") as string | null,
    end: formData.get("end") as string | null,
    duration: formData.get("duration")
      ? Number(formData.get("duration"))
      : null,
    archived: formData.get("archived") === "true",
    isDefault: formData.get("isDefault") === "true" ? true : null,
    parentId: formData.get("parentId") as string | null,
    children: (formData.get("children") as string | null) ?? '',
    tags: formData.get("tags") as string | null,
  };

  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || `Failed to update task: ${res.statusText}`
    );
  }

  revalidatePath("/dashboard");
  return res.json();
}

export async function deleteTask(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || `Failed to delete task: ${res.statusText}`
    );
  }

  revalidatePath("/dashboard");
}
