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

    const columnas = linea.includes(';') ? linea.split(';') : linea.split(','); 

    const codigo = columnas[0] ? columnas[0].trim().replace(/"/g, '') : '';
    const descripcion = columnas[1] ? columnas[1].trim().replace(/"/g, '') : '';
    
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

  // 4. Guardar como JSON estático en public/repuestos.json
  const rutaSalida = path.join(process.cwd(), 'public', 'repuestos.json');
  fs.writeFileSync(rutaSalida, JSON.stringify(repuestos), 'utf-8');

  // 5. Crear repuestosData.ts liviano que exporte los tipos y una función de carga
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
`;
  const rutaTS = path.join(process.cwd(), 'src', 'repuestosData.ts');
  fs.writeFileSync(rutaTS, contenidoTS, 'utf-8');

  console.log("=============================================");
  console.log("✅ ¡ÉXITO! Se generó public/repuestos.json con " + repuestos.length + " repuestos.");
  console.log("=============================================\n");

} catch (error) {
  console.error("❌ Error al procesar:", error.message);
}