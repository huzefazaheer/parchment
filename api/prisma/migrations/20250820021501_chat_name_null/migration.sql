/*
  Warnings:

  - You are about to drop the column `accepted` on the `FollowRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Chat" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."FollowRequest" DROP COLUMN "accepted";
