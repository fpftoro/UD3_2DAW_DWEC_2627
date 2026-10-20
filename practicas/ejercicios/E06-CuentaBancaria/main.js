// E06 · Programa principal. No modifiques este fichero.
import { CuentaBancaria } from './CuentaBancaria.js';

/**
 * Ejecuta una operación y muestra el error si lo lanza.
 * @param {string} descripcion
 * @param {() => void} operacion
 */
function intentar(descripcion, operacion) {
  try {
    operacion();
    console.log(`✅ ${descripcion}`);
  } catch (error) {
    console.log(`❌ ${descripcion}: ${error.name} · ${error.message}`);
  }
}

const ana = new CuentaBancaria('Ana López', 100);
const luis = new CuentaBancaria('  Luis Pérez ');

ana.ingresar(50);
ana.transferir(luis, 70.5);
luis.retirar(20);
console.log(`🏦 ${ana}`);
console.log(`🏦 ${luis}`);

intentar('Retirar 500 de Ana', () => ana.retirar(500));
intentar('Ingresar -5 en Ana', () => ana.ingresar(-5));
intentar('Transferir a un texto', () => ana.transferir('ES-DWEC-0002', 10));
intentar('Abrir una cuenta sin titular', () => new CuentaBancaria('   ', 10));
try {
  ana.saldo = 1000000;
} catch (error) {
  // El mensaje depende del navegador o de la versión de Node.js: solo se muestra el tipo
  console.log(`❌ Cambiar el saldo a mano: ${error.name} · saldo: ${ana.saldo.toFixed(2)} €`);
}

const copia = ana.movimientos;
copia.push({ tipo: 'trampa', importe: 1000000, saldo: 1000000 });

console.log('📄 Extracto de Ana:');
ana.movimientos.forEach(({ tipo, importe, saldo }) => {
  console.log(`   ${tipo.padEnd(32)} ${importe.toFixed(2).padStart(8)} € → ${saldo.toFixed(2).padStart(8)} €`);
});
console.log(`🔢 Cuentas abiertas: ${CuentaBancaria.totalCuentas}`);
console.log(`🔑 Propiedades públicas: ${Object.keys(ana).join(', ')}`);
