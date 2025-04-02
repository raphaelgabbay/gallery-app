
import ComponentGallery from './components/gallery/ComponentGallery'

import fs from 'fs'
import path from 'path'
import ComponentGallery from './components/gallery/ComponentGallery'

// This function will be executed at build time
async function getComponentCode(componentPath) {
  try {
    const fullPath = path.join(process.cwd(), componentPath)
    const code = await fs.promises.readFile(fullPath, 'utf8')
    return code
  } catch (error) {
    console.error(`Error reading component code: ${error}`)
    return 'Code not available'
  }
}

export default async function Home() {

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">TP Collaboratif React/Git</h1>
          <p>Formation React, Tailwind, Git</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Galerie de Composants</h2>
        <ComponentGallery />
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} - Formation développement web</p>
        </div>
      </footer>
    </div>
  )
}