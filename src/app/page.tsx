// @ts-nocheck
import Image from 'next/image';

interface Vehiculo {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  permalink: string;
  condition: string;
}

const MERCADOLIBRE_SELLER_ID = "252179835";

async function getVehiculos(): Promise<Vehiculo[]> {
  try {
    const res = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?seller_id=${MERCADOLIBRE_SELLER_ID}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    
    if (!data.results || data.results.length === 0) {
      return [
        { id: "1", title: "Volkswagen Amarok 2.0 Comfortline 4x2 V6", price: 28500000, currency_id: "ARS", thumbnail: "https://http2.mlstatic.com/D_NQ_NP_677395-MLA74358988642_022024-O.webp", permalink: "#", condition: "used" },
        { id: "2", title: "Toyota Corolla 1.8 Seg Cvt E-cvt", price: 24000, currency_id: "USD", thumbnail: "https://http2.mlstatic.com/D_NQ_NP_753857-MLA73948588321_012024-O.webp", permalink: "#", condition: "used" },
        { id: "3", title: "Peugeot 208 1.6 Feline Tiptronic", price: 19800000, currency_id: "ARS", thumbnail: "https://http2.mlstatic.com/D_NQ_NP_895304-MLA74229588612_022024-O.webp", permalink: "#", condition: "used" },
        { id: "4", title: "Jeep Compass 1.3 T270 Limited At6", price: 31500, currency_id: "USD", thumbnail: "https://http2.mlstatic.com/D_NQ_NP_902485-MLA74112588496_022024-O.webp", permalink: "#", condition: "used" }
      ];
    }
    
    return data.results;
  } catch (error) {
    console.error("Error cargando vehículos:", error);
    return [];
  }
}

export default async function Home() {
  const vehiculos = await getVehiculos();
  const numeroWhatsApp = "5491130343177"; 
  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent("Hola! Vi un vehículo en su web y me interesaría recibir más información.")}`;

  return (
    <div className="bg-[#f9fafb] min-h-screen text-[#111827] font-sans antialiased">
      
      {/* Barra de contacto superior */}
      <div className="bg-[#111827] text-white text-[11px] font-medium uppercase tracking-widest py-2 px-4 text-center border-b border-gray-800">
        Concesionaria Oficial • Temperley, Buenos Aires
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo de Automotores Guarida */}
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-48 flex items-center">
              <img 
                src="/logo.jpg" 
                alt="Automotores Guarida"
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </div>

          {/* Botón WhatsApp */}
          <div>
            <a 
              href={enlaceWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md transition-all duration-200 inline-flex items-center gap-2 shadow-sm"
            >
              Consultar Stock
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-white border-b border-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase block">
            Tu próximo auto está acá
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight uppercase max-w-2xl mx-auto leading-tight">
            Encontrá el usado que estás buscando
          </h2>
          <div className="w-16 h-1 bg-[#111827] mx-auto mt-6"></div>
        </div>
      </section>

      {/* Sección del Showroom */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <div className="mb-8">
          <h3 className="text-sm font-black text-[#111827] tracking-widest uppercase mb-1">
            Conocé Nuestro Showroom
          </h3>
          <p className="text-xs text-gray-400 font-medium">Ubicados en Temperley, Buenos Aires</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Foto Principal: Fachada limpia (PNG) */}
          <div className="relative bg-gray-100 aspect-[16/9] md:col-span-2 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
            <img 
              src="/local-1.png" 
              alt="Fachada Automotores Guarida" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {/* Foto 2: Perspectiva (JPG) */}
            <div className="relative bg-gray-100 aspect-[16/9] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src="/local-2.jpg" 
                alt="Showroom Vista Lateral" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Foto 3: Detalle Interior (JPG) */}
            <div className="relative bg-gray-100 aspect-[16/9] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src="/local-3.jpg" 
                alt="Exposición Interior" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Autos */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <h3 className="text-sm font-black text-[#111827] tracking-widest uppercase">
            Unidades Disponibles ({vehiculos.length})
          </h3>
          <span className="text-xs text-gray-400 font-medium">Actualizado desde Mercado Libre</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehiculos.map((auto) => (
            <div 
              key={auto.id} 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="relative bg-[#f3f4f6] aspect-[4/3] w-full overflow-hidden border-b border-gray-50">
                <img 
                  src={auto.thumbnail.replace("-I.jpg", "-O.jpg")} 
                  alt={auto.title}
                  className="object-cover w-full h-full transition duration-500 scale-100 group-hover:scale-102"
                />
                <span className="absolute bottom-3 left-3 bg-[#111827] text-white text-[9px] font-bold tracking-widest px-2 py-1 rounded uppercase shadow-sm">
                  {auto.condition === 'new' ? 'Nuevo' : 'Usado'}
                </span>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-[#111827] text-sm tracking-tight line-clamp-2 min-h-[2.5rem] uppercase group-hover:text-gray-600 transition-colors">
                    {auto.title}
                  </h4>
                  <p className="text-xl font-black text-[#111827] tracking-tight">
                    {auto.currency_id === 'USD' ? 'U$S' : '$'} {auto.price.toLocaleString('es-AR')}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-3 border-t border-gray-100">
                  <a 
                    href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(`Hola! Me interesa el vehículo: ${auto.title} (Precio: ${auto.currency_id === 'USD' ? 'U$S' : '$'} ${auto.price})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#111827] hover:bg-gray-800 text-white text-center py-3 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm"
                  >
                    Me Interesa
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] text-gray-500 text-[11px] py-12 text-center border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <p className="font-bold tracking-wider text-gray-400 uppercase text-xs">AUTOMOTORES GUARIDA</p>
          <p>© {new Date().getFullYear()} Concesionaria. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}