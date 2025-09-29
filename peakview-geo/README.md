## PeakView GEO Analyzer

SaaS Next.js + Prisma + PostgreSQL + Stripe. Design inspiré d’Ovirank.

### Prérequis
- Docker ≥ 20, Docker Compose
- Node ≥ 18, npm

### Installation locale
1. npm install
2. Copier `.env.production.example` en `.env.local` et renseigner les variables
3. Lancer la base: `docker compose up -d db`
4. Générer Prisma: `npm run prisma:generate`
5. Migrations dev: `npm run prisma:migrate`
6. Démarrer: `npm run dev`

### Schéma Prisma
Voir `prisma/schema.prisma`. Migrations: `prisma migrate dev` (dev) puis `prisma migrate deploy` (prod).

### Variables d’environnement
- DATABASE_URL=postgresql://peakview:supersecret@db:5432/peakview_prod?schema=public
- JWT_SECRET=... (forte entropie)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_PRICE_*
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID (placeholder)
- CORS_ORIGINS (optionnel, CSV)

### Docker (Production)
1. Copier `.env.production.example` en `.env.production` et compléter
2. `docker compose up -d --build`
3. `docker compose exec web npx prisma migrate deploy`

### Endpoints clés
- /api/auth/signup, /api/auth/login, /api/auth/logout, /api/auth/reset-password
- /api/requests (GET/POST), /api/requests/[id]
- /api/create-checkout-session
- /api/webhooks/stripe

### Paiements (test)
- Définir les prix Stripe dans les variables STRIPE_PRICE_*
- Webhook local: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Analytics (GA OAuth v4)
Placeholder UI; branchez votre flux OAuth côté Google Cloud et stockez les tokens dans `Request.trafficData`.

### Qualité
- TypeScript strict, ESLint, Prettier
- Tests Jest: `npm test`

### Design & UX
- Palette: midnight #0F172A, blanc #FFFFFF, violet #7C3AED, gris #F3F4F6
- Cards radius 8px, shadow douce, nav sticky, micro-animations

