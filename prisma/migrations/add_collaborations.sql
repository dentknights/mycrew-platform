-- Migration: Add Collaboration Classifieds tables

-- Collaboration Listings table
CREATE TABLE "CollaborationListing" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "collaborationType" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "priceType" TEXT NOT NULL DEFAULT 'fixed',
    "duration" INTEGER,
    "deliverables" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requirements" TEXT,
    "minFollowerCount" INTEGER DEFAULT 0,
    "isNSFW" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "status" TEXT DEFAULT 'active',
    "location" TEXT,
    "isRemote" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "viewCount" INTEGER DEFAULT 0,
    "applicationCount" INTEGER DEFAULT 0,

    CONSTRAINT "CollaborationListing_pkey" PRIMARY KEY ("id")
);

-- Collaboration Applications table
CREATE TABLE "CollaborationApplication" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "message" TEXT,
    "proposedPrice" DECIMAL(10,2),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "CollaborationApplication_pkey" PRIMARY KEY ("id")
);

-- Collaboration Reviews table
CREATE TABLE "CollaborationReview" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "isVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollaborationReview_pkey" PRIMARY KEY ("id")
);

-- Collaboration Categories enum table
CREATE TABLE "CollaborationCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "listingCount" INTEGER DEFAULT 0,

    CONSTRAINT "CollaborationCategory_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "CollaborationCategory_slug_key" UNIQUE ("slug")
);

-- Add foreign keys
ALTER TABLE "CollaborationListing" ADD CONSTRAINT "CollaborationListing_creatorId_fkey" 
    FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CollaborationApplication" ADD CONSTRAINT "CollaborationApplication_listingId_fkey" 
    FOREIGN KEY ("listingId") REFERENCES "CollaborationListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CollaborationApplication" ADD CONSTRAINT "CollaborationApplication_applicantId_fkey" 
    FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CollaborationReview" ADD CONSTRAINT "CollaborationReview_listingId_fkey" 
    FOREIGN KEY ("listingId") REFERENCES "CollaborationListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CollaborationReview" ADD CONSTRAINT "CollaborationReview_reviewerId_fkey" 
    FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CollaborationReview" ADD CONSTRAINT "CollaborationReview_revieweeId_fkey" 
    FOREIGN KEY ("revieweeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create indexes for performance
CREATE INDEX "CollaborationListing_creatorId_idx" ON "CollaborationListing"("creatorId");
CREATE INDEX "CollaborationListing_isActive_idx" ON "CollaborationListing"("isActive");
CREATE INDEX "CollaborationListing_status_idx" ON "CollaborationListing"("status");
CREATE INDEX "CollaborationListing_price_idx" ON "CollaborationListing"("price");
CREATE INDEX "CollaborationListing_collaborationType_idx" ON "CollaborationListing" USING GIN("collaborationType");
CREATE INDEX "CollaborationListing_createdAt_idx" ON "CollaborationListing"("createdAt" DESC);

CREATE INDEX "CollaborationApplication_listingId_idx" ON "CollaborationApplication"("listingId");
CREATE INDEX "CollaborationApplication_applicantId_idx" ON "CollaborationApplication"("applicantId");
CREATE INDEX "CollaborationApplication_status_idx" ON "CollaborationApplication"("status");

CREATE INDEX "CollaborationReview_listingId_idx" ON "CollaborationReview"("listingId");
CREATE INDEX "CollaborationReview_revieweeId_idx" ON "CollaborationReview"("revieweeId");

-- Insert default categories
INSERT INTO "CollaborationCategory" ("id", "name", "slug", "description", "icon") VALUES
('cat1', 'Photo Shoot', 'photo-shoot', 'Collaborative photography sessions', 'Camera'),
('cat2', 'Video Content', 'video-content', 'Video creation and production', 'Video'),
('cat3', 'Live Stream', 'live-stream', 'Joint live streaming sessions', 'Radio'),
('cat4', 'Shoutout', 'shoutout', 'Cross-promotion on social media', 'Megaphone'),
('cat5', 'Takeover', 'takeover', 'Account takeover collaborations', 'UserCircle'),
('cat6', 'Podcast', 'podcast', 'Guest appearances on podcasts', 'Mic'),
('cat7', 'Event', 'event', 'In-person or virtual events', 'Calendar'),
('cat8', 'Merch', 'merch', 'Collaborative merchandise', 'ShoppingBag'),
('cat9', 'Tutorial', 'tutorial', 'Educational content together', 'BookOpen'),
('cat10', 'Challenge', 'challenge', 'Viral challenges together', 'Zap');
