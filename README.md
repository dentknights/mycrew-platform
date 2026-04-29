# MyCrew - Creator Monetization Platform

**Your Crew, Your Content, Your Empire**

MyCrew is a next-generation creator monetization platform that combines the best features from OnlyFans, Fanvue, Passes, and Fansly while offering the lowest fees in the industry.

## 🚀 Key Features

### For Creators
- **10% Platform Fee** - The lowest in the industry (vs 20% OnlyFans/Fansly)
- **90-Day Free Trial** - No fees for the first 3 months
- **Anti-Screenshot Protection** - DRM to protect your content
- **Invisible Watermarking** - Track leaked content back to the source
- **7 Revenue Streams**:
  - Monthly subscriptions
  - Pay-per-view content
  - Tips
  - Live streaming
  - 1-on-1 video calls
  - Group chats
  - Merchandise
- **Creator CRM** - Manage fans, segment audiences, automate messaging
- **Multi-Tier Subscriptions** - $4.99 to $499.99+ tiers
- **Instant Payouts** - No more waiting weeks for your money

### For Fans
- **Discover Creators** - Browse by category, trending, or search
- **Secure Content** - Protected from screenshots and leaks
- **Direct Messaging** - Chat with your favorite creators
- **PPV Content** - Unlock exclusive posts
- **Live Streams** - Real-time interaction
- **Video Calls** - 1-on-1 sessions with creators

## 🌐 Live Demo

Coming soon to mycrew.com

## 📁 Tech Stack

- **Frontend**: Next.js 14+, React 18+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, tRPC
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Auth**: NextAuth.js
- **Payments**: Stripe Connect (marketplace)
- **Storage**: AWS S3 / Cloudflare R2
- **Real-time**: Socket.io
- **Video**: Mux / Cloudflare Stream

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/dentknights/mycrew-platform.git
cd mycrew-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up the database
npx prisma generate
npx prisma db push

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random string for JWT signing
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `AWS_ACCESS_KEY_ID` - AWS credentials for S3

## 🎨 Design System

MyCrew uses a dark-first design inspired by OnlyFans and Fanvue:

- **Primary Background**: #000000 (Pure black)
- **Secondary Background**: #121212
- **Accent Color**: #ff6b9d (Pink/Coral)
- **Text Primary**: #ffffff
- **Text Secondary**: #a0a0a0

## 📆 Roadmap

- [x] Core platform architecture
- [x] User authentication
- [x] Creator profiles
- [x] Subscription tiers
- [x] Content feed
- [ ] Payment integration (Stripe)
- [ ] Content upload
- [ ] Messaging system
- [ ] Live streaming
- [ ] Video calls
- [ ] Mobile app (React Native)
- [ ] AI content suggestions
- [ ] Analytics dashboard

## 👨‍💼 Creator Benefits

We offer 35+ benefits including:

**Financial**:
- Lowest 10% fee
- 90-day free trial
- Instant payouts
- 7 revenue streams

**Content Protection**:
- Anti-screenshot DRM
- Invisible watermarking
- DMCA support
- Geo-blocking

**Growth Tools**:
- Mass DM marketing
- Content scheduling
- Analytics dashboard
- Referral program

## 📞 Support

For support, email support@mycrew.com or join our Discord community.

## 📝 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by OnlyFans, Fanvue, Passes, and Fansly
- Built with Next.js and the Vercel ecosystem
- Icons by Lucide

---

**MyCrew** - Empowering creators to build their empire.
