CREATE TABLE "badge_levels" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"level_number" integer DEFAULT 0 NOT NULL,
	"required_xp" integer DEFAULT 0 NOT NULL,
	"badge_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"image_url" varchar,
	"image_animated_url" varchar,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_review_moderation_requests" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"comment" text,
	"page_review_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_review_votes" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"type" varchar NOT NULL,
	"page_review_id" varchar(24) NOT NULL,
	"user_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_reviews" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"comment" text,
	"pros" text,
	"cons" text,
	"verified" boolean DEFAULT false NOT NULL,
	"status" varchar DEFAULT 'draft' NOT NULL,
	"likes_count" integer DEFAULT 0 NOT NULL,
	"dislikes_count" integer DEFAULT 0 NOT NULL,
	"vote_balance" integer DEFAULT 0 NOT NULL,
	"page_id" varchar(24) NOT NULL,
	"user_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"rating" numeric DEFAULT 0 NOT NULL,
	"reviews_count" integer DEFAULT 0 NOT NULL,
	"reviews_count_5" integer DEFAULT 0 NOT NULL,
	"reviews_count_4" integer DEFAULT 0 NOT NULL,
	"reviews_count_3" integer DEFAULT 0 NOT NULL,
	"reviews_count_2" integer DEFAULT 0 NOT NULL,
	"reviews_count_1" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "points" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"page_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_badge_tasks" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone,
	"reward_xp" integer DEFAULT 0 NOT NULL,
	"status" varchar DEFAULT 'active' NOT NULL,
	"conditions" jsonb NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"badge_id" varchar(24) NOT NULL,
	"target_badge_level_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"current_level" integer DEFAULT 0 NOT NULL,
	"total_xp" integer DEFAULT 0 NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"badge_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"online_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"name" varchar NOT NULL,
	"phone" varchar,
	"avatar_url" varchar,
	"level" integer DEFAULT 0 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"xp_to_next_level" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "badge_levels" ADD CONSTRAINT "badge_levels_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "page_review_moderation_requests" ADD CONSTRAINT "page_review_moderation_requests_page_review_id_page_reviews_id_fk" FOREIGN KEY ("page_review_id") REFERENCES "public"."page_reviews"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "page_review_votes" ADD CONSTRAINT "page_review_votes_page_review_id_page_reviews_id_fk" FOREIGN KEY ("page_review_id") REFERENCES "public"."page_reviews"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "page_review_votes" ADD CONSTRAINT "page_review_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "page_reviews" ADD CONSTRAINT "page_reviews_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "page_reviews" ADD CONSTRAINT "page_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "points" ADD CONSTRAINT "points_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_badge_tasks" ADD CONSTRAINT "user_badge_tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_badge_tasks" ADD CONSTRAINT "user_badge_tasks_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_badge_tasks" ADD CONSTRAINT "user_badge_tasks_target_badge_level_id_badge_levels_id_fk" FOREIGN KEY ("target_badge_level_id") REFERENCES "public"."badge_levels"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_page_review_votes" ON "page_review_votes" USING btree ("page_review_id","user_id");