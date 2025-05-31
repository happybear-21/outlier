import db from "../db";
import { settings } from "../schema"

type Settings = typeof settings.$inferSelect

export async function createSettings(): Promise<Settings> {
  const defaultSettings = {
    username: "Guest",
    theme: "system",
    language: "en"
  }
  const inserted = await db.insert(settings).values(defaultSettings).returning()
  return inserted[0]
}

export async function getSettingField<K extends keyof Settings>(field: K): Promise<Settings[K] | null> {
  const result = await db
    .select({ value: settings[field] })
    .from(settings)
    .limit(1);

  return result[0]?.value ?? null;
}

export async function updateSetting(data: Partial<Settings>) {
  const result = await db.update(settings).set(data).returning()
  return result[0]
}