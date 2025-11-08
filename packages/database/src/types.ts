import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type User = InferSelectModel<typeof tables.users>
export type UserDraft = InferInsertModel<typeof tables.users>
export type UserWithData = User & {
  badges: UserBadge[]
  badgeTasks: UserBadgeTask[]
}

export type Badge = InferSelectModel<typeof tables.badges>
export type BadgeDraft = InferInsertModel<typeof tables.badges>

export type BadgeLevel = InferSelectModel<typeof tables.badgeLevels>
export type BadgeLevelDraft = InferInsertModel<typeof tables.badgeLevels>

export type UserBadge = InferSelectModel<typeof tables.userBadges>
export type UserBadgeDraft = InferInsertModel<typeof tables.userBadges>

export type UserBadgeTask = InferSelectModel<typeof tables.userBadgeTasks>
export type UserBadgeTaskDraft = InferInsertModel<typeof tables.userBadgeTasks>
export type UserBadgeTaskStatus = 'active' | 'completed' | 'failed' | 'expired'

export type Page = InferSelectModel<typeof tables.pages>
export type PageDraft = InferInsertModel<typeof tables.pages>
export type PageWithData = Page & {
  reviews: PageReview[]
}

export type PageReview = InferSelectModel<typeof tables.pageReviews>
export type PageReviewDraft = InferInsertModel<typeof tables.pageReviews>
export type PageReviewStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'hidden'

export type PageReviewVote = InferSelectModel<typeof tables.pageReviewVotes>
export type PageReviewVoteDraft = InferInsertModel<typeof tables.pageReviewVotes>
export type PageReviewVoteType = 'like' | 'dislike'

export type PageReviewModerationRequest = InferSelectModel<typeof tables.pageReviewModerationRequests>
export type PageReviewModerationRequestDraft = InferInsertModel<typeof tables.pageReviewModerationRequests>
export type PageReviewModerationRequestStatus = 'pending' | 'approved' | 'rejected' | 'hidden'

export type Point = InferSelectModel<typeof tables.points>
export type PointDraft = InferInsertModel<typeof tables.points>
