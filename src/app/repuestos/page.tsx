"use client";

import { useState } from "react";
import Link from "next/link";
import { REPUESTOS_LISTA, VENDEDORES, Repuesto } from "../repuestosData";

export default function RepuestosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState<Repuesto | null>(null);

  const repuestosFiltrados = REPUESTOS_LISTA.filter(
    (item) =>
      item.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const generarMensajeWS = (repuesto: Repuesto, vendedorTel: string) => {
    const texto = encodeURIComponent(
      `Hola! Quería consultar disponibilidad del repuesto:\n\n*Código:* ${repuesto.codigo}\n*Descripción:* ${repuesto.descripcion}\n*Precio Ref:* $${repuesto.precio.toLocaleString('es-AR')}`
    );
    window.open(`https://wa.me/${vendedorTel}?text=${texto}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827] font-sans antialiased">
      {/* Barra de Contactos Directos */}
      <div className="bg-[#111827] text-white py-2 px-4 border-b border-gray-800 text-[11px] font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="uppercase tracking-widest text-gray-400">
            Atención Directa Repuestos GM:
          </span>
          <div className="flex items-center gap-4 text-[12px]">
            {VENDEDORES.map((v) => (
              <a
                key={v.nombre}
                href={`https://wa.me/${v.telefono}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition-colors flex items-center gap-1 font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {v.nombre}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="relative h-14 w-48 flex items-center">
            <img 
              src="/logo.jpg" 
              alt="Automotores Guarida"
              className="object-contain max-h-full max-w-full"
            />
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/" className="text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-red-600 transition-colors">
              Showroom Autos
            </Link>
            <Link href="/repuestos" className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md shadow-sm">
              Catálogo Repuestos GM
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">Catálogo de Repuestos GM</h1>
          <p className="text-gray-500 text-xs mt-1 font-medium">
            Buscá la pieza por código original OEM, categoría o descripción.
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por código (ej: 95959514), nombre de pieza..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm bg-white shadow-sm"
          />
        </div>

        {/* Grilla de Repuestos */}
        {repuestosFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-500 font-medium text-sm">No se encontraron repuestos con ese término de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repuestosFiltrados.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[11px] font-mono bg-gray-100 text-gray-800 px-2.5 py-1 rounded font-bold">
                      CÓD: {item.codigo}
                    </span>
                    <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase">
                      {item.categoria}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug uppercase">
                    {item.descripcion}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Precio Ref.</span>
                    <span className="text-lg font-black text-gray-900">
                      ${item.precio.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <button
                    onClick={() => setRepuestoSeleccionado(item)}
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de selección de vendedor */}
      {repuestoSeleccionado && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-1">Elegí con quién consultar</h3>
            <p className="text-xs text-gray-500 mb-4 font-medium">
              Pieza: <strong className="text-gray-900 uppercase">{repuestoSeleccionado.descripcion}</strong> (Cód: {repuestoSeleccionado.codigo})
            </p>

            <div className="space-y-2.5">
              {VENDEDORES.map((v) => (
                <button
                  key={v.nombre}
                  onClick={() => {
                    generarMensajeWS(repuestoSeleccionado, v.telefono);
                    setRepuestoSeleccionado(null);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                >
                  <span className="font-bold text-gray-800 text-xs uppercase tracking-wider">Consultar con {v.nombre}</span>
                  <span className="text-[11px] font-bold text-green-600 bg-white border border-green-200 px-3 py-1 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                    WhatsApp →
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setRepuestoSeleccionado(null)}
              className="mt-5 text-xs font-semibold text-gray-400 hover:text-gray-600 w-full text-center block uppercase tracking-wider"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}