-- CreateEnum
CREATE TYPE "tournament_stauts" AS ENUM ('open', 'finished', 'in_progress');

-- CreateTable
CREATE TABLE "players" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "slogan" TEXT,
    "plays_in" UUID,
    "public_id" TEXT,
    "phone" TEXT,
    "avatar_link" TEXT,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'Anonymus',
    "slogan" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "public_id" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tournament_date" TIMESTAMP(6) NOT NULL,
    "price" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "tournament_stauts" NOT NULL DEFAULT 'open',
    "location_id" UUID,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "group_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group_name" TEXT NOT NULL,
    "stage_id" UUID NOT NULL,
    "tournament_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "is_finalized" BOOLEAN DEFAULT false,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "matches" (
    "match_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "stage_id" UUID NOT NULL,
    "group_id" UUID,
    "home_team_id" UUID NOT NULL,
    "away_team_id" UUID NOT NULL,
    "match_winner" UUID,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("match_id")
);

-- CreateTable
CREATE TABLE "stages" (
    "stage_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stage_name" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "tournament_id" UUID,

    CONSTRAINT "stages_pkey" PRIMARY KEY ("stage_id")
);

-- CreateTable
CREATE TABLE "pre_registrations" (
    "pre_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournament_id" UUID NOT NULL,
    "team_id" UUID NOT NULL,

    CONSTRAINT "pre_registrations_pkey" PRIMARY KEY ("pre_id")
);

-- CreateTable
CREATE TABLE "tournament_registrations" (
    "registration_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournament_id" UUID NOT NULL,
    "team_id" UUID NOT NULL,

    CONSTRAINT "tournament_registrations_pkey" PRIMARY KEY ("registration_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "description" TEXT,
    "directions" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "staff" (
    "staff_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "public_id" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "player_id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "group_registrations" (
    "group_registration_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "group_id" UUID NOT NULL,
    "team_public_id" TEXT NOT NULL,
    "tournament_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_registrations_pkey" PRIMARY KEY ("group_registration_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_public_id_key" ON "players"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "players_phone_key" ON "players"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "players_avatar_link_key" ON "players"("avatar_link");

-- CreateIndex
CREATE UNIQUE INDEX "teams_public_id_key" ON "teams"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "tournaments_title_key" ON "tournaments"("title");

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_plays_in_fkey" FOREIGN KEY ("plays_in") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stages"("stage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_match_winner_fkey" FOREIGN KEY ("match_winner") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stages"("stage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stages" ADD CONSTRAINT "stages_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pre_registrations" ADD CONSTRAINT "pre_registrations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pre_registrations" ADD CONSTRAINT "pre_registrations_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tournament_registrations" ADD CONSTRAINT "tournament_registrations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tournament_registrations" ADD CONSTRAINT "tournament_registrations_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_registrations" ADD CONSTRAINT "group_registrations_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group_registrations" ADD CONSTRAINT "group_registrations_team_public_id_fkey" FOREIGN KEY ("team_public_id") REFERENCES "teams"("public_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group_registrations" ADD CONSTRAINT "group_registrations_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

