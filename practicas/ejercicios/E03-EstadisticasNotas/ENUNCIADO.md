# E03 · Estadísticas de notas

**Tipo:** autocorrección

Calcula las estadísticas de una clase a partir de un array de alumnos usando solo operaciones agregadas: medias, aprobados, ranking, grupos y búsquedas.

**CE:** RA4 d, e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

- `datos.js` exporta el array `alumnos`: cada alumno tiene `nombre`, `grupo` y un array `notas` (que puede estar vacío). **No lo modifiques.**
- `estadisticas.js` lo importa. Ahí va tu programa.

## Requisitos

Programa `estadisticas.js` **sin bucles `for`, `while` ni `for…of`**: solo operaciones agregadas. Puedes usar `forEach` únicamente para mostrar resultados.

1. Escribe dos funciones flecha auxiliares: `redondear(numero)` (a dos decimales) y `media(numeros)`, que devuelve la media redondeada o `null` si el array está vacío. Usa `reduce` con su valor inicial.
2. **Transformación:** crea `medias`, un array **nuevo** con un objeto `{ nombre, grupo, media }` por alumno, y muéstralo.
3. **Filtrado:** los nombres de los aprobados (media de 5 o más).
4. **Reducción:** el alumno con la mejor media.
5. **Aplanar:** la nota más alta y la más baja de toda la clase, a partir de un único array con todas las notas.
6. **Comprobaciones:** si alguien tiene algún 10 y si todos los alumnos tienen notas.
7. **Ordenación sin mutar:** el ranking de medias de mayor a menor (sin los alumnos sin notas). A igual media, por orden alfabético.
8. **Recolección:** agrupa a los alumnos por grupo y muestra, para cada grupo, cuántos alumnos tiene y la media de **todas** las notas del grupo.
9. **Búsquedas:** el primer alumno suspendido y la posición de Pablo en la lista.
10. **Matriz:** crea una tabla (array de arrays) con una fila por alumno: su nombre seguido de sus notas. Saca la tercera fila con **desestructuración** y muestra su segunda nota.
11. Al final, comprueba que el array `alumnos` sigue en su orden original.

**Entrega.** Completa el `README.md`: cómo ejecutarlo, la salida, las operaciones agregadas de cada requisito y tu razonamiento sobre `toSorted` y `sort` (abajo).

## Comprueba tu solución

`npm start` (o `node estadisticas.js`) muestra exactamente:

```text
📋 Medias:
  Ana (A): 8.17
  Luis (B): 4.17
  Marta (A): 9.50
  Pablo (B): 6.50
  Sara (A): 4.00
  Íñigo (B): sin notas
✅ Aprobados: Ana, Marta, Pablo
🏆 Mejor media: Marta (9.50)
📈 Nota más alta: 10 · más baja: 3
❓ ¿Algún 10? true · ¿Todos tienen notas? false
🥇 Ranking:
  1. Marta 9.50
  2. Ana 8.17
  3. Pablo 6.50
  4. Luis 4.17
  5. Sara 4.00
👥 Grupo A: 3 alumnos · media de sus notas 7.22
👥 Grupo B: 3 alumnos · media de sus notas 5.33
🔎 Primer suspenso: Luis · posición de Pablo: 3
🧮 Tabla: Marta → 2.ª nota 9.5 · filas: 6
🗂️ Lista original intacta: Ana, Luis, Marta, Pablo, Sara, Íñigo
```

- Busca en tu código las palabras `for` y `while`: no debe aparecer ninguna.
- Si la media del grupo B te sale `5.34`, estás haciendo la media de las medias de los alumnos (redondeadas), no la de todas sus notas.
- Si Íñigo te hace fallar alguna línea (`NaN`, `Cannot read properties of null`), te falta tener en cuenta el alumno sin notas en la media, el mejor alumno o el ranking.
- Cambia temporalmente `toSorted` por `sort` en el ranking: ¿cambia alguna línea de la salida? Razona por qué en la sección «`toSorted` frente a `sort`» del README y vuelve a `toSorted`.
- Si `Math.max(todas)` te da `NaN`, te falta el operador _spread_.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
