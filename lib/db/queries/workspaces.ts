import db from "../db";
import { workspaces } from "../schema";
import { eq } from "drizzle-orm";

export async function getWorkspaces() {
  return await db.select().from(workspaces);
}

export async function getWorkspaceById(id: string) {
  const result = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, id))
    .limit(1);

  return result[0] || null;
}

export async function deleteWorkspace(id: string) {
  return await db
    .delete(workspaces)
    .where(eq(workspaces.id, id));
}
