/*
  Warnings:

  - You are about to drop the column `email` on the `authors` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "authors_email_key";

-- AlterTable
ALTER TABLE "authors" DROP COLUMN "email";
