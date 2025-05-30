import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  console.log('Cannot find database url!!!')
}

export default defineConfig({
  out: './migrations',
  schema: './lib/supabase/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: true
  },
})