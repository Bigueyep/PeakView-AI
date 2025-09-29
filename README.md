# PeakView GEO Analyzer

> **SaaS d'analyse de visibilité géographique avec IA**

PeakView GEO Analyzer est une application SaaS complète qui permet aux entreprises d'analyser leur visibilité géographique et d'optimiser leur présence locale grâce à l'intelligence artificielle.

## 🚀 Fonctionnalités

- **Analyse géographique** : Comprenez votre visibilité dans chaque région
- **Détection IA** : Identifiez automatiquement les mentions de votre marque
- **Analyse de sentiment** : Découvrez comment votre entreprise est perçue
- **Intégration Google Analytics** : Données de trafic complètes
- **Dashboard interactif** : Visualisez vos métriques en temps réel
- **Paiements Stripe** : Gestion des abonnements sécurisée
- **Design Ovirank** : Interface moderne et épurée

## 🛠️ Stack technologique

- **Frontend** : Next.js 14 + TypeScript + TailwindCSS
- **Backend** : API Routes Next.js + Node.js
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : JWT + bcrypt
- **Paiements** : Stripe Checkout
- **Déploiement** : Docker Compose
- **Analytics** : Google Analytics OAuth

## 📋 Prérequis

- Node.js ≥ 18.0.0
- Docker ≥ 20.0.0
- Docker Compose ≥ 2.0.0
- PostgreSQL (si utilisation locale)
- Compte Stripe (pour les paiements)
- Compte Google Cloud (pour Analytics)

## 🚀 Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/peakview-geo-analyzer.git
cd peakview-geo-analyzer
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Copiez le fichier d'exemple et configurez vos variables :

```bash
cp env.example .env.local
```

Éditez `.env.local` avec vos valeurs :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/peakview_dev"

# JWT
JWT_SECRET="your_jwt_secret_long_random_string"

# Stripe (clés de test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID="your_client_id"
GOOGLE_ANALYTICS_CLIENT_SECRET="your_client_secret"
```

### 4. Configuration de la base de données

```bash
# Générer le client Prisma
npm run prisma:generate

# Appliquer les migrations
npm run prisma:migrate

# (Optionnel) Ouvrir Prisma Studio
npm run prisma:studio
```

### 5. Lancement en développement

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🐳 Déploiement avec Docker

### 1. Configuration de production

Copiez et configurez le fichier de production :

```bash
cp env.production .env.production
```

Éditez `.env.production` avec vos valeurs de production.

### 2. Lancement du stack Docker

```bash
# Construire et démarrer les services
docker-compose up -d --build

# Appliquer les migrations en production
docker-compose exec web npx prisma migrate deploy

# Vérifier les logs
docker-compose logs -f web
```

### 3. Accès à l'application

- **Application** : http://localhost:3000
- **Base de données** : localhost:5432
- **Nginx** : http://localhost:80

## 📊 Structure du projet

```
peakview-geo-analyzer/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/             # Composants UI de base
│   │   └── Layout/         # Composants de layout
│   ├── lib/                # Utilitaires et configuration
│   ├── pages/              # Pages Next.js et API routes
│   │   ├── api/            # API endpoints
│   │   └── auth/           # Pages d'authentification
│   ├── styles/             # Styles CSS globaux
│   └── types/              # Types TypeScript
├── prisma/                 # Schéma et migrations Prisma
├── public/                 # Fichiers statiques
├── docker-compose.yml      # Configuration Docker
├── Dockerfile             # Image Docker
└── nginx.conf             # Configuration Nginx
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production

# Base de données
npm run prisma:generate  # Générer le client Prisma
npm run prisma:migrate   # Migrations de développement
npm run prisma:deploy    # Migrations de production
npm run prisma:studio    # Interface Prisma Studio

# Qualité du code
npm run lint             # Linter ESLint
npm run format           # Formatter Prettier
npm run test             # Tests Jest
```

## 🗄️ Base de données

### Modèles Prisma

- **User** : Utilisateurs et informations d'authentification
- **Request** : Demandes d'analyse et résultats
- **Plan** : Plans d'abonnement (STARTER, PRO, ENTERPRISE)

### Migrations

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name description

# Appliquer en production
npx prisma migrate deploy
```

## 💳 Configuration Stripe

### 1. Créer les produits et prix

Dans votre dashboard Stripe, créez :

- **Plan Starter** : 49€/mois
- **Plan Pro** : 149€/mois
- **Plan Enterprise** : Sur devis

### 2. Configuration des webhooks

Endpoint webhook : `https://votre-domaine.com/api/webhooks/stripe`

Événements à écouter :
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`

### 3. Test des webhooks

```bash
# Installer Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📈 Google Analytics

### 1. Configuration OAuth

1. Créez un projet dans Google Cloud Console
2. Activez l'API Google Analytics
3. Configurez les credentials OAuth 2.0
4. Ajoutez l'URI de redirection

### 2. Variables d'environnement

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID="your_client_id"
GOOGLE_ANALYTICS_CLIENT_SECRET="your_client_secret"
GOOGLE_ANALYTICS_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

## 🔒 Sécurité

### Authentification

- **JWT** : Tokens sécurisés avec expiration
- **bcrypt** : Hachage des mots de passe
- **Cookies HttpOnly** : Protection XSS

### API

- **Rate limiting** : Protection contre les abus
- **Helmet** : Headers de sécurité
- **CORS** : Configuration restrictive

### Base de données

- **Prisma** : Protection contre les injections SQL
- **Validation** : Validation des données côté serveur

## 🚀 Déploiement en production

### Vercel (recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Serveur Docker

1. Configurez votre serveur avec Docker
2. Cloner le repository
3. Configurer les variables d'environnement
4. Lancer `docker-compose up -d`

### Variables d'environnement de production

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your_strong_secret
```

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec watch
npm run test:watch

# Coverage
npm run test -- --coverage
```

## 📝 API Documentation

### Authentification

- `POST /api/auth/signup` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Profil utilisateur

### Analyses

- `GET /api/requests` - Liste des analyses
- `POST /api/requests` - Créer une analyse
- `GET /api/requests/[id]` - Détails d'une analyse
- `DELETE /api/requests/[id]` - Supprimer une analyse

### Paiements

- `POST /api/create-checkout-session` - Session Stripe
- `POST /api/webhooks/stripe` - Webhooks Stripe

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

- **Documentation** : [Wiki du projet](https://github.com/votre-username/peakview-geo-analyzer/wiki)
- **Issues** : [GitHub Issues](https://github.com/votre-username/peakview-geo-analyzer/issues)
- **Email** : support@peakview.ai

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [Prisma](https://prisma.io/) - ORM moderne
- [Stripe](https://stripe.com/) - Paiements en ligne
- [Lucide React](https://lucide.dev/) - Icônes

---

**PeakView GEO Analyzer** - Optimisez votre visibilité locale avec l'IA 🚀# PeakView-AI
