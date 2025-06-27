-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_plays_in_fkey";

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_plays_in_fkey" FOREIGN KEY ("plays_in") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
