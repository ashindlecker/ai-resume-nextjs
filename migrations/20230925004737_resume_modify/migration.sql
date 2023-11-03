/*
  Warnings:

  - You are about to drop the column `fromJobDescription` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `fromJobPostingLocation` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `fromJobTitle` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `object` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `ResumeEmployment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResumeEmploymentDuty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `json` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumeEmployment" DROP CONSTRAINT "ResumeEmployment_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeEmploymentDuty" DROP CONSTRAINT "ResumeEmploymentDuty_employmentId_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "fromJobDescription",
DROP COLUMN "fromJobPostingLocation",
DROP COLUMN "fromJobTitle",
DROP COLUMN "object",
ADD COLUMN     "fromJobPostingId" TEXT,
ADD COLUMN     "json" JSONB NOT NULL;

-- DropTable
DROP TABLE "ResumeEmployment";

-- DropTable
DROP TABLE "ResumeEmploymentDuty";

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postLocation" TEXT,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_fromJobPostingId_fkey" FOREIGN KEY ("fromJobPostingId") REFERENCES "JobPosting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
