'use client'

import { useState } from 'react'
import CodeModal from './CodeModal'

export default function ComponentCard({ title, author, description, children, code }) {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="p-4 bg-gray-50">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">Par: {author}</p>
      </div>
      <div className="p-4">
        {children}
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <button
          onClick={() => setIsCodeModalOpen(true)}
          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Voir le code"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </div>

      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        code={code}
        title={`Code de ${title}`}
      />
    </div>
  )
} 