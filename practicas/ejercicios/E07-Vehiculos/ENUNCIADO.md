# E07 · Jerarquía de vehículos

**Tipo:** autocorrección

Modela la flota de una empresa con una jerarquía de clases (herencia) y un motor intercambiable (composición), y aprovecha el polimorfismo para calcular los peajes.

**CE:** RA4 f, g, h

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

- `vehiculos.js`: vacío. Ahí van las cinco clases.
- `main.js`: crea una flota y la recorre. **No lo modifiques.**

## Requisitos

Exporta desde `vehiculos.js` estas cinco clases:

| Clase | Hereda de | Contrato |
|-------|-----------|----------|
| `Motor` | — | `constructor(tipo, potencia)`: `tipo` es `'gasolina'`, `'diésel'` o `'eléctrico'` (si no, `RangeError('Tipo de motor no válido: …')`). _Getter_ `etiquetaAmbiental`: `'CERO'` si es eléctrico y `'C'` si no. `toString()` → `gasolina 110 CV` |
| `Vehiculo` | — | `constructor(matricula, marca, motor)`. Campo estático `TARIFA_KM = 0.1`. Campo privado `#kilometros` con su _getter_ `kilometros`. `recorrer(km)` suma kilómetros y devuelve el total (`RangeError('Kilómetros no válidos: …')` si `km` no es positivo). `calcularPeaje(km)` → `km × TARIFA_KM`. `describir()` → `Coche Seat (1234-ABC) · gasolina 110 CV` |
| `Coche` | `Vehiculo` | Añade `plazas` (cuarto parámetro del constructor). Peaje normal, **a mitad de precio si su motor tiene etiqueta CERO**. `describir()` añade ` · 5 plazas` |
| `Moto` | `Vehiculo` | Paga la **mitad** del peaje normal |
| `Camion` | `Vehiculo` | Añade `ejes` (entero, 2 o más; si no, `RangeError('Un camión necesita al menos 2 ejes: …')`). Paga el peaje normal **por cada eje** más un fijo estático `FIJO = 5`. `describir()` añade ` · 3 ejes` |

Además:

1. Las subclases llaman a `super(…)` en su constructor y **reutilizan** el método de la superclase con `super.calcularPeaje(km)` y `super.describir()` en lugar de repetir el cálculo.
2. El nombre de la clase de `describir()` sale de `this.constructor.name`, no de un texto escrito en cada clase.
3. La bonificación del coche depende de **su motor**, no de una subclase `CocheElectrico`.
4. Documenta las clases y sus métodos con JSDoc.
5. Completa el `README.md` con:
   - Cómo ejecutarlo y la salida.
   - Un **diagrama de clases** en Mermaid (`classDiagram`) con las cinco clases, la herencia y la composición.
   - La **cadena de prototipos** de `flota[2]` (el camión), dibujada o como lista, y qué pasos sigue JavaScript para encontrar `recorrer` y `calcularPeaje`.
   - Dónde hay **polimorfismo** en `main.js` y qué ganas con él.
   - Por qué el motor es un objeto aparte (**composición**) y no una subclase `CocheElectrico`. Usa la última línea de la salida como argumento.

## Comprueba tu solución

`npm start` (o `node main.js`) muestra exactamente:

```text
🚗 Flota:
  Coche Seat (1234-ABC) · gasolina 110 CV · 5 plazas · 100 km · peaje: 10.00 €
  Moto Yamaha (5678-DEF) · gasolina 47 CV · 200 km · peaje: 5.00 €
  Camion Volvo (9012-GHI) · diésel 460 CV · 3 ejes · 300 km · peaje: 35.00 €
  Coche Tesla (3456-JKL) · eléctrico 283 CV · 5 plazas · 400 km · peaje: 5.00 €
💶 Peajes de la flota (100 km cada vehículo): 55.00 €
🌱 Etiqueta CERO: Tesla
🔗 instanceof Camion: true · Vehiculo: true · Coche: false
🔗 Camion.prototype hereda de Vehiculo.prototype: true
🔗 recorrer es heredado: true
❌ RangeError: Un camión necesita al menos 2 ejes: 1
❌ RangeError: Kilómetros no válidos: -5
❌ RangeError: Tipo de motor no válido: vapor
🔌 Con motor nuevo: Coche Seat (1234-ABC) · eléctrico 150 CV · 5 plazas · peaje: 5.00 €
```

- Busca `'Coche'`, `'Moto'` y `'Camion'` entre comillas en `vehiculos.js`: no deben aparecer.
- Busca `0.1` en `vehiculos.js`: solo debe aparecer una vez, en `TARIFA_KM`.
- `Object.keys(flota[0])` no incluye los kilómetros: son privados.
- Prueba a validar los ejes **antes** de `super(…)`: ¿qué error obtienes si escribes `this.ejes` antes de llamar a `super`? ¿Y si compruebas el parámetro `ejes` sin usar `this`? Anótalo en la sección «Validar antes de `super`» del README.
- La última línea demuestra que el peaje del coche cambia al cambiar el motor sin crear un objeto de otra clase.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
