import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
