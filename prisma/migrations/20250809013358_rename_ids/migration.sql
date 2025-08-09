/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookId` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `Stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stockId` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `id` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Stock" DROP CONSTRAINT "Stock_bookId_fkey";

-- AlterTable
ALTER TABLE "public"."Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "bookId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Stock" DROP CONSTRAINT "Stock_pkey",
DROP COLUMN "stockId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
