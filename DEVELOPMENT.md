# Guide de Développement - PeakView AI

Ce guide vous explique comment configurer et utiliser l'environnement de développement pour PeakView AI.

## 🚀 Configuration Rapide

### 1. Prérequis
- Node.js 18+ 
- Docker et Docker Compose
- Git

### 2. Installation
```bash
# Cloner le repository
git clone <votre-repo>
cd PeakView-AI

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer la base de données
npm run dev:db

# Générer le client Prisma
npm run prisma:generate

# Appliquer les migrations
npm run prisma:migrate
```

### 3. Démarrer le développement
```bash
# Démarrer tout l'environnement (DB + app)
npm run dev:full

# Ou seulement l'application (si la DB est déjà démarrée)
npm run dev
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants React réutilisables
├── lib/                # Utilitaires et configuration
├── pages/              # Pages Next.js
│   ├── api/           # API Routes
│   └── auth/          # Pages d'authentification
├── styles/            # Styles CSS/Tailwind
└── __tests__/         # Tests unitaires
```

## 🛠️ Scripts Disponibles

### Développement
- `npm run dev` - Démarrer le serveur de développement
- `npm run dev:db` - Démarrer seulement la base de données
- `npm run dev:full` - Démarrer DB + application
- `npm run dev:stop` - Arrêter les services Docker
- `npm run dev:reset` - Réinitialiser la base de données

### Base de données
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:migrate` - Appliquer les migrations
- `npm run prisma:reset` - Réinitialiser la base de données
- `npm run prisma:studio` - Ouvrir Prisma Studio (interface graphique)

### Qualité du code
- `npm run lint` - Vérifier le code avec ESLint
- `npm run lint:fix` - Corriger automatiquement les erreurs ESLint
- `npm run format` - Formater le code avec Prettier
- `npm run format:check` - Vérifier le formatage
- `npm run type-check` - Vérifier les types TypeScript

### Tests
- `npm run test` - Lancer les tests
- `npm run test:watch` - Lancer les tests en mode watch
- `npm run test:coverage` - Lancer les tests avec couverture

## 🗄️ Base de Données

### Configuration
La base de données PostgreSQL est configurée via Docker Compose :
- **Port**: 5432
- **Utilisateur**: peakview
- **Mot de passe**: supersecret
- **Base de données**: peakview_dev

### Accès
- **pgAdmin**: http://localhost:8080 (admin@peakview.dev / admin)
- **Prisma Studio**: `npm run prisma:studio`

### Migrations
```bash
# Créer une nouvelle migration
npm run prisma:migrate

# Réinitialiser la base de données
npm run prisma:reset
```

## 🔧 Variables d'Environnement

Copiez `.env.example` vers `.env.local` et configurez :

```env
# Base de données
DATABASE_URL="postgresql://peakview:supersecret@localhost:5432/peakview_dev"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Stripe (clés de test)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

## 🚀 Déploiement

### Production avec Docker
```bash
# Construire et démarrer en production
docker-compose up --build

# Ou utiliser le script de build
npm run build
npm start
```

## 📝 Conventions de Code

### TypeScript
- Utilisez des types stricts
- Évitez `any`, préférez des types spécifiques
- Utilisez les interfaces pour les objets complexes

### React
- Utilisez des composants fonctionnels avec hooks
- Préférez `const` pour les composants
- Utilisez TypeScript pour les props

### API Routes
- Validez les entrées avec Zod
- Utilisez les middlewares de sécurité
- Gérez les erreurs proprement

## 🐛 Débogage

### Logs
- Les logs de développement sont visibles dans la console
- Utilisez `console.log` pour le débogage temporaire

### Base de données
- Utilisez Prisma Studio pour inspecter les données
- Vérifiez les migrations avec `npm run prisma:migrate`

### Erreurs communes
1. **Erreur de connexion DB**: Vérifiez que Docker est démarré
2. **Erreur Prisma**: Lancez `npm run prisma:generate`
3. **Erreur de build**: Vérifiez les types avec `npm run type-check`

## 🤝 Contribution

1. Créez une branche feature
2. Faites vos modifications
3. Lancez les tests et le linting
4. Créez une pull request

## 📞 Support

Pour toute question ou problème :
- Vérifiez ce guide en premier
- Consultez les logs d'erreur
- Créez une issue sur GitHub
