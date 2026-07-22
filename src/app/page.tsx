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

  // Carga ligera del catálogo JSON con más de 32.000 repuestos
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

  const repuestosFiltrados = repuestos.filter((item) => {
    const termino = busqueda.toLowerCase();
    return (
      item.codigo.toLowerCase().includes(termino) ||
      item.descripcion.toLowerCase().includes(termino)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* 1. CABECERA CON LOGO Y VENDEDORES */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.jpg" 
              alt="Logo" 
              width={50} 
              height={50} 
              className="rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Venta de Autos y Repuestos
              </h1>
              <p className="text-xs text-gray-500">Atención personalizada y repuestos originales / alternativos</p>
            </div>
          </div>
          
          {/* Botones de WhatsApp de los 3 vendedores */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://wa.me/5491100000000?text=Hola%20Andrea,%20quisiera%20consultar..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm flex items-center gap-1"
            >
              💬 WhatsApp Andrea
            </a>
            <a
              href="https://wa.me/5491100000000?text=Hola%20Matias,%20quisiera%20consultar..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm flex items-center gap-1"
            >
              💬 WhatsApp Matías
            </a>
            <a
              href="https://wa.me/5491100000000?text=Hola%20Federico,%20quisiera%20consultar..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm flex items-center gap-1"
            >
              💬 WhatsApp Federico
            </a>
          </div>
        </div>
      </header>

      {/* 2. PORTADA Y GALERÍA DE FOTOS DEL LOCAL */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3">
            Venta de Autos & Repuestos Chevrolet
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Atención personalizada, asesoramiento técnico y más de 30.000 repuestos en stock.
          </p>

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

      {/* 3. SECCIÓN DE LOS 4 AUTOS EN VENTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h3 className="text-3xl font-extrabold text-gray-900">Vehículos en Venta</h3>
          <p className="text-gray-600">Unidades destacadas y seleccionadas en excelente estado</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Auto 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 bg-gray-100">
              <Image src="/local-1.jpg" alt="Chevrolet Corsa Classic" fill className="object-cover" />
            </div>
            <div className="p-5">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Usado Seleccionado</span>
              <h4 className="text-lg font-bold text-gray-900 mt-2">Chevrolet Corsa Classic 1.4</h4>
              <p className="text-xs text-gray-500 mt-1">Año 2013 • Excelente estado general • Listo para transferir.</p>
            </div>
            <div className="p-5 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20el%20Chevrolet%20Corsa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition block text-center text-sm"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>

          {/* Auto 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 bg-gray-100">
              <Image src="/local-2.jpg" alt="Chevrolet Onix LTZ" fill className="object-cover" />
            </div>
            <div className="p-5">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Oportunidad</span>
              <h4 className="text-lg font-bold text-gray-900 mt-2">Chevrolet Onix LTZ 1.4</h4>
              <p className="text-xs text-gray-500 mt-1">Año 2017 • Full full • VTV al día y documentación en regla.</p>
            </div>
            <div className="p-5 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20el%20Chevrolet%20Onix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition block text-center text-sm"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>

          {/* Auto 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 bg-gray-100">
              <Image src="/local-3.jpg" alt="Chevrolet Tracker LTZ" fill className="object-cover" />
            </div>
            <div className="p-5">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Imperdible</span>
              <h4 className="text-lg font-bold text-gray-900 mt-2">Chevrolet Tracker LTZ</h4>
              <p className="text-xs text-gray-500 mt-1">Año 2018 • Caja Manual • Service oficial realizado.</p>
            </div>
            <div className="p-5 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20la%20Chevrolet%20Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition block text-center text-sm"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>

          {/* Auto 4 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 bg-gray-100">
              <Image src="/local-1.jpg" alt="Chevrolet Prisma LT" fill className="object-cover" />
            </div>
            <div className="p-5">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Seleccionado</span>
              <h4 className="text-lg font-bold text-gray-900 mt-2">Chevrolet Prisma LT 1.4</h4>
              <p className="text-xs text-gray-500 mt-1">Año 2016 • Único dueño • Excelente andar y baúl amplio.</p>
            </div>
            <div className="p-5 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20el%20Chevrolet%20Prisma"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition block text-center text-sm"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECCIÓN DEL CATÁLOGO DE REPUESTOS EN LA MISMA PÁGINA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Catálogo de Repuestos</h3>
          <p className="text-sm text-gray-500 mb-6">Buscá por código o descripción en nuestros 32.000 artículos en stock:</p>
          
          <input
            type="text"
            placeholder="Ej: filtro de aceite, pastilla de freno, 933..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
          />
        </div>

        {cargando ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-xl text-gray-600 font-semibold animate-pulse">
              ⏳ Cargando catálogo completo de repuestos...
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600 font-medium">
                Se encontraron <span className="font-bold text-gray-900">{repuestosFiltrados.length}</span> repuestos
              </p>
            </div>

            {/* Grilla dinámica de repuestos */}
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
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-lg">No encontramos ningún repuesto con esa búsqueda.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* 5. PIE DE PÁGINA */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© Venta de Autos y Repuestos Chevrolet - Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  );
}