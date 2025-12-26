-- CreateEnum
CREATE TYPE "match_status" AS ENUM ('scheduled', 'in_progress', 'finished', 'cancelled');

-- CreateEnum
CREATE TYPE "bet_status" AS ENUM ('pending', 'won', 'lost', 'cancelled');

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "match_status" "match_status" NOT NULL DEFAULT 'scheduled';

-- CreateTable
CREATE TABLE "bets" (
    "bet_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "match_id" UUID NOT NULL,
    "predicted_winner" UUID NOT NULL,
    "bet_amount" DECIMAL(10,2) NOT NULL,
    "odds_at_bet_time" DECIMAL(10,2) NOT NULL,
    "potential_payout" DECIMAL(10,2) NOT NULL,
    "status" "bet_status" NOT NULL DEFAULT 'pending',
    "settled_at" TIMESTAMPTZ(6),

    CONSTRAINT "bets_pkey" PRIMARY KEY ("bet_id")
);

-- CreateTable
CREATE TABLE "user_balance" (
    "balance_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 1000.00,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_balance_pkey" PRIMARY KEY ("balance_id")
);

-- CreateTable
CREATE TABLE "match_odds" (
    "odds_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "match_id" UUID NOT NULL,
    "home_team_odds" DECIMAL(10,2) NOT NULL,
    "away_team_odds" DECIMAL(10,2) NOT NULL,
    "total_bets_home" INTEGER NOT NULL DEFAULT 0,
    "total_bets_away" INTEGER NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_odds_pkey" PRIMARY KEY ("odds_id")
);

-- CreateIndex
CREATE INDEX "bets_user_id_idx" ON "bets"("user_id");

-- CreateIndex
CREATE INDEX "bets_match_id_idx" ON "bets"("match_id");

-- CreateIndex
CREATE INDEX "bets_status_idx" ON "bets"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_balance_user_id_key" ON "user_balance"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "match_odds_match_id_key" ON "match_odds"("match_id");

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("match_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_predicted_winner_fkey" FOREIGN KEY ("predicted_winner") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_balance" ADD CONSTRAINT "user_balance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "match_odds" ADD CONSTRAINT "match_odds_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("match_id") ON DELETE CASCADE ON UPDATE NO ACTION;
