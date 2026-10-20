# E05 · Gestor de tareas con Map y Set

**Tipo:** autocorrección

Programa un gestor de tareas que guarda las tareas en un `Map` y sus etiquetas en un `Set`, y que responde a consultas con operaciones agregadas.

**CE:** RA4 c, e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

- `gestor.js` exporta `crearGestorTareas()`, una **función fábrica** que devuelve un objeto con ocho funciones, documentadas con JSDoc pero sin programar.
- `main.js` crea un gestor y lo usa. **No lo modifiques.**

## Requisitos

1. Guarda el **estado** del gestor dentro de `crearGestorTareas`, en el **closure** (tema 2): un `Map` de id → tarea y el siguiente id. Nadie de fuera puede acceder a las tareas directamente.
2. Cada tarea es un objeto `{ id, titulo, etiquetas, hecha }` donde `etiquetas` es un **`Set`**.
3. `anadir(titulo, ...etiquetas)`: quita los espacios del título, lanza un `Error` con el mensaje `El título no puede estar vacío` si queda vacío, asigna ids consecutivos desde 1 y devuelve el id.
4. `completar(id)` y `eliminar(id)`: devuelven `true` o `false` según el JSDoc. Usa los métodos del `Map` (`get`, `has`, `delete`) en lugar de recorrerlo.
5. `pendientes()`, `porEtiqueta(etiqueta)`, `etiquetasUsadas()`, `contarPorEtiqueta()` y `resumen()`: con **operaciones agregadas** sobre las tareas (convierte el `Map` en array cuando lo necesites). `contarPorEtiqueta` devuelve un **`Map`**.
6. `etiquetasUsadas()` no repite etiquetas (usa un `Set`) y las ordena con `localeCompare`.
7. Sin bucles `for`, `while` ni `for…of` en `gestor.js`.
8. Añade al principio de `gestor.js` un comentario que explique **por qué** las tareas se guardan en un `Map` y no en un array o en un objeto, y **por qué** las etiquetas son un `Set`.

**Entrega.** Completa el `README.md`: cómo ejecutarlo, la salida y las dos comprobaciones de su sección «Comprobaciones» (la etiqueta `Álgebra` y el estado privado).

## Comprueba tu solución

`npm start` (o `node main.js`) muestra exactamente:

```text
📝 Tareas creadas: 4
✅ Completar la 2: true · otra vez: false · la 9: false
⏳ Pendientes: Estudiar closures, Comprar pan, Repasar Map y Set
🏷️ Con «estudio»: Estudiar closures, Repasar Map y Set
🏷️ Etiquetas usadas: casa, dwec, entrega, estudio
🔢 Tareas por etiqueta: dwec → 3 · estudio → 2 · entrega → 1 · casa → 1
🗑️ Eliminar la 3: true · otra vez: false
📊 Resumen: {"total":3,"hechas":1,"pendientes":2}
❌ El título no puede estar vacío
👥 Otro gestor: 0 tareas
🔒 Acceso directo a las tareas: undefined
```

- Si `dwec` cuenta 4 en lugar de 3, la tarea «Entregar E04» guarda dos veces la etiqueta `dwec`: no estás usando un `Set`.
- Si «Otro gestor» tiene tareas, el `Map` está declarado fuera de `crearGestorTareas` y todos los gestores lo comparten.
- Si la última línea no es `undefined`, has expuesto las tareas en el objeto devuelto.
- Prueba a añadir una tarea con la etiqueta `Álgebra`: en `etiquetasUsadas` debe salir la **primera**, no al final.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
