/*
  Warnings:

  - The `status` column on the `tournaments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "tournament_status" AS ENUM ('open', 'finished', 'in_progress');

-- AlterTable
ALTER TABLE "tournaments" DROP COLUMN "status",
ADD COLUMN     "status" "tournament_status" NOT NULL DEFAULT 'open';

-- DropEnum
DROP TYPE "tournament_stauts";

-- CreateTable
CREATE TABLE "stage_registrations" (
    "stage_registration_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stage_id" UUID NOT NULL,
    "team_public_id" TEXT NOT NULL,
    "tournament_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_registrations_pkey" PRIMARY KEY ("stage_registration_id")
);

-- AddForeignKey
ALTER TABLE "stage_registrations" ADD CONSTRAINT "stage_registrations_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stages"("stage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stage_registrations" ADD CONSTRAINT "stage_registrations_team_public_id_fkey" FOREIGN KEY ("team_public_id") REFERENCES "teams"("public_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stage_registrations" ADD CONSTRAINT "stage_registrations_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
