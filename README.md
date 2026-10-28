# POS SaaS — Multi-Tenant Point of Sale Platform

Production-ready multi-tenant Point of Sale (POS) SaaS platform.

One application serves many independent businesses. Each business can only access its own data.

## Current Status: Phase 1 Complete

✅ Project setup (Next.js 15 + TypeScript + Tailwind CSS)  
✅ PostgreSQL + Prisma multi-tenant schema  
✅ Secure authentication (email/password + sessions)  
✅ Role-based access control foundation  
✅ Tenant isolation helpers  
✅ Marketing landing page  
✅ Login / Register flows  
✅ Business dashboard shell  
✅ Super Admin preparation  

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions + API routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: Custom secure session-based auth with bcrypt
- **Payments** (later): Stripe

## Getting Started

### 1. Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or pnpm

### 2. Clone & Install

```bash
git clone https://github.com/joshwilsonnlr/POS.git
cd POS
npm install
```

### 3. Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Required:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/pos_saas?schema=public"
NEXTAUTH_SECRET="generate-a-long-random-string"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Generate a secret:

```bash
openssl rand -base64 32
```

### 4. Database Setup

```bash
# Create the database (example)
createdb pos_saas

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 5. Create the First Super Admin

After starting the app, visit `/setup` to create the initial Super Admin account (only works when no Super Admin exists).

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── actions/          # Server Actions (auth, business logic)
├── app/
│   ├── (auth)/       # Login, Register
│   ├── (dashboard)/  # Authenticated business area
│   ├── admin/        # Super Admin area (Phase 8)
│   └── page.tsx      # Marketing landing page
├── components/
│   ├── ui/           # Reusable UI primitives
│   └── layout/       # Shells, sidebars
├── lib/
│   ├── auth.ts       # Authentication & tenant context
│   ├── prisma.ts     # Prisma client
│   └── utils.ts      # Helpers
├── types/            # Shared TypeScript types
prisma/
└── schema.prisma     # Full multi-tenant database schema
```

## Multi-Tenant Architecture

Every business-owned record includes a `businessId`.

- All queries are scoped by `businessId`
- Authorization is enforced server-side
- Helpers: `getBusinessContext()`, `assertTenantAccess()`
- Super Admins can impersonate (with audit log) in later phases

## Roles

| Role         | Access                                      |
|--------------|---------------------------------------------|
| SUPER_ADMIN  | Platform-wide management                    |
| OWNER        | Full control of their business              |
| MANAGER      | Inventory, employees, reports, limited settings |
| CASHIER      | POS, own transactions, limited refunds      |

## Roadmap

- **Phase 2**: Business onboarding wizard, full roles & permissions
- **Phase 3**: Products, Categories, Inventory
- **Phase 4**: POS screen, Cart, Checkout, Receipts
- **Phase 5**: Customers, Employees, Suppliers, Purchasing
- **Phase 6**: Reports, Refunds, Taxes, Discounts
- **Phase 7**: Stripe subscriptions + feature limits
- **Phase 8**: Super Admin dashboard
- **Phase 9**: Security hardening, testing, performance
- **Phase 10**: Production deployment

## License

Private — All rights reserved.
