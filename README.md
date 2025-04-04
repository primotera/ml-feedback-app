# ML Feedback App

Application web permettant aux utilisateurs d'évaluer les prédictions d'un modèle de langage et de fournir des corrections lorsque nécessaire.

## Fonctionnalités

- Affichage des prédictions du modèle de langage
- Interface pour évaluer si une prédiction est correcte ou non
- Possibilité de fournir une correction pour les prédictions inexactes
- Stockage des feedbacks pour améliorer le modèle

## Technologies utilisées

- React.js
- Tailwind CSS
- Axios pour les requêtes API

## Installation

1. Clonez ce dépôt :
```
git clone https://github.com/primotera/ml-feedback-app.git
cd ml-feedback-app
```

2. Installez les dépendances :
```
npm install
```

3. Lancez l'application en mode développement :
```
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Configuration de l'API

Pour connecter l'application à votre propre API de modèle de langage, modifiez le fichier `src/App.js` en remplaçant les données de simulation par les appels à votre API.

Vous devrez implémenter les endpoints suivants côté serveur :
- GET /predictions - Pour récupérer les prédictions à évaluer
- POST /feedback - Pour envoyer les feedbacks des utilisateurs

## Structure du projet

- `src/components/` - Composants React réutilisables
- `src/App.js` - Composant principal et logique de l'application
- `public/` - Fichiers statiques

## Personnalisation

Vous pouvez personnaliser l'apparence de l'application en modifiant les classes Tailwind CSS dans les fichiers de composants ou en adaptant le fichier `tailwind.config.js`.

## Déploiement

Pour construire l'application pour la production :

```
npm run build
```

Les fichiers optimisés seront générés dans le dossier `build/`.

## Licence

MIT