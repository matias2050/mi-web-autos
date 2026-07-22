const fs = require('fs');
const path = require('path');

try {
  // 1. Leer el archivo CSV
  const rutaCSV = path.join(process.cwd(), 'stock.csv');
  const contenidoCSV = fs.readFileSync(rutaCSV, 'utf-8');

  // 2. Separar por líneas
  const lineas = contenidoCSV.split('\n');
  const repuestos = [];

  // 3. Procesar línea por línea
  for (let i = 1; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    if (!linea) continue;

    // Acepta punto y coma o coma
    const columnas = linea.includes(';') ? linea.split(';') : linea.split(','); 

    const codigo = columnas[0] ? columnas[0].trim().replace(/"/g, '') : '';
    const descripcion = columnas[1] ? columnas[1].trim().replace(/"/g, '') : '';
    
    // Parsear precio limpiando caracteres raros
    const precioLimpio = columnas[2] ? columnas[2].replace(/[^\d.,]/g, '').replace(',', '.') : '0';
    const precioBase = parseFloat(precioLimpio) || 0;

    if (codigo || descripcion) {
      const precioFinal = Math.round(precioBase * 1.30);

      repuestos.push({
        id: String(i),
        codigo: codigo || "S/C",
        descripcion: descripcion || "Sin descripción",
        categoria: "Repuestos GM",
        precio: precioFinal,
        stock: true
      });
    }
  }

  // 4. Generar el código TS compatible
  
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
  console.log(`✅ ¡ÉXITO! Se cargaron ${repuestos.length} repuestos sin errores de sintaxis.`);
  console.log(`📄 Guardado en src/repuestosData.ts`);
  console.log(`=============================================\n`);

} catch (error) {
  console.error("❌ Error al procesar:", error.message);
}