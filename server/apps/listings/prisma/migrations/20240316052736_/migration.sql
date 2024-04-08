-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT,
    "condition" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "imageUrls" TEXT[],
    "userId" INTEGER NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
