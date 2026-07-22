"use client";

import { useState, useEffect } from 'react';

// Interfaz para definir la estructura de cada repuesto
interface Repuesto {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: boolean;
}

export default function Home() {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  // Carga los 32.000 repuestos desde public/repuestos.json
  useEffect(() => {
    fetch('/repuestos.json')
      .then((res) => res.json())
      .then((data: Repuesto[]) => {
        setRepuestos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar el catálogo:", err);
        setCargando(false);
      });
  }, []);

  // Filtra repuestos por código o por descripción en tiempo real
  const repuestosFiltrados = repuestos.filter((item) => {
    const termino = busqueda.toLowerCase();
    return (
      item.codigo.toLowerCase().includes(termino) ||
      item.descripcion.toLowerCase().includes(termino)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
            Catálogo de Repuestos
          </h1>
          <p className="text-gray-600">
            Consultá stock y precios en tiempo real
          </p>
        </header>

        {/* Buscador */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por código o descripción (ej: filtro, pastilla, 933...)"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Estado de carga */}
        {cargando ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 font-semibold animate-pulse">
              ⏳ Cargando más de 30.000 repuestos...
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Mostrando {repuestosFiltrados.length} repuestos encontrados
            </p>

            {/* Grilla de Repuestos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repuestosFiltrados.slice(0, 60).map((item) => {
                const mensajeWa = encodeURIComponent(
                  `Hola! Me interesa consultar por el repuesto: ${item.descripcion} (Código: ${item.codigo})`
                );

                return (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold mb-2">
                        {item.codigo}
                      </span>
                      <h2 className="text-lg font-bold text-gray-800 mb-2">
                        {item.descripcion}
                      </h2>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 block">Precio</span>
                        <span className="text-2xl font-extrabold text-green-600">
                          ${item.precio.toLocaleString('es-AR')}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/5491100000000?text=${mensajeWa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition"
                      >
                        Consultar
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {repuestosFiltrados.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border">
                <p className="text-gray-500">No se encontraron repuestos con esa búsqueda.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}