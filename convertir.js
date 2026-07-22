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

  // 4. Generar contenido TS
  const cabecera = `export interface Repuesto {\n  id: string;\n  codigo: string;\n  descripcion: string;\n  categoria: string;\n  precio: number;\n  stock: boolean;\n}\n\nexport const VENDEDORES = [\n  { nombre: "Ventas", telefono: "5491100000000" }\n];\n\nexport const REPUESTOS_LISTA: Repuesto[] = `;
  
  const datosJson = JSON.stringify(repuestos, null, 2);
  const contenidoTS = cabecera + datosJson + ';\n';

  // 5. Guardar en src/repuestosData.ts
  const rutaSalida = path.join(process.cwd(), 'src', 'repuestosData.ts');
  fs.writeFileSync(rutaSalida, contenidoTS, 'utf-8');

  console.log("=============================================");
  console.log("✅ ¡EXITO! Se cargaron " + repuestos.length + " repuestos.");
  console.log("📄 Guardado en src/repuestosData.ts");
  console.log("=============================================\n");

} catch (error) {
  console.error("❌ Error al procesar:", error.message);
}