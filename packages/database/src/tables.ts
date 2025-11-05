import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  onlineAt: timestamp('online_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  email: varchar('email').notNull().unique(),
  username: varchar('username').notNull().unique(),
  name: varchar('name').notNull(),
  phone: varchar('phone'),
  avatarUrl: varchar('avatar_url'),
})

export const pages = pgTable('pages', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  rating: numeric('rating', { mode: 'number' }).notNull().default(0),
})

export const points = pgTable('points', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  title: varchar('name').notNull(),
  address: varchar('address').notNull(),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const pageRelations = relations(pages, ({ many }) => ({
  points: many(points),
}))

export const pointRelations = relations(points, ({ one }) => ({
  page: one(pages, {
    fields: [points.pageId],
    references: [pages.id],
  }),
}))
