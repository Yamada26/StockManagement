-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK');

-- CreateTable
CREATE TABLE "public"."Book" (
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priceAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "public"."Stock" (
    "stockId" TEXT NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'OUT_OF_STOCK',
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_bookId_key" ON "public"."Stock"("bookId");

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE;
