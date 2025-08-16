-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('USER_REGISTERED', 'USER_LOGGED_IN', 'POST_CREATED', 'POST_LIKED', 'POST_COMMENTED', 'USER_FOLLOWED', 'MESSAGE_SENT', 'PROFILE_VIEWED');

-- CreateTable
CREATE TABLE "public"."AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "eventType" "public"."EventType" NOT NULL,
    "userId" TEXT NOT NULL,
    "targetId" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AnalyticsEvent_eventType_timestamp_idx" ON "public"."AnalyticsEvent"("eventType", "timestamp");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_userId_timestamp_idx" ON "public"."AnalyticsEvent"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_timestamp_idx" ON "public"."AnalyticsEvent"("timestamp");
