import db from "../db";
import { settings } from "../schema"

export async function getSettings() {
  const result = await db.select().from(settings).limit(1)
  return result[0] ?? null
}

export async function createSettingsIfNotExist(data: { username: string, theme?: string; language?: string; onboardingComplete?: boolean }) {
  const existing = await getSettings();
  if (!existing) { await db.insert(settings).values(data) }
}

export async function updateSettings(updates: Partial<typeof settings.$inferInsert>) {
  await db.update(settings).set(updates)
}
