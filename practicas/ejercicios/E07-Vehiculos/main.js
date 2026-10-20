// E07 · Programa principal. No modifiques este fichero.
import { Motor, Vehiculo, Coche, Moto, Camion } from './vehiculos.js';

const flota = [
  new Coche('1234-ABC', 'Seat', new Motor('gasolina', 110), 5),
  new Moto('5678-DEF', 'Yamaha', new Motor('gasolina', 47)),
  new Camion('9012-GHI', 'Volvo', new Motor('diésel', 460), 3),
  new Coche('3456-JKL', 'Tesla', new Motor('eléctrico', 283), 5),
];
flota.forEach((vehiculo, i) => vehiculo.recorrer(100 * (i + 1)));

console.log('🚗 Flota:');
flota.forEach((v) => {
  console.log(`  ${v.describir()} · ${v.kilometros} km · peaje: ${v.calcularPeaje(100).toFixed(2)} €`);
});

const totalPeajes = flota.reduce((suma, v) => suma + v.calcularPeaje(100), 0);
console.log(`💶 Peajes de la flota (100 km cada vehículo): ${totalPeajes.toFixed(2)} €`);
console.log(`🌱 Etiqueta CERO: ${flota.filter((v) => v.motor.etiquetaAmbiental === 'CERO').map((v) => v.marca).join(', ')}`);

const camion = flota[2];
console.log(`🔗 instanceof Camion: ${camion instanceof Camion} · Vehiculo: ${camion instanceof Vehiculo} · Coche: ${camion instanceof Coche}`);
console.log(`🔗 Camion.prototype hereda de Vehiculo.prototype: ${Object.getPrototypeOf(Camion.prototype) === Vehiculo.prototype}`);
console.log(`🔗 recorrer es heredado: ${!Object.hasOwn(Camion.prototype, 'recorrer') && 'recorrer' in camion}`);

for (const crear of [
  () => new Camion('0000-XXX', 'Iveco', new Motor('diésel', 300), 1),
  () => flota[0].recorrer(-5),
  () => new Motor('vapor', 10),
]) {
  try {
    crear();
  } catch (error) {
    console.log(`❌ ${error.name}: ${error.message}`);
  }
}

flota[0].motor = new Motor('eléctrico', 150);
console.log(`🔌 Con motor nuevo: ${flota[0].describir()} · peaje: ${flota[0].calcularPeaje(100).toFixed(2)} €`);
