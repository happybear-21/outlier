import db from "../db";
import { workspaces } from "../schema";

export async function getWorkspaces() {
  return await db.select().from(workspaces);
}
