# Commandes de Développement - PeakView AI

## 🚀 Démarrage Rapide

```bash
# Configuration initiale (une seule fois)
./scripts/setup-dev.sh

# Ou manuellement :
npm install
cp .env.example .env.local
npm run dev:db
npm run prisma:generate
npm run prisma:migrate
```

## 📋 Commandes Principales

### Développement
```bash
npm run dev              # Démarrer l'app seulement
npm run dev:db           # Démarrer la DB seulement  
npm run dev:full         # Démarrer DB + app
npm run dev:stop         # Arrêter les services
npm run dev:reset        # Réinitialiser la DB
```

### Base de Données
```bash
npm run prisma:generate  # Générer le client
npm run prisma:migrate   # Appliquer les migrations
npm run prisma:reset     # Réinitialiser la DB
npm run prisma:studio    # Interface graphique
```

### Qualité du Code
```bash
npm run lint             # Vérifier le code
npm run lint:fix         # Corriger automatiquement
npm run format           # Formater le code
npm run type-check       # Vérifier les types
```

### Tests
```bash
npm run test             # Lancer les tests
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Tests avec couverture
```

## 🔧 URLs Utiles

- **Application**: http://localhost:3000
- **pgAdmin**: http://localhost:8080 (admin@peakview.dev / admin)
- **Prisma Studio**: `npm run prisma:studio`

## 🐛 Dépannage

### Erreur de connexion DB
```bash
npm run dev:stop
npm run dev:db
```

### Erreur Prisma
```bash
npm run prisma:generate
npm run prisma:migrate
```

### Erreur de build
```bash
npm run type-check
npm run lint
```
