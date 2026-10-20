// E08 · Programa principal. No modifiques este fichero.
import { Termostato } from './Termostato.js';

const salon = new Termostato('Salón');
const historial = [];

const pantalla = ({ anterior, actual }) => console.log(`  📟 Pantalla: ${anterior} → ${actual} °C`);
salon.on('cambio', pantalla);
salon.on('cambio', pantalla); // la misma función otra vez: no se duplica
const dejarDeRegistrar = salon.on('cambio', ({ actual }) => historial.push(actual));
salon.once('alerta', (mensaje) => console.log(`  🚨 SMS al propietario: ${mensaje}`));
salon.on('alerta', (mensaje) => console.log(`  🔔 Alarma: ${mensaje}`));

console.log(`👂 Oyentes de «cambio»: ${salon.oyentes('cambio')} · de «alerta»: ${salon.oyentes('alerta')}`);
for (const grados of [22, 22, 31]) {
  console.log(`🌡️ Mide ${grados}`);
  salon.medir(grados);
}
dejarDeRegistrar();
for (const grados of [33, 3]) {
  console.log(`🌡️ Mide ${grados}`);
  salon.medir(grados);
}

console.log(`📜 Historial: ${historial.join(', ')} · temperatura actual: ${salon.temperatura} °C`);
console.log(`👂 Oyentes de «cambio»: ${salon.oyentes('cambio')} · de «alerta»: ${salon.oyentes('alerta')}`);
console.log(`📣 emit('desconocido') avisa a ${salon.emit('desconocido')} oyentes`);
try {
  salon.on('cambio', 'no soy una función');
} catch (error) {
  console.log(`❌ ${error.name}: ${error.message}`);
}
