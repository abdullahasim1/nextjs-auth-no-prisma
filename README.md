# Next.js Auth — No Prisma (NextAuth v5 + Neon PostgreSQL)

A complete authentication + student dashboard starter built with **NextAuth v5** and **raw PostgreSQL** — no ORM, no Prisma. Direct SQL via `@neondatabase/serverless` / `pg`, validated with Zod, passwords hashed with bcryptjs.

Built by [Abdullah Bin Asim](https://github.com/abdullahasim1) — AI Cloud Engineer & Founder @ [DevRox](https://thedevrox.com).

## ✨ Features

- **Credentials authentication** with NextAuth v5 (beta) — login, protected routes, session handling
- **No ORM** — direct PostgreSQL queries against **Neon** (serverless Postgres)
- **Student dashboard** — users + students tables with sample data (`setup-database.sql`)
- **Type-safe validation** — Zod schemas on forms/actions
- **Modern UI** — Tailwind CSS 4, Framer Motion, Lucide icons, particle background (tsparticles)
- **Turbopack** dev & build for fast iteration

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack) · React 19 · TypeScript
- **Auth:** NextAuth v5 · bcryptjs
- **Database:** Neon PostgreSQL · `@neondatabase/serverless` · `pg`
- **Validation / UI:** Zod · Tailwind CSS 4 · Framer Motion

## 🚀 Getting Started

1. Create a free Postgres database at [Neon](https://console.neon.tech/)
2. Run the SQL in [`setup-database.sql`](./setup-database.sql) in the Neon SQL editor (creates `users` + `students` tables with sample data)
3. Create `.env.local`:

```env
DATABASE_URL=your_neon_connection_string
AUTH_SECRET=your_random_secret
```

4. Install & run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the login page. Sample accounts are documented in [`SETUP.md`](./SETUP.md).

## 📚 More

- Full setup walkthrough: [`SETUP.md`](./SETUP.md)
- Database schema & seed: [`setup-database.sql`](./setup-database.sql)

## 👤 Author

**Abdullah Bin Asim** — AI Cloud Engineer @ Experts Cloud · Founder @ DevRox
[LinkedIn](https://www.linkedin.com/in/abdullahasim1) · [Portfolio](https://abdullah-asim-dev.vercel.app) · [DevRox](https://thedevrox.com)
