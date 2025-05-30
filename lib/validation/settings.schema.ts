import { z } from "zod"

export const settingsSchema = z.object({
  username: z.string().min(1, "Username is required"),
  theme: z.enum(["system", "light", "dark"]),
  language: z.enum(["en"]),
  onboardingComplete: z.boolean()
})

export type SettingsInput = z.infer<typeof settingsSchema>