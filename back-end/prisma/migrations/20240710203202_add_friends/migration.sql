-- CreateTable
CREATE TABLE "_UserRequests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_friends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserRequests_AB_unique" ON "_UserRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRequests_B_index" ON "_UserRequests"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- AddForeignKey
ALTER TABLE "_UserRequests" ADD CONSTRAINT "_UserRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRequests" ADD CONSTRAINT "_UserRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user") ON DELETE CASCADE ON UPDATE CASCADE;
