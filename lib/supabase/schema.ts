import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

export const workspaces = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  title: text('title').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
})

export const folders = pgTable('folders', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  title: text('title').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' })
})

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  title: text('title').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }),
  folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'cascade' })
})