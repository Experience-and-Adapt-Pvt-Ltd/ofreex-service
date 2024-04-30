/*
  Warnings:

  - You are about to drop the column `itemCount` on the `settings` table. All the data in the column will be lost.
  - Added the required column `key` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" DROP COLUMN "itemCount",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
