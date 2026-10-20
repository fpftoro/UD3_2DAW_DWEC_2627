// E05 · Programa principal. No modifiques este fichero.
import { crearGestorTareas } from './gestor.js';

const gestor = crearGestorTareas();
gestor.anadir('Estudiar closures', 'dwec', 'estudio');
gestor.anadir('Entregar E04', 'dwec', 'entrega', 'dwec');
gestor.anadir('Comprar pan', 'casa');
const ultima = gestor.anadir('  Repasar Map y Set ', 'dwec', 'estudio');

console.log(`📝 Tareas creadas: ${ultima}`);
console.log(`✅ Completar la 2: ${gestor.completar(2)} · otra vez: ${gestor.completar(2)} · la 9: ${gestor.completar(9)}`);
console.log(`⏳ Pendientes: ${gestor.pendientes().join(', ')}`);
console.log(`🏷️ Con «estudio»: ${gestor.porEtiqueta('estudio').join(', ')}`);
console.log(`🏷️ Etiquetas usadas: ${gestor.etiquetasUsadas().join(', ')}`);
console.log(
  `🔢 Tareas por etiqueta: ${[...gestor.contarPorEtiqueta()].map(([etiqueta, n]) => `${etiqueta} → ${n}`).join(' · ')}`,
);
console.log(`🗑️ Eliminar la 3: ${gestor.eliminar(3)} · otra vez: ${gestor.eliminar(3)}`);
console.log(`📊 Resumen: ${JSON.stringify(gestor.resumen())}`);
try {
  gestor.anadir('   ', 'vacía');
} catch (error) {
  console.log(`❌ ${error.message}`);
}
console.log(`👥 Otro gestor: ${crearGestorTareas().resumen().total} tareas`);
console.log(`🔒 Acceso directo a las tareas: ${gestor.tareas}`);
