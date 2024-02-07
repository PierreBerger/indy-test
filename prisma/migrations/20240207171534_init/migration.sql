-- CreateTable
CREATE TABLE "Promocode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "advantage" INTEGER NOT NULL,
    "restrictions" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Promocode_name_key" ON "Promocode"("name");
