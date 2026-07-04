# Hastmelap — A Designer Destination (React website)

A React + Vite + Tailwind e-commerce showcase site for **Hastmelap**, Bhavnagar,
built with a warm maroon/gold ethnic-boutique palette.

## What's included
- Home, Shop (with category filter + search), Product Detail, Inquiry, and Admin pages
- Mobile-number login (OTP-style UI) — every login is recorded
- Inquiry form — every submission is recorded
- `/admin` panel showing all logins + inquiries (demo password: `hastmelap1985`)
- Google Reviews section (sample content — swap in the Places API for live reviews)
- Instagram section linking to `@hastmelap_` (swap in the Graph API for a live feed)
- WhatsApp "Share on WhatsApp" button on every product, pre-filled with the product name
- Footer with your real phone numbers, WhatsApp, and shop address

## ⚠️ Important — please read
1. **Photos**: every product image here is a colored placeholder. Replace them with
   your own product photography — drop files into `public/products/` and update the
   `image` field in `src/data/products.js`. Do not use photos from other shops'
   websites; use your own stock photos so customers see what you actually sell.
2. **Data storage is local-only (demo)**: logins and inquiries are currently saved in
   the visitor's own browser (localStorage), not a shared database. That's fine for
   testing, but for a real store you'll want every visitor's inquiry to land in one
   place. The cleanest options:
   - Connect a backend like **Firebase** or **Supabase** (a few hours of work, no server to manage)
   - Or a small **Node/Express + database** API if you want full control
   I'm happy to wire either of these up if you'd like — just say the word.
3. **Real OTP SMS**: the login modal currently accepts any 4–6 digit code (it's a UI
   demo). To send real OTPs you'll need an SMS gateway (e.g. MSG91, Twilio) — happy
   to help integrate one.
4. **Admin password**: change `ADMIN_PASSWORD` in `src/pages/Admin.jsx` before using
   this for real.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build (outputs to /dist)
```

Then open the printed local URL (usually `http://localhost:5173`).

## Deploying
Any static host works great since this builds to plain HTML/CSS/JS:
- **Vercel** or **Netlify**: drag-and-drop the `dist/` folder after `npm run build`, or connect your Git repo
- Your existing hosting: upload the contents of `dist/` after building

## Project structure
```
src/
  components/   Header, Footer, ProductCard, WhatsAppShare, GoogleReviews, InstagramFeed, MobileLoginModal
  context/      AppContext.jsx — stores logins & inquiries
  data/         products.js — your catalog (edit this!)
  pages/        Home, Products, ProductDetail, Inquiry, Admin
```
