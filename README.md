# ML Feedback App

Application web permettant aux utilisateurs d'évaluer les prédictions d'un modèle de langage et de fournir des corrections lorsque nécessaire.

## Fonctionnalités

- Affichage des prédictions du modèle de langage
- Interface pour évaluer si une prédiction est correcte ou non
- Possibilité de fournir une correction pour les prédictions inexactes
- Stockage des feedbacks pour améliorer le modèle
- Système d'authentification complet (inscription, connexion, profil utilisateur)
- Tableau de bord avec statistiques sur les performances du modèle
- Historique des contributions par utilisateur

## Technologies utilisées

- React.js
- React Router pour la navigation
- Context API pour la gestion d'état global
- Tailwind CSS pour le style
- Axios pour les requêtes API
- JWT pour l'authentification

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

Pour connecter l'application à votre propre API de modèle de langage, modifiez les fichiers suivants :

### Authentification (src/context/AuthContext.js)
Remplacez les fonctions simulées par des appels à votre API d'authentification :
```javascript
// Exemple pour la connexion
const response = await axios.post('https://votre-api.com/auth/login', { email, password });
```

### Feedbacks (src/App.js)
Remplacez la simulation de données par des appels à votre API pour récupérer et stocker les feedbacks :
```javascript
// Récupération des prédictions
const response = await axios.get('https://votre-api.com/predictions');
setPredictions(response.data);

// Envoi de feedback
axios.post('https://votre-api.com/feedback', {
  predictionId: id,
  isCorrect,
  correction
});
```

### Tableau de bord (src/components/dashboard/Dashboard.js)
Connectez le tableau de bord à votre API pour récupérer les statistiques réelles :
```javascript
const response = await axios.get('https://votre-api.com/dashboard/stats');
setStats(response.data);
```

## Structure du projet

- `src/components/` - Composants React réutilisables
  - `auth/` - Composants liés à l'authentification
  - `profile/` - Composants du profil utilisateur
  - `dashboard/` - Composants du tableau de bord
- `src/context/` - Contextes React pour la gestion d'état global
- `src/App.js` - Composant principal et routage de l'application
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