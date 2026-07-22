"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
              <p className="text-xs text-gray-500">Atención personalizada y catálogo multimarca</p>
            </div>
          </div>
          
          {/* Botones de WhatsApp Directos */}
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

      {/* 2. BANNER PRINCIPAL + BOTÓN AL CATÁLOGO */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Venta de Vehículos y Repuestos
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Consultá nuestro inventario de autos o buscá directo entre más de 30.000 repuestos en stock.
          </p>

          {/* BOTÓN AL CATÁLOGO SEPARADO */}
          <div className="mb-10">
            <Link
              href="/repuestos"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              🔍 Ver Catálogo Completo de Repuestos →
            </Link>
          </div>

          {/* Fotos del Local */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
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

      {/* 3. SECCIÓN DE VENTA DE AUTOS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h3 className="text-3xl font-extrabold text-gray-900">Vehículos en Venta</h3>
          <p className="text-gray-600">Unidades seleccionadas y en excelente estado</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Auto 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 bg-gray-100">
              <Image src="/local-1.jpg" alt="Auto en venta" fill className="object-cover" />
            </div>
            <div className="p-6">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Usado Seleccionado</span>
              <h4 className="text-xl font-bold text-gray-900 mt-2">Chevrolet Corsa Classic 1.4</h4>
              <p className="text-sm text-gray-500 mt-1">Año 2013 • Excelente estado general • Documentación al día.</p>
            </div>
            <div className="p-6 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20el%20Chevrolet%20Corsa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition block text-center"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>

          {/* Auto 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 bg-gray-100">
              <Image src="/local-2.jpg" alt="Auto en venta" fill className="object-cover" />
            </div>
            <div className="p-6">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Oportunidad</span>
              <h4 className="text-xl font-bold text-gray-900 mt-2">Chevrolet Onix LTZ 1.4</h4>
              <p className="text-sm text-gray-500 mt-1">Año 2017 • Full full • VTV al día y listo para transferir.</p>
            </div>
            <div className="p-6 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20el%20Chevrolet%20Onix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition block text-center"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>

          {/* Auto 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 bg-gray-100">
              <Image src="/local-3.jpg" alt="Auto en venta" fill className="object-cover" />
            </div>
            <div className="p-6">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">Imperdible</span>
              <h4 className="text-xl font-bold text-gray-900 mt-2">Chevrolet Tracker LTZ</h4>
              <p className="text-sm text-gray-500 mt-1">Año 2018 • Caja Manual • Excelente mantenimiento.</p>
            </div>
            <div className="p-6 pt-0">
              <a
                href="https://wa.me/5491100000000?text=Hola,%20quisiera%20consultar%20por%20la%20Chevrolet%20Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition block text-center"
              >
                Consultar por este Auto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PIE DE PÁGINA */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© Venta de Autos y Repuestos - Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  );
}