/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `brain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "brain_name_userId_key" ON "brain"("name", "userId");
