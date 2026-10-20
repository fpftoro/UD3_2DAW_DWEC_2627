// E04 · Programa principal. No modifiques este fichero.
import { productos } from './datos.js';
import {
  nombresEnMayusculas,
  aplicarRebaja,
  valorInventario,
  masCaros,
  buscarPorCodigo,
  disponibles,
  contarPorCategoria,
  hayAgotados,
  todosConPrecio,
  etiquetasDistintas,
} from './catalogo.js';

console.log(`1. ${nombresEnMayusculas(productos).join(', ')}`);
console.log(`2. Rebajas: ${aplicarRebaja(productos, 10).map((p) => `${p.nombre} ${p.precio.toFixed(2)}`).join(' · ')}`);
console.log(`3. Valor del inventario: ${valorInventario(productos).toFixed(2)} €`);
console.log(`4. Los dos más caros: ${masCaros(productos, 2).join(', ')}`);
console.log(`5. P3: ${buscarPorCodigo(productos, 'P3')?.nombre ?? 'no existe'} · P9: ${buscarPorCodigo(productos, 'P9')?.nombre ?? 'no existe'}`);
console.log(`6. Disponibles: ${disponibles(productos).map((p) => p.nombre).join(', ')}`);
console.log(`7. Por categoría: ${JSON.stringify(contarPorCategoria(productos))}`);
console.log(`8. ¿Agotados? ${hayAgotados(productos)} · ¿Todos con precio? ${todosConPrecio(productos)}`);
console.log(`9. Etiquetas: ${etiquetasDistintas(productos).join(', ')}`);
console.log(`10. Orden original: ${productos.map((p) => p.codigo).join(', ')} · precio de P1: ${productos[0].precio}`);
