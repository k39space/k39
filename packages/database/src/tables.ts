import type { PagePinType, PageReviewModerationRequestStatus, PageReviewPhotoType, PageReviewStatus, PageReviewVoteType, PhotoVersionFormat, PhotoVersionSize, UserBadgeTaskStatus } from './types/entities'
import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { boolean, integer, jsonb, numeric, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  onlineAt: timestamp('online_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  email: varchar('email').notNull().unique(),
  username: varchar('username').notNull().unique(),
  name: varchar('name').notNull(),
  phone: varchar('phone'),
  avatarUrl: varchar('avatar_url'),
  level: integer('level').notNull().default(0),
  xp: integer('xp').notNull().default(0),
  xpToNextLevel: integer('xp_to_next_level').notNull().default(0),
})

export const badges = pgTable('badges', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  imageUrl: varchar('image_url'),
  imageAnimatedUrl: varchar('image_animated_url'),
  isActive: boolean('is_active').notNull().default(true),
})

export const badgeLevels = pgTable('badge_levels', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  levelNumber: integer('level_number').notNull().default(0),
  requiredXp: integer('required_xp').notNull().default(0),
  badgeId: cuid2('badge_id').notNull().references(() => badges.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userBadges = pgTable('user_badges', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  currentLevel: integer('current_level').notNull().default(0),
  totalXp: integer('total_xp').notNull().default(0),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  badgeId: cuid2('badge_id').notNull().references(() => badges.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userBadgeTasks = pgTable('user_badge_tasks', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { precision: 3, withTimezone: true, mode: 'string' }),
  expiresAt: timestamp('expires_at', { precision: 3, withTimezone: true, mode: 'string' }),
  rewardXp: integer('reward_xp').notNull().default(0),
  status: varchar('status').notNull().default('active').$type<UserBadgeTaskStatus>(),

  // { type: 'write_review', progress: 0, target: 1 }
  conditions: jsonb('conditions').notNull(),

  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  badgeId: cuid2('badge_id').notNull().references(() => badges.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  targetBadgeLevelId: cuid2('target_badge_level_id').notNull().references(() => badgeLevels.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const categories = pgTable('categories', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull().unique(),
  title: varchar('title').notNull(),
  description: varchar('description'),
})

export const pages = pgTable('pages', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull().unique(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  avatarUrl: varchar('avatar_url'),
  rating: numeric('rating', { mode: 'number' }).notNull().default(0),
  overallRating: numeric('overall_rating', { mode: 'number' }).notNull().default(0),
  reviewsCount: integer('reviews_count').notNull().default(0),
  reviewsCount5: integer('reviews_count_5').notNull().default(0),
  reviewsCount4: integer('reviews_count_4').notNull().default(0),
  reviewsCount3: integer('reviews_count_3').notNull().default(0),
  reviewsCount2: integer('reviews_count_2').notNull().default(0),
  reviewsCount1: integer('reviews_count_1').notNull().default(0),
  followersCount: integer('followers_count').notNull().default(0),
})

export const locations = pgTable('locations', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  type: varchar('type'),
  fias: varchar('fias'),
  kladr: varchar('kladr'),
})

export const points = pgTable('points', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  address: varchar('address').notNull(),
  yandexUrl: varchar('yandex_url'),
  gisUrl: varchar('2gis_url'),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  locationId: cuid2('location_id').references(() => locations.id),
})

export const pageFollowers = pgTable('page_followers', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
}, (t) => [
  uniqueIndex('unique_page_followers').on(t.pageId, t.userId),
])

export const pageCategories = pgTable('page_categories', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  categoryId: cuid2('category_id').notNull().references(() => categories.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
}, (t) => [
  uniqueIndex('unique_page_categories').on(t.pageId, t.categoryId),
])

export const pagePins = pgTable('page_pins', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  type: varchar('type').notNull().$type<PagePinType>(),
  text: varchar('text'),
  mediaUrl: varchar('media_url'),
  userId: cuid2('user_id').references(() => users.id),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const pageReviews = pgTable('page_reviews', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  rating: integer('rating').notNull().default(0),
  privateComment: text('private_comment'),
  comment: text('comment'),
  pros: text('pros'),
  cons: text('cons'),
  recommends: boolean('recommends').notNull().default(false),
  verified: boolean('verified').notNull().default(false),
  status: varchar('status').notNull().default('draft').$type<PageReviewStatus>(),
  likesCount: integer('likes_count').notNull().default(0),
  dislikesCount: integer('dislikes_count').notNull().default(0),
  voteBalance: integer('vote_balance').notNull().default(0),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const pageReviewVotes = pgTable('page_review_votes', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  type: varchar('type').notNull().$type<PageReviewVoteType>(),
  pageReviewId: cuid2('page_review_id').notNull().references(() => pageReviews.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
}, (t) => [
  uniqueIndex('unique_page_review_votes').on(t.pageReviewId, t.userId),
])

export const pageReviewPhotos = pgTable('page_review_photos', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  type: varchar('type').notNull().$type<PageReviewPhotoType>(),
  pageReviewId: cuid2('page_review_id').notNull().references(() => pageReviews.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  photoId: cuid2('photo_id').notNull().references(() => photos.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const pageReviewModerationRequests = pgTable('page_review_moderation_requests', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  status: varchar('status').notNull().default('pending').$type<PageReviewModerationRequestStatus>(),
  comment: text('comment'),
  pageReviewId: cuid2('page_review_id').notNull().references(() => pageReviews.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const photos = pgTable('photos', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  uploadedAt: timestamp('uploaded_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  format: varchar('format').notNull(),
  name: varchar('name').notNull(),
  originalName: varchar('original_name'),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  isOptimized: boolean('is_optimized').notNull().default(false),
})

export const photoVersions = pgTable('photo_versions', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  format: varchar('format').notNull().$type<PhotoVersionFormat>(),
  name: varchar('name').notNull(),
  size: varchar('size').notNull().$type<PhotoVersionSize>(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  photoId: cuid2('photo_id').notNull().references(() => photos.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userRelations = relations(users, ({ many }) => ({
  badges: many(userBadges),
  badgeTasks: many(userBadgeTasks),
  pageReviews: many(pageReviews),
  pageReviewVotes: many(pageReviewVotes),
  pageFollowers: many(pageFollowers),
  pagePins: many(pagePins),
}))

export const badgeRelations = relations(badges, ({ many }) => ({
  levels: many(badgeLevels),
  userBadges: many(userBadges),
  userBadgeTasks: many(userBadgeTasks),
}))

export const badgeLevelRelations = relations(badgeLevels, ({ many }) => ({
  tasks: many(userBadgeTasks),
}))

export const userBadgeRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}))

export const userBadgeTaskRelations = relations(userBadgeTasks, ({ one }) => ({
  user: one(users, {
    fields: [userBadgeTasks.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadgeTasks.badgeId],
    references: [badges.id],
  }),
  targetLevel: one(badgeLevels, {
    fields: [userBadgeTasks.targetBadgeLevelId],
    references: [badgeLevels.id],
  }),
}))

export const categoryRelations = relations(categories, ({ many }) => ({
  pageCategories: many(pageCategories),
}))

export const pageRelations = relations(pages, ({ many }) => ({
  points: many(points),
  reviews: many(pageReviews),
  categories: many(pageCategories),
  followers: many(pageFollowers),
  pins: many(pagePins),
}))

export const pageFollowerRelations = relations(pageFollowers, ({ one }) => ({
  page: one(pages, {
    fields: [pageFollowers.pageId],
    references: [pages.id],
  }),
  user: one(users, {
    fields: [pageFollowers.userId],
    references: [users.id],
  }),
}))

export const pageCategoryRelations = relations(pageCategories, ({ one }) => ({
  page: one(pages, {
    fields: [pageCategories.pageId],
    references: [pages.id],
  }),
  category: one(categories, {
    fields: [pageCategories.categoryId],
    references: [categories.id],
  }),
}))

export const pagePinRelations = relations(pagePins, ({ one }) => ({
  page: one(pages, {
    fields: [pagePins.pageId],
    references: [pages.id],
  }),
  user: one(users, {
    fields: [pagePins.userId],
    references: [users.id],
  }),
}))

export const pageReviewRelations = relations(pageReviews, ({ one, many }) => ({
  moderationRequests: many(pageReviewModerationRequests),
  photos: many(pageReviewPhotos),
  page: one(pages, {
    fields: [pageReviews.pageId],
    references: [pages.id],
  }),
  user: one(users, {
    fields: [pageReviews.userId],
    references: [users.id],
  }),
}))

export const pageReviewPhotoRelations = relations(pageReviewPhotos, ({ one }) => ({
  pageReview: one(pageReviews, {
    fields: [pageReviewPhotos.pageReviewId],
    references: [pageReviews.id],
  }),
  photo: one(photos, {
    fields: [pageReviewPhotos.photoId],
    references: [photos.id],
  }),
}))

export const pageReviewVoteRelations = relations(pageReviewVotes, ({ one }) => ({
  pageReview: one(pageReviews, {
    fields: [pageReviewVotes.pageReviewId],
    references: [pageReviews.id],
  }),
  user: one(users, {
    fields: [pageReviewVotes.userId],
    references: [users.id],
  }),
}))

export const pageReviewModerationRequestRelations = relations(pageReviewModerationRequests, ({ one }) => ({
  pageReview: one(pageReviews, {
    fields: [pageReviewModerationRequests.pageReviewId],
    references: [pageReviews.id],
  }),
}))

export const locationRelations = relations(locations, ({ many }) => ({
  points: many(points),
}))

export const pointRelations = relations(points, ({ one }) => ({
  page: one(pages, {
    fields: [points.pageId],
    references: [pages.id],
  }),
  location: one(locations, {
    fields: [points.locationId],
    references: [locations.id],
  }),
}))

export const photoRelations = relations(photos, ({ many }) => ({
  versions: many(photoVersions),
  pageReviewPhotos: many(pageReviewPhotos),
}))

export const photoVersionRelations = relations(photoVersions, ({ one }) => ({
  photo: one(photos, {
    fields: [photoVersions.photoId],
    references: [photos.id],
  }),
}))
