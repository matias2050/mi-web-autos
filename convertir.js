const fs = require('fs');
const path = require('path');

const ARCHIVO_CSV = 'stock.csv';

try {
  const rutaArchivo = path.join(__dirname, ARCHIVO_CSV);
  if (!fs.existsSync(rutaArchivo)) {
    console.error(`❌ No se encontró el archivo: ${ARCHIVO_CSV}`);
    process.exit(1);
  }

  // Leer el archivo en codificación latin1/utf8 para acentos
  const contenido = fs.readFileSync(rutaArchivo, 'latin1');
  const lineas = contenido.split(/\r?\n/);

  console.log(`\nProcesando ${lineas.length} líneas de stock.csv...`);

  const repuestos = [];
  let idCount = 1;

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    if (!linea) continue;

    // Separar por punto y coma (;)
    const columnas = linea.split(';');
    if (columnas.length < 3) continue;

    // Columna 1: Código
    const codigo = (columnas[1] || '').trim();
    
    // Columna 2: Descripción
    const descripcion = (columnas[2] || '').trim();

    // La última columna suele tener el precio (ej: "289,55")
    let costo = 0;
    for (let c = columnas.length - 1; c >= 3; c--) {
      const valStr = (columnas[c] || '').trim().replace(/\./g, '').replace(',', '.');
      const parsed = parseFloat(valStr);
      if (!isNaN(parsed) && parsed > 0) {
        costo = parsed;
        break;
      }
    }

    // Validar que tengamos código o descripción y costo
    if ((!codigo && !descripcion) || costo <= 0) continue;
    if (codigo.toLowerCase().includes('articulo') || codigo.toLowerCase().includes('codigo')) continue;

    // Sumar +30% al costo
    const precioFinal = Math.round(costo * 1.30);

    repuestos.push({
      id: String(idCount++),
      codigo: codigo || `REP-${idCount}`,
      descripcion: descripcion || codigo,
      categoria: "Repuestos GM",
      precio: precioFinal,
      stock: true
    });
  }

  const rutaSalida = path.join(process.cwd(), 'public', 'repuestos.json');
  fs.writeFileSync(rutaSalida, JSON.stringify(repuestos, null, 2), 'utf-8');

  console.log(`==============================================`);
  console.log(`✅ ¡ÉXITO! Se cargaron ${repuestos.length} repuestos con +30% aplicado.`);
  console.log(`📄 Guardado en public/repuestos.json`);
  console.log(`==============================================\n`);

} catch (error) {
  console.error("❌ Error al procesar:", error.message);
}