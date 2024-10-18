/*
  Warnings:

  - Added the required column `creatorId` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "creatorId" TEXT NOT NULL;
