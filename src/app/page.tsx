"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

  // Carga ultra rápida del catálogo JSON
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

  const repuestosFiltrados = repuestos.filter((item) => {
    const termino = busqueda.toLowerCase();
    return (
      item.codigo.toLowerCase().includes(termino) ||
      item.descripcion.toLowerCase().includes(termino)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* 1. NAVEGACIÓN Y CABECERA CON LOGO */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.jpg" 
              alt="Logo Repuestos" 
              width={50} 
              height={50} 
              className="rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Repuestos Chevrolet
              </h1>
              <p className="text-xs text-gray-500">Venta de repuestos originales y alternativos</p>
            </div>
          </div>
          
          <a
            href="https://wa.me/5491100000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2"
          >
            <span>💬 WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 2. PORTADA PRINCIPAL CON GALERÍA DE FOTOS DEL LOCAL */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12 px-4 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Encontrá el repuesto que necesitás
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Más de 30.000 artículos en stock inmediato para tu vehículo.
          </p>

          {/* Fotos del Local */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg border-2 border-blue-400/30">
              <Image src="/local-1.jpg" alt="Local 1" fill className="object-cover" />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg border-2 border-blue-400/30">
              <Image src="/local-2.jpg" alt="Local 2" fill className="object-cover" />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg border-2 border-blue-400/30">
              <Image src="/local-3.jpg" alt="Local 3" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN DEL CATÁLOGO Y BUSCADOR */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Buscador de Repuestos</h3>
          <p className="text-sm text-gray-500 mb-6">Ingresá el código o nombre del repuesto:</p>
          
          <input
            type="text"
            placeholder="Ej: filtro de aceite, pastillas de freno, 933..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
          />
        </div>

        {cargando ? (
          <div className="text-center py-16 bg-white rounded-2xl border">
            <p className="text-xl text-gray-600 font-semibold animate-pulse">
              ⏳ Cargando catálogo completo...
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600 font-medium">
                Se encontraron <span className="font-bold text-gray-900">{repuestosFiltrados.length}</span> productos
              </p>
            </div>

            {/* Grilla de productos */}
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
                      <h4 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                        {item.descripcion}
                      </h4>
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

            {repuestosFiltrados.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border">
                <p className="text-gray-500 text-lg">No encontramos ningún repuesto con esa búsqueda.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* 4. PIE DE PÁGINA */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© Repuestos Chevrolet - Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  );
}