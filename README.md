# Getonnetagency — Payload CMS + Next.js

This project is the new **getonnet.agency** website, migrated from WordPress to **Payload CMS** with a **Next.js** frontend.

---

## Tech Stack

- **CMS:** Payload CMS v3
- **Frontend:** Next.js (App Router)
- **Database:** MongoDB Atlas
- **Package manager:** pnpm
- **Language:** TypeScript

---

## Branch Strategy

```
main                  → stable, production-ready only
└── dev               → shared development branch (merge your work here)
    └── feature/xxx   → your individual feature branches
```

**Rules:**
- Never commit directly to `main` or `dev`
- Always branch off `dev` for new features
- Open a Pull Request into `dev` when your feature is ready
- `main` is only updated when we're ready to deploy to production

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Getonnet/Getonnetagency.git
cd Getonnetagency
```

### 2. Switch to dev branch

```bash
git checkout dev
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Set up environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Then open `.env` and fill in the values:

```env
DATABASE_URL=mongodb+srv://...   # Ask Aldrin for the MongoDB connection string
PAYLOAD_SECRET=...               # Ask Aldrin for the secret key
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

### 5. Start the dev server

```bash
pnpm dev
```

The site runs at: `http://localhost:3000`
Payload admin runs at: `http://localhost:3000/admin`

---

## Collections (Payload CMS)

| Collection | Description |
|---|---|
| `users` | Admin users |
| `media` | Images and files |
| `pages` | Static pages |
| `posts` | Blog posts |
| `categories` | Post categories |
| `tags` | Post tags |
| `cases` | Customer case studies (kundecaser) |
| `testimonials` | Client testimonials |
| `team` | Team members |

---

## WordPress Migration

All content from the original WordPress site (`getonnet.agency`) has already been migrated into Payload CMS. If you ever need to re-run the migration (e.g. after a fresh database):

### 1. Make sure your `.env` is set up correctly (see above)

### 2. Place the WordPress XML export in the scripts folder

```bash
# The file should already be at:
src/scripts/getonnet_WordPress_2026-03-27.xml
```

### 3. Run the migration script

```bash
pnpm migrate
```

This will import in order:
1. Categories
2. Tags
3. Media (downloads images from the original WordPress site)
4. Posts
5. Pages
6. Cases
7. Testimonials
8. Team members

> ⚠️ Media files are stored locally in `/media` and are excluded from Git (see `.gitignore`). For production, media should be hosted on a cloud storage service (e.g. Cloudinary or AWS S3).

---

## Working on a Feature

```bash
# Make sure you're up to date with dev
git checkout dev
git pull origin dev

# Create your feature branch
git checkout -b feature/your-feature-name

# Do your work, then commit
git add .
git commit -m "Description of what you did"

# Push your branch
git push origin feature/your-feature-name

# Open a Pull Request into dev on GitHub
```

---

## Available Commands

```bash
pnpm dev              # Start dev server
pnpm devsafe          # Clean .next then start dev
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type check
pnpm generate:types   # Regenerate Payload types after collection changes
pnpm migrate          # Run WordPress → Payload migration script
```
