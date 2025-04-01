# Configuration d'une galerie React auto-déployée sur GitHub Pages

Cette configuration vous permettra de créer une application React qui:
1. Affiche les composants développés par vos élèves
2. Se déploie automatiquement sur GitHub Pages à chaque push

## Étape 1: Créer l'application React

```bash
# Créer une nouvelle application React
npx create-react-app gallery-app
cd gallery-app

# Installer les dépendances nécessaires
npm install tailwindcss postcss autoprefixer gh-pages

# Configurer Tailwind CSS
npx tailwindcss init -p
```

## Étape 2: Configurer Tailwind CSS

Modifiez le fichier `tailwind.config.js` pour y ajouter:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Ajoutez les directives Tailwind dans `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Étape 3: Créer la structure du projet

Organisez votre projet pour faciliter l'intégration des composants des élèves:

```bash
mkdir -p src/components/gallery
mkdir -p src/components/shared
```

## Étape 4: Créer un composant de galerie qui chargera dynamiquement les composants

Créez un fichier `src/components/gallery/ComponentGallery.jsx`:

```jsx
import React from 'react';

// Import dynamique des composants
// Cette partie sera mise à jour automatiquement avec les composants des élèves
import { componentRegistry } from './componentRegistry';

const ComponentGallery = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Galerie de Composants React</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(componentRegistry).map(([name, { Component, author, description }]) => (
          <div key={name} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 bg-gray-50">
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-sm text-gray-500">Par: {author || 'Anonyme'}</p>
            </div>
            
            <div className="p-4 bg-white">
              <div className="mb-4 p-4 border rounded bg-gray-50 min-h-[200px] flex items-center justify-center">
                <Component />
              </div>
              
              <p className="text-sm text-gray-700">{description || 'Aucune description'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentGallery;
```

## Étape 5: Créer le registre des composants

Créez un fichier `src/components/gallery/componentRegistry.js`:

```javascript
// Ce fichier sera mis à jour automatiquement avec les composants des élèves
// Exemple de structure

import PlaceholderComponent from '../shared/PlaceholderComponent';

export const componentRegistry = {
  "PlaceholderComponent": {
    Component: PlaceholderComponent,
    author: "Formateur",
    description: "Un composant d'exemple en attendant les contributions des élèves."
  },
  // D'autres composants seront ajoutés ici automatiquement
};
```

## Étape 6: Créer un composant placeholder

Créez un fichier `src/components/shared/PlaceholderComponent.jsx`:

```jsx
import React from 'react';

const PlaceholderComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
        <span className="text-white text-2xl">?</span>
      </div>
      <p className="text-gray-600">Composant à venir...</p>
    </div>
  );
};

export default PlaceholderComponent;
```

## Étape 7: Mettre à jour l'App.js principal

Modifiez le fichier `src/App.js`:

```jsx
import React from 'react';
import ComponentGallery from './components/gallery/ComponentGallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">TP Collaboratif React/Git</h1>
          <p>Formation React, Tailwind, Git</p>
        </div>
      </header>
      
      <main>
        <ComponentGallery />
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} - Formation développement web</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
```

## Étape 8: Configurer GitHub Pages dans package.json

Modifiez le fichier `package.json` pour ajouter:

```json
{
  "homepage": "https://[votre-username].github.io/gallery-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    // autres scripts existants...
  }
}
```

## Étape 9: Configurer le déploiement automatique avec GitHub Actions

Créez un dossier `.github/workflows` et un fichier `deploy.yml` à l'intérieur:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
    types: [closed]

jobs:
  build-and-deploy:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.pull_request.merged == true)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Node.js ⚙️
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install and Build 🔧
        run: |
          npm ci
          npm run build
        env:
          CI: false

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build
          branch: gh-pages
```

## Étape 10: Script d'automatisation pour le registre des composants

Créez un script qui sera exécuté lors du build pour construire automatiquement le registre des composants:

Créez un fichier `scripts/build-registry.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Chemin vers le dossier des composants des élèves
const componentsDir = path.join(__dirname, '../src/components/teams');

// Créer le dossier s'il n'existe pas encore
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

// Fonction pour générer le registre des composants
function generateComponentRegistry() {
  // Importer le composant placeholder par défaut
  let registryContent = `// Fichier généré automatiquement - NE PAS MODIFIER DIRECTEMENT
