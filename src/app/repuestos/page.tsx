"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Repuesto {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: boolean;
}

export default function PaginaRepuestos() {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  // Carga ultra rápida del catálogo desde public/repuestos.json
  useEffect(() => {
    fetch('/repuestos.json')
      .then((res) => res.json())
      .then((data: Repuesto[]) => {
        setRepuestos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar el catálogo de repuestos:", err);
        setCargando(false);
      });
  }, []);

  // Filtra por código o descripción
  const repuestosFiltrados = repuestos.filter((item) => {
    const termino = busqueda.toLowerCase();
    return (
      item.codigo.toLowerCase().includes(termino) ||
      item.descripcion.toLowerCase().includes(termino)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Botón Volver al inicio */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Encabezado y Buscador */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Catálogo de Repuestos
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Buscá por código o descripción entre nuestros más de 30.000 artículos en stock:
          </p>
          
          <input
            type="text"
            placeholder="Ej: filtro de aceite, pastilla, 933..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
          />
        </div>

        {/* Estado de Carga */}
        {cargando ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-xl text-gray-600 font-semibold animate-pulse">
              ⏳ Cargando catálogo completo de repuestos...
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 font-medium mb-6">
              Se encontraron <span className="font-bold text-gray-900">{repuestosFiltrados.length}</span> repuestos
            </p>

            {/* Grilla de Repuestos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {repuestosFiltrados.slice(0, 60).map((item) => {
                const mensajeWa = encodeURIComponent(
                  `Hola! Quisiera consultar stock por el repuesto: ${item.descripcion} (Código: ${item.codigo})`
                );

                return (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-bold mb-3 border border-blue-100">
                        CÓDIGO: {item.codigo}
                      </span>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                        {item.descripcion}
                      </h2>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 block">Precio contado</span>
                        <span className="text-2xl font-black text-green-600">
                          ${item.precio.toLocaleString('es-AR')}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/5491100000000?text=${mensajeWa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition shadow-sm"
                      >
                        Consultar
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mensaje de no encontrado */}
            {repuestosFiltrados.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-lg">
                  No encontramos ningún repuesto con esa búsqueda.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}