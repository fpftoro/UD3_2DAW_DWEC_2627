# E08 · Emisor de eventos

**Tipo:** autocorrección

Implementa el patrón **Observer** con una clase `EmisorEventos` reutilizable y úsala para que un termostato avise de sus cambios a quien se suscriba, sin conocerlo.

**CE:** RA4 i, j

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

- `EmisorEventos.js` y `Termostato.js`: vacíos.
- `main.js`: crea un termostato, le suscribe varias funciones y registra mediciones. **No lo modifiques.**

## Requisitos

**`EmisorEventos.js`**: exporta la clase `EmisorEventos`.

| Método | Comportamiento |
|--------|----------------|
| `on(evento, oyente)` | Suscribe la función `oyente` al evento. La misma función suscrita dos veces al mismo evento se guarda **una sola vez**. Devuelve una **función** que, al llamarla, da de baja la suscripción. Lanza `TypeError('El oyente debe ser una función')` si `oyente` no es una función |
| `once(evento, oyente)` | Como `on`, pero el oyente solo se ejecuta **la primera vez** que se emite el evento y después se da de baja solo |
| `off(evento, oyente)` | Da de baja la función. Devuelve `true` si estaba suscrita |
| `emit(evento, ...datos)` | Llama a todas las funciones del evento, **en el orden en que se suscribieron**, pasándoles los datos. Devuelve a cuántas ha avisado |
| `oyentes(evento)` | Número de funciones suscritas al evento |

1. Guarda las suscripciones en un campo **privado**: un `Map` de evento → `Set` de funciones.
2. Ten cuidado con `once`: la función se da de baja **mientras** `emit` recorre la colección.

**`Termostato.js`**: exporta la clase `Termostato`, que **hereda** de `EmisorEventos`.

3. `constructor(nombre, temperaturaInicial = 20)`, con un _getter_ `temperatura` sobre un campo privado.
4. Campos estáticos `MAXIMA = 30` y `MINIMA = 5`.
5. `medir(grados)`: si la temperatura **no cambia**, no hace nada. Si cambia, la guarda y emite `cambio` con `{ anterior, actual }`. Si además supera la máxima o baja de la mínima, emite `alerta` con un mensaje como `Salón a 31 °C (máximo 30 °C)`.
6. `Termostato` **no sabe** quién está suscrito ni qué hace cada función: no hay ningún `console.log` en `Termostato.js` ni en `EmisorEventos.js`.

**Documentación**:

7. JSDoc en las dos clases, con un `@callback` para el tipo de los oyentes.
8. Completa el `README.md` con cómo ejecutarlo, la salida y:
   - Un **diagrama de secuencia** (`sequenceDiagram` de Mermaid) de lo que ocurre en `salon.medir(31)`.
   - Qué piezas del patrón Observer son `EmisorEventos`, `Termostato` y las funciones de `main.js`, y qué **problema** resuelve el patrón en este programa.
   - Dos sitios del desarrollo web donde reaparece este patrón (temas 9 y siguientes unidades).

## Comprueba tu solución

`npm start` (o `node main.js`) muestra exactamente:

```text
👂 Oyentes de «cambio»: 2 · de «alerta»: 2
🌡️ Mide 22
  📟 Pantalla: 20 → 22 °C
🌡️ Mide 22
🌡️ Mide 31
  📟 Pantalla: 22 → 31 °C
  🚨 SMS al propietario: Salón a 31 °C (máximo 30 °C)
  🔔 Alarma: Salón a 31 °C (máximo 30 °C)
🌡️ Mide 33
  📟 Pantalla: 31 → 33 °C
  🔔 Alarma: Salón a 33 °C (máximo 30 °C)
🌡️ Mide 3
  📟 Pantalla: 33 → 3 °C
  🔔 Alarma: Salón a 3 °C (mínimo 5 °C)
📜 Historial: 22, 31 · temperatura actual: 3 °C
👂 Oyentes de «cambio»: 1 · de «alerta»: 1
📣 emit('desconocido') avisa a 0 oyentes
❌ TypeError: El oyente debe ser una función
```

- La primera línea dice **2** oyentes de `cambio`, aunque `main.js` suscribe `pantalla` dos veces.
- La segunda medición de 22 no muestra nada: no hay cambio.
- El SMS solo aparece la primera vez (`once`) y el historial deja de crecer después de `dejarDeRegistrar()`.
- Si con 31 °C la alarma no suena, o suena dos veces el SMS, revisa cómo recorre `emit` las funciones mientras `once` borra la suya.
- Añade en `main.js` (y quítalo después) un tercer oyente de `alerta` que escriba en la consola: aparece sin cambiar nada en `Termostato.js`. Esa es la ventaja del patrón: cuéntalo en la sección «Un oyente más» del README.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
