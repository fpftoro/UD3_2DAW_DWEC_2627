// E02 · Demostración de la biblioteca de texto. No hace falta modificar este fichero.
import {
  capitalizar,
  capitalizarPalabras,
  contarPalabras,
  invertir,
  esPalindromo,
  truncar,
  crearCensurador,
  unirConY,
} from './texto.js';

const censurar = crearCensurador('tonto', 'feo');

console.log(`1. ${capitalizar('ñandú')}`);
console.log(`2. ${capitalizarPalabras('el SEÑOR de los anillos')}`);
console.log(`3. ${contarPalabras('  hola   mundo  cruel ')} palabras`);
console.log(`4. ${invertir('DWEC 2025')}`);
console.log(`5. ${esPalindromo('Anita lava la tina')} · ${esPalindromo('Hola')}`);
console.log(`6. ${truncar('Desarrollo web en entorno cliente', 16)}`);
console.log(`7. ${truncar('Desarrollo web en entorno cliente', 16, '...')}`);
console.log(`8. ${censurar('No seas TONTO que eso es feo')}`);
console.log(
  `9. ${unirConY('Ana')} · ${unirConY('Ana', 'Luis')} · ${unirConY('Ana', 'Luis', 'Eva')}`,
);
try {
  truncar('Hola', 0);
} catch (error) {
  console.log(`10. ❌ ${error.name}: ${error.message}`);
}
