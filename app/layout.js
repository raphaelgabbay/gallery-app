import './globals.css'

export const metadata = {
  title: 'Gallery App',
  description: 'A collaborative React/Git project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
