/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `FollowRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FollowRequest_senderId_receiverId_key" ON "public"."FollowRequest"("senderId", "receiverId");
