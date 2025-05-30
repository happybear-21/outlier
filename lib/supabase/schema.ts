import { pgTable, timestamp, uuid, text, boolean } from "drizzle-orm/pg-core";

export const settings = pgTable('settings', {
  username: text("username").notNull(),
  theme: text("theme").default("system"),
  language: text("language").default("en"),
  onboardingComplete: boolean("onboarding_complete").default(false),
})

export const workspaces = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  // Used to associate a workspace with a user; can be ignored for self-hosted single-user setups.
  // If you add auth later, this can store the authenticated user's ID.
  workspaceOwner: uuid('workspace_owner').default('00000000-0000-0000-0000-000000000000'),
  title: text('title').notNull(),
  iconID: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  bannerUrl: text('banner_url'),
})

export const folders = pgTable('folders', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  title: text('title').notNull(),
  iconID: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  bannerUrl: text('banner_url'),
  workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' })
})

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  title: text('title').notNull(),
  iconID: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  bannerUrl: text('banner_url'),
  workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }),
  folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'cascade' })
})