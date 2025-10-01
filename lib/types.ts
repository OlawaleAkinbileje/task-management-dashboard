export interface Task {
  id: string;
  name: string;
  description: string | null;
  start: string | null;
  end: string | null;
  duration: number | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  archived: boolean;
  isDefault: boolean | null;
  parentId: string | null;
  children: string;
  owner: string | null;
  tags: string | null;
  completedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  emailVerified: boolean; // Matches API schema
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  accessToken?: string;
  refreshToken?: string;
}
