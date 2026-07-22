const fs = require('fs');
const path = require('path');

try {
  // 1. Leer el archivo CSV
  const rutaCSV = path.join(process.cwd(), 'stock.csv');
  const contenidoCSV = fs.readFileSync(rutaCSV, 'utf-8');

  // 2. Separar por líneas
  const lineas = contenidoCSV.split('\n');
  const repuestos = [];

  // 3. Procesar línea por línea (omitimos el encabezado i = 1)
  for (let i = 1; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    if (!linea) continue; // Ignorar líneas vacías

    // Asumiendo separación por comas o punto y coma (ajusta si es necesario)
    const columnas = linea.split(';'); 

    const codigo = columnas[0] ? columnas[0].trim() : '';
    const descripcion = columnas[1] ? columnas[1].trim() : '';
    const precioBase = columnas[2] ? parseFloat(columnas[2].replace(',', '.')) : 0;

    if (codigo || descripcion) {
      // Aplicar el +30% de recargo
      const precioFinal = Math.round(precioBase * 1.30);

      repuestos.push({
        id: (i).toString(),
        codigo: codigo,
        descripcion: descripcion,
        categoria: "Repuestos GM",
        precio: precioFinal,
        stock: true
      });
    }
  }

  // 4. Generar el contenido TypeScript para src/repuestosData.ts
  const contenidoTS = `export interface Repuesto {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: boolean;
}

export const VENDEDORES = [
  { nombre: "Ventas", telefono: "5491100000000" }
];

export const REPUESTOS_LISTA: Repuesto[] = ${JSON.stringify(repuestos, null, 2)};
`;

  // 5. Guardar directamente en src/repuestosData.ts
  const rutaSalida = path.join(process.cwd(), 'src', 'repuestosData.ts');
  fs.writeFileSync(rutaSalida, contenidoTS, 'utf-8');

  console.log(`=============================================`);
  console.log(`✅ ¡ÉXITO! Se cargaron ${repuestos.length} repuestos con +30% aplicado.`);
  console.log(`📄 Guardado directamente en src/repuestosData.ts`);
  console.log(`=============================================\n`);

} catch (error) {
  console.error("❌ Error al procesar:", error.message);
}