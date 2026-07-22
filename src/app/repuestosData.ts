export interface Repuesto {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: boolean;
}

export const VENDEDORES = [
  { nombre: "Matias", telefono: "5491130343177" },
  { nombre: "Andrea", telefono: "5491144756901" },
  { nombre: "Federico", telefono: "5491137622258" },
];

export const REPUESTOS_LISTA: Repuesto[] = [
  { id: "1", codigo: "11096251AL", descripcion: "LÁMPARA HALÓGENA CHEVROLET", categoria: "Electricidad", precio: 1500, stock: true },
  { id: "2", codigo: "95959514", descripcion: "BATERÍA CAPTIVA DIESEL ACDELCO", categoria: "Baterías", precio: 120000, stock: true },
  { id: "3", codigo: "52087637", descripcion: "ACABADO LATERAL COMPARTIMENTO TRASERO", categoria: "Carrocería", precio: 25000, stock: true },
  { id: "4", codigo: "INSTAL", descripcion: "SERVICIO DE INSTALACIÓN Y MONTAJE", categoria: "Servicios", precio: 73800, stock: true },
  { id: "5", codigo: "93302029", descripcion: "FILTRO DE ACEITE CHEVROLET ONIX / PRISMA / CELTA", categoria: "Filtros", precio: 8500, stock: true },
  { id: "6", codigo: "93302030", descripcion: "FILTRO DE AIRE CHEVROLET CORSA / CELTA", categoria: "Filtros", precio: 12400, stock: true },
  { id: "7", codigo: "52046268", descripcion: "PASTILLAS DE FRENO DELANTERAS S10 / TRAILBLAZER", categoria: "Frenos", precio: 48900, stock: true },
  { id: "8", codigo: "94797406", descripcion: "AMORTIGUADOR DELANTERO CHEVROLET CRUZE", categoria: "Suspensión", precio: 98500, stock: true },
  { id: "9", codigo: "25183761", descripcion: "BUJÍA DE ENCENDIDO ACDELCO CHEVROLET ONIX 1.4", categoria: "Encendido", precio: 6200, stock: true },
  { id: "10", codigo: "93302031", descripcion: "CORREA DE DISTRIBUCIÓN CHEVROLET CORSA / ONIX", categoria: "Motor", precio: 28900, stock: true },
  { id: "11", codigo: "95983139", descripcion: "KIT DE EMBRAGUE CHEVROLET TRACKER 1.8", categoria: "Transmisión", precio: 185000, stock: true },
  { id: "12", codigo: "94701837", descripcion: "BOMBA DE AGUA CHEVROLET SPIN / COBALT", categoria: "Motor", precio: 45000, stock: true },
  { id: "13", codigo: "13503675", descripcion: "DISCO DE FRENO DELANTERO CHEVROLET CRUZE", categoria: "Frenos", precio: 62000, stock: true },
  { id: "14", codigo: "95228802", descripcion: "OPTICA DELANTERA IZQUIERDA CHEVROLET ONIX", categoria: "Carrocería", precio: 145000, stock: true },
  { id: "15", codigo: "13502575", descripcion: "SENSOR DE PRESIÓN DE NEUMÁTICOS (TPMS)", categoria: "Electricidad", precio: 34000, stock: true }
];