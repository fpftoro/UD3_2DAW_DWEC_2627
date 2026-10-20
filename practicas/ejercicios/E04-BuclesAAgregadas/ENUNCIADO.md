# E04 · De bucles a operaciones agregadas

**Tipo:** autocorrección

Reescribe con operaciones agregadas diez funciones de un catálogo escritas con bucles y corrige, de paso, las dos que modifican los datos que reciben.

**CE:** RA4 c, e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

```text
├── package.json
├── datos.js        ← el array productos (no se modifica)
├── catalogo.js     ← diez funciones escritas con bucles
├── main.js         ← llama a las diez funciones y muestra los resultados (no se modifica)
└── README.md       ← tu entrega
```

Ejecuta `npm start` antes de cambiar nada y **pega la salida** en la sección «Salida original» del `README.md`: algunas líneas son incorrectas, aunque cada función, probada por separado, parece funcionar.

## Requisitos

1. Reescribe las diez funciones de `catalogo.js` **sin bucles** (`for`, `while`, `for…of`, `forEach` con `push`): cada una con la operación agregada que corresponde a su patrón.
2. Ninguna función puede **modificar** el array ni los objetos que recibe. Dos de las originales lo hacen: encuéntralas y corrígelas con los métodos que no mutan (tema 3) y con el operador _spread_.
3. No cambies el **nombre**, los **parámetros** ni lo que **devuelve** cada función. Mantén su JSDoc.
4. `etiquetasDistintas` debe usar un `Set` para quitar los repetidos (tema 5) y ordenar con `localeCompare`.
5. Completa el `README.md`:
   - En «Comparativa», una tabla con una fila por función y las columnas **Función**, **Patrón del bucle** (acumulador, búsqueda, filtrar…), **Operación agregada**, **Tipo** (filtrado, transformación, reducción o recolección) y **¿El original mutaba?**.
   - En «Qué cambiaba en la salida», qué líneas de la salida original eran incorrectas y **por qué** (relaciónalo con el paso por referencia).
   - En «Qué versión se lee mejor», en qué función te parece que el bucle se leía mejor que la operación agregada, si en alguna.
   - Cómo ejecutarlo y la salida con tus cambios.

## Comprueba tu solución

Con tus cambios, `npm start` muestra exactamente:

```text
1. TECLADO, RATÓN, MONITOR, CABLE HDMI, PORTÁTIL
2. Rebajas: Teclado 22.50 · Ratón 10.80 · Monitor 162.00 · Cable HDMI 7.20 · Portátil 585.00
3. Valor del inventario: 1230.00 €
4. Los dos más caros: Portátil, Monitor
5. P3: Monitor · P9: no existe
6. Disponibles: Teclado, Monitor, Cable HDMI, Portátil
7. Por categoría: {"periféricos":2,"pantallas":1,"cables":1,"ordenadores":1}
8. ¿Agotados? true · ¿Todos con precio? true
9. Etiquetas: hdmi, inalámbrico, oficina, usb
10. Orden original: P1, P2, P3, P4, P5 · precio de P1: 25
```

- La salida original tenía **cuatro** líneas distintas de estas. Tu `README.md` explica las cuatro.
- Busca `for`, `while` y `push` en `catalogo.js`: no debe aparecer ninguno.
- Busca `sort(` sin `to` delante: si aparece, comprueba que se aplica a un array **nuevo**, no al recibido.
- Si la línea 3 sigue saliendo 1107.00 €, `aplicarRebaja` sigue modificando los productos: `map` crea un array nuevo, pero si dentro cambias `p.precio`, los objetos son los mismos.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
