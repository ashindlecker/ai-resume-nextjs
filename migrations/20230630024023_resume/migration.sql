/*
  Warnings:

  - Added the required column `fromJobDescription` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromJobTitle` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "fromJobDescription" TEXT NOT NULL,
ADD COLUMN     "fromJobPostingLocation" TEXT,
ADD COLUMN     "fromJobTitle" TEXT NOT NULL;
