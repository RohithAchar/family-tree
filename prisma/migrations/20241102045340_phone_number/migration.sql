/*
  Warnings:

  - Added the required column `phoneNumber` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "phoneNumber" INTEGER NOT NULL;
