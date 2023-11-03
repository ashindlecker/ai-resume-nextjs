/*
  Warnings:

  - You are about to drop the column `json` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `jsonObject` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "json",
ADD COLUMN     "jsonObject" JSONB NOT NULL;
