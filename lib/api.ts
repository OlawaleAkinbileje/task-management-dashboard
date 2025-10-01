import { Task } from "@/lib/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const API_BASE = "https://api.oluwasetemi.dev/tasks";

export async function fetchTasks(
  params: {
    all?: boolean;
    page?: number;
    limit?: number;
    status?: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    search?: string;
    sort?: "ASC" | "DESC";
  } = {}
): Promise<Task[]> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      throw new Error("Unauthorized: No valid session or access token");
    }

    const query = new URLSearchParams();
    if (params.all) query.set("all", String(params.all));
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.status) query.set("status", params.status);
    if (params.priority) query.set("priority", params.priority);
    if (params.search) query.set("search", params.search);
    if (params.sort) query.set("sort", params.sort);

    const res = await fetch(`${API_BASE}?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("fetchTasks error:", error);
    throw error;
  }
}
