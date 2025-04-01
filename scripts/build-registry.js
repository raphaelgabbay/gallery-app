const fs = require('fs');
const path = require('path');

// Chemin vers le dossier des composants des élèves
const componentsDir = path.join(__dirname, '../app/components/teams');

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
  registryContent += '    author: "Formateur",\n';
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
          const relativePath = path.relative(
            path.join(__dirname, '../app/components/gallery'),
            path.join(teamDir, file)
          ).replace(/\\/g, '/');
          
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
    path.join(__dirname, '../app/components/gallery/componentRegistry.js'),
    registryContent
  );
  
  console.log('Registre des composants généré avec succès');
}

// Exécuter la génération
generateComponentRegistry(); 