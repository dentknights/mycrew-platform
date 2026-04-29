-- Migration: Add Referral Bonus System for Monthly Rising Star

-- Referral tracking table
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "bonusAmount" DECIMAL(10,2) DEFAULT 0,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Referral_referredId_key" UNIQUE ("referredId")
);

-- Monthly Rising Star Leaderboard table
CREATE TABLE "RisingStarLeaderboard" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "newSignups" INTEGER DEFAULT 0,
    "paidSignups" INTEGER DEFAULT 0,
    "totalRevenue" DECIMAL(10,2) DEFAULT 0,
    "rank" INTEGER,
    "bonusEarned" DECIMAL(10,2) DEFAULT 0,
    "bonusPaid" BOOLEAN DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RisingStarLeaderboard_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "RisingStarLeaderboard_creatorId_month_year_key" UNIQUE ("creatorId", "month", "year")
);

-- Bonus Configuration table
CREATE TABLE "BonusConfiguration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "minPaidSignups" INTEGER DEFAULT 0,
    "bonusAmount" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusConfiguration_pkey" PRIMARY KEY ("id")
);

-- Add foreign keys
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" 
    FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredId_fkey" 
    FOREIGN KEY ("referredId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "RisingStarLeaderboard" ADD CONSTRAINT "RisingStarLeaderboard_creatorId_fkey" 
    FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create indexes
CREATE INDEX "Referral_referrerId_idx" ON "Referral"("referrerId");
CREATE INDEX "Referral_code_idx" ON "Referral"("code");
CREATE INDEX "Referral_status_idx" ON "Referral"("status");
CREATE INDEX "Referral_createdAt_idx" ON "Referral"("createdAt");

CREATE INDEX "RisingStarLeaderboard_month_year_idx" ON "RisingStarLeaderboard"("month", "year");
CREATE INDEX "RisingStarLeaderboard_rank_idx" ON "RisingStarLeaderboard"("rank");
CREATE INDEX "RisingStarLeaderboard_paidSignups_idx" ON "RisingStarLeaderboard"("paidSignups" DESC);

-- Insert default bonus configurations
INSERT INTO "BonusConfiguration" ("id", "name", "description", "minPaidSignups", "bonusAmount", "isActive") VALUES
('bonus1', 'Rising Star - 1st Place', 'Highest paid signups this month', 50, 1000.00, true),
('bonus2', 'Rising Star - 2nd Place', 'Second highest paid signups', 40, 500.00, true),
('bonus3', 'Rising Star - 3rd Place', 'Third highest paid signups', 30, 250.00, true),
('bonus4', 'Rising Star - Top 10', 'Ranked 4-10 in paid signups', 20, 100.00, true),
('bonus5', 'Rising Star - Top 50', 'Ranked 11-50 in paid signups', 10, 50.00, true);
