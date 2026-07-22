"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header corto */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl text-gray-900">
          Automotores Guarida
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-red-600">
            Showroom
          </Link>
          <Link href="/repuestos" className="text-sm font-semibold bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">
            Repuestos GM
          </Link>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Automotores Guarida</h1>
        <p className="text-gray-600 mt-2">Vehículos seleccionados y repuestos oficiales General Motors.</p>
        
        <div className="mt-6">
          <Link href="/repuestos" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800">
            Ver Catálogo de Repuestos
          </Link>
        </div>
      </main>
    </div>
  );
}