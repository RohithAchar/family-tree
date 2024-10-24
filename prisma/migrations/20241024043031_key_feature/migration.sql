/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Family` table. All the data in the column will be lost.
  - Added the required column `key` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" DROP COLUMN "creatorId",
ADD COLUMN     "key" INTEGER NOT NULL;
