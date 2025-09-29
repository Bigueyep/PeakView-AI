#!/bin/bash

# Script de configuration automatique pour l'environnement de développement
# PeakView AI

set -e

echo "🚀 Configuration de l'environnement de développement PeakView AI..."

# Vérifier les prérequis
echo "📋 Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose"
    exit 1
fi

echo "✅ Prérequis vérifiés"

# Installer les dépendances
echo "📦 Installation des dépendances npm..."
npm install

# Créer le fichier .env.local s'il n'existe pas
if [ ! -f .env.local ]; then
    echo "⚙️ Création du fichier .env.local..."
    cp .env.example .env.local
    echo "✅ Fichier .env.local créé. Veuillez le configurer avec vos clés API."
else
    echo "✅ Fichier .env.local existe déjà"
fi

# Démarrer la base de données
echo "🗄️ Démarrage de la base de données..."
npm run dev:db

# Attendre que la base de données soit prête
echo "⏳ Attente que la base de données soit prête..."
sleep 10

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npm run prisma:generate

# Appliquer les migrations
echo "📊 Application des migrations de base de données..."
npm run prisma:migrate

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Configurez vos clés API dans .env.local"
echo "2. Lancez 'npm run dev' pour démarrer l'application"
echo "3. Visitez http://localhost:3000"
echo ""
echo "🛠️ Commandes utiles :"
echo "- npm run dev:full    # Démarrer DB + app"
echo "- npm run prisma:studio # Interface graphique de la DB"
echo "- npm run dev:stop    # Arrêter les services"
echo ""
