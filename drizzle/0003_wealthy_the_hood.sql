ALTER TABLE "enrollments" RENAME COLUMN "userIdL" TO "userId";--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_userIdL_users_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;