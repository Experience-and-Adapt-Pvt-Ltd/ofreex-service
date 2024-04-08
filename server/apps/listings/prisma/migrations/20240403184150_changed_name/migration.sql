/*
  Warnings:

  - You are about to drop the column `gstnumber` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `gstNumber` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "gstnumber",
ADD COLUMN     "gstNumber" TEXT NOT NULL;