import PlaceholderComponent from '../shared/PlaceholderComponent';\n\n`;
  
  registryContent += 'export const componentRegistry = {\n';
  registryContent += '  "PlaceholderComponent": {\n';
  registryContent += '    Component: PlaceholderComponent,\n';
  registryContent += '    author: "Raphael",\n';
  registryContent += '    description: "Un composant d\'exemple en attendant les contributions des élèves."\n';
  registryContent += '  },\n';
  
  // Ajouter chaque dossier d'équipe s'il existe
  if (fs.existsSync(componentsDir)) {
    const teams = fs.readdirSync(componentsDir);
    
    teams.forEach(team => {
      const teamDir = path.join(componentsDir, team);
      
      if (fs.statSync(teamDir).isDirectory()) {
        const componentFiles = fs.readdirSync(teamDir)
          .filter(file => file.endsWith('.jsx') || file.endsWith('.js'));
        
        componentFiles.forEach(file => {
          const componentName = path.basename(file, path.extname(file));
          const relativePath = `../teams/${team}/${file}`;
          
          // Lire le fichier pour extraire les métadonnées (commentaires spéciaux)
          const componentContent = fs.readFileSync(path.join(teamDir, file), 'utf8');
          
          // Extraire l'auteur et la description des commentaires (format simplifié)
          const authorMatch = componentContent.match(/\/\* Author: (.*?) \*\//);
          const descriptionMatch = componentContent.match(/\/\* Description: (.*?) \*\//);
          
          const author = authorMatch ? authorMatch[1] : `Équipe ${team}`;
          const description = descriptionMatch ? descriptionMatch[1] : `Composant créé par l'équipe ${team}`;
          
          registryContent += `  "${team}-${componentName}": {\n`;
          registryContent += `    Component: require('${relativePath}').default,\n`;
          registryContent += `    author: "${author}",\n`;
          registryContent += `    description: "${description}"\n`;
          registryContent += '  },\n';
        });
      }
    });
  }
  
  registryContent += '};\n';
  
  // Écrire le fichier de registre
  fs.writeFileSync(
    path.join(__dirname, '../src/components/gallery/componentRegistry.js'),
    registryContent
  );
  
  console.log('Registre des composants généré avec succès');
}

// Exécuter la génération
generateComponentRegistry();
```

## Étape 11: Mettre à jour package.json pour exécuter le script

Ajoutez le script dans votre package.json:

```json
"scripts": {
  "prebuild": "node scripts/build-registry.js",
  "build": "react-scripts build",
  ...
}
```

## Étape 12: Créer un README pour guider les élèves

Créez un fichier `README.md` à la racine du projet:

```markdown
# Galerie de Composants React - TP Collaboratif

## Comment contribuer

1. Forkez ce repository
2. Clonez votre fork sur votre machine locale
3. Créez une branche pour votre équipe/composant
4. Ajoutez votre composant dans le dossier `src/components/teams/[numéro-équipe]/`
5. Assurez-vous d'ajouter les métadonnées en commentaire:
   ```javascript
   /* Author: Nom de l'équipe/membre */
   /* Description: Description du composant */
   ```
6. Créez une Pull Request vers le repository principal

## Structure du projet

- `/src/components/teams/` - Dossier où placer vos composants (par équipe)
- `/src/components/gallery/` - Système de galerie (ne pas modifier)
- `/src/components/shared/` - Composants partagés

## Déploiement

L'application est automatiquement déployée sur GitHub Pages à chaque merge dans la branche principale.
Vous pouvez voir la version en direct ici: [https://raphaelgabbay.github.io/gallery-app](https://raphaelgabbay.github.io/gallery-app)
```

## Étape 13: Exemple de structure pour les composants des élèves

Créez un exemple de composant d'équipe dans `src/components/teams/team1/ExampleCard.jsx`:

```jsx
/* Author: Team 1 - Alice et Bob */
/* Description: Une carte de présentation simple avec Tailwind CSS */

import React from 'react';

const ExampleCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Exemple de carte</div>
        <p className="text-gray-700 text-base">
          Ceci est un exemple de composant créé par l'équipe 1.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#react</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tailwind</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#git</span>
      </div>
    </div>
  );
};

export default ExampleCard;
```