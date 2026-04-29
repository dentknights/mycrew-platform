# MyCrew Design Reference

## OnlyFans/Fanvue Design Patterns

### Color Scheme (OnlyFans-style)
- Primary Background: #000000 (Pure black)
- Secondary Background: #1a1a1a (Card backgrounds)
- Tertiary Background: #2d2d2d (Elevated surfaces)
- Primary Text: #ffffff
- Secondary Text: #8a8a8a
- Muted Text: #5a5a5a
- Accent: #00aff0 (OnlyFans blue) or #ff6b9d (Fanvue pink)
- Success: #00c853
- Error: #ff1744

### Layout Patterns

#### OnlyFans Style:
- Left sidebar navigation (fixed, 240px width)
- Main content area (centered, max-width 1200px)
- Right sidebar (optional, suggestions/promotions)
- Mobile: Bottom tab navigation

#### Fanvue Style:
- Clean, minimal header
- Grid-based content discovery
- Creator cards with preview images
- Subscription tiers displayed prominently

### Key Components

1. **Creator Profile Header**
   - Banner image (full width, 400px height)
   - Avatar (120px, overlapping banner bottom)
   - Username + verified badge
   - Stats: Posts | Media | Likes
   - Subscribe button (prominent, accent color)
   - Bio section

2. **Content Feed**
   - Masonry/grid layout
   - Locked content with blur overlay
   - PPV price badge on locked content
   - Like/comment/tip actions

3. **Navigation (Left Sidebar)**
   - Home
   - Explore
   - Messages
   - Notifications
   - My Profile
   - Settings
   - (Creator) Dashboard
   - (Creator) Content
   - (Creator) Subscribers
   - (Creator) Earnings

4. **Subscription Tiers**
   - Card-based layout
   - Price prominently displayed
   - Benefits list with checkmarks
   - "Subscribe" CTA button
   - "Most Popular" badge on middle tier

5. **Messaging Interface**
   - Conversation list (left)
   - Message thread (right)
   - PPV message preview with price
   - Media attachments

### Typography
- Font: system-ui, -apple-system, sans-serif
- Headings: 600-700 weight
- Body: 400 weight
- Small text: 12-13px
- Regular: 14-15px
- Large: 16-18px
- Headings: 20-32px

### Spacing
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px

### Border Radius
- Small: 4px (buttons, inputs)
- Medium: 8px (cards)
- Large: 12px (modals)
- Full: 9999px (avatars, pills)

### Shadows
- Card: 0 2px 8px rgba(0,0,0,0.3)
- Modal: 0 8px 32px rgba(0,0,0,0.5)
- Elevated: 0 4px 16px rgba(0,0,0,0.4)
