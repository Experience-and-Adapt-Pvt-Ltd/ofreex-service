/*
  Warnings:

  - You are about to drop the column `gstNumber` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "gstNumber";

-- CreateTable
CREATE TABLE "Category" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("label")
);
