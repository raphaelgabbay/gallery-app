import FancyButton from './components/teams/team1/FancyButton'

export default function Home() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="p-4 bg-gray-50">
              <h2 className="text-xl font-semibold">Team 1 - Fancy Button</h2>
              <p className="text-sm text-gray-500">Par: Student Demo</p>
            </div>
            <div className="p-4">
              <FancyButton />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} - Formation développement web</p>
        </div>
      </footer>
    </div>
  )
}
