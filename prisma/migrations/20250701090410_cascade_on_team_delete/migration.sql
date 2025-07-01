-- DropForeignKey
ALTER TABLE "tournament_registrations" DROP CONSTRAINT "tournament_registrations_team_id_fkey";

-- AddForeignKey
ALTER TABLE "tournament_registrations" ADD CONSTRAINT "tournament_registrations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
