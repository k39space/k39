import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from '../tables'

export type { Database } from '../connection'

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

export type Category = InferSelectModel<typeof tables.categories>
export type CategoryDraft = InferInsertModel<typeof tables.categories>

export type Page = InferSelectModel<typeof tables.pages>
export type PageDraft = InferInsertModel<typeof tables.pages>
export type PageWithData = Page & {
  categories: PageCategoryWithData[]
  followers: PageFollowerWithData[]
}

export type PageFollower = InferSelectModel<typeof tables.pageFollowers>
export type PageFollowerDraft = InferInsertModel<typeof tables.pageFollowers>
export type PageFollowerWithData = PageFollower & {
  user: User
}

export type PageCategory = InferSelectModel<typeof tables.pageCategories>
export type PageCategoryDraft = InferInsertModel<typeof tables.pageCategories>
export type PageCategoryWithData = PageCategory & {
  category: Category
}

export type PageReview = InferSelectModel<typeof tables.pageReviews>
export type PageReviewDraft = InferInsertModel<typeof tables.pageReviews>
export type PageReviewWithUser = PageReview & {
  user: User
}
export type PageReviewWithData = PageReview & {
  user: User
  page: Page
  photos: PageReviewPhotoWithData[]
}

export type PageReviewPhoto = InferSelectModel<typeof tables.pageReviewPhotos>
export type PageReviewPhotoDraft = InferInsertModel<typeof tables.pageReviewPhotos>
export type PageReviewPhotoWithData = PageReviewPhoto & {
  photo: PhotoWithData
}

export type PageReviewVote = InferSelectModel<typeof tables.pageReviewVotes>
export type PageReviewVoteDraft = InferInsertModel<typeof tables.pageReviewVotes>

export type PageReviewModerationRequest = InferSelectModel<typeof tables.pageReviewModerationRequests>
export type PageReviewModerationRequestDraft = InferInsertModel<typeof tables.pageReviewModerationRequests>

export type Point = InferSelectModel<typeof tables.points>
export type PointDraft = InferInsertModel<typeof tables.points>

export type Photo = InferSelectModel<typeof tables.photos>
export type PhotoDraft = InferInsertModel<typeof tables.photos>
export type PhotoWithData = Photo & {
  versions: PhotoVersion[]
}

export type PhotoVersion = InferSelectModel<typeof tables.photoVersions>
export type PhotoVersionDraft = InferInsertModel<typeof tables.photoVersions>
