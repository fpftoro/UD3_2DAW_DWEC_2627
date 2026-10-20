# E02 · Biblioteca de funciones de texto

**Tipo:** autocorrección

Programa una pequeña biblioteca de funciones para trabajar con textos y escribe tus propios tests con Vitest, como en la UD2, para comprobar que funcionan.

**CE:** RA4 b, k

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/`. Como los ejercicios de la UD2 con dependencias de npm, **construye su imagen** con el `Dockerfile` de esa carpeta, a partir de la imagen oficial de Node.js de **Docker Hub**, `node:24-bookworm` (UD2, tema 9, apartado 9.3.2). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda algo más, porque descarga la imagen y la construye. Al crearse, el contenedor ejecuta `npm install`: cuando se abre, las dependencias ya están instaladas.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

```text
├── package.json        ← scripts start, test, lint, format y format:check
├── eslint.config.js
├── .prettierrc
├── src/
│   ├── texto.js        ← ocho funciones con su JSDoc, sin programar
│   └── main.js         ← demostración de la biblioteca (no se modifica)
└── tests/
    └── texto.test.js   ← un primer test de ejemplo
└── README.md           ← tu entrega
```

## Requisitos

**Funciones** (`src/texto.js`): programa las ocho funciones según su JSDoc.

1. `capitalizar(texto)`, `capitalizarPalabras(texto)`, `contarPalabras(texto)` e `invertir(texto)`.
2. `esPalindromo(texto)`: **reutiliza** `invertir` en lugar de repetir su código.
3. `capitalizarPalabras(texto)`: **reutiliza** `capitalizar` dentro de un `map`.
4. `truncar(texto, maximo, final = '…')`: con su **parámetro por defecto**. Lanza un `RangeError` si `maximo` no es válido.
5. `crearCensurador(...prohibidas)`: recibe las palabras con un **parámetro _rest_** y **devuelve una función** (un **closure** que recuerda las palabras).
6. `unirConY(...elementos)`: con un **parámetro _rest_**.
7. Todas son **funciones puras**: no muestran nada por consola ni modifican lo que reciben. Mantén el JSDoc de cada una.

**Tests** (`tests/texto.test.js`), con lo que ya sabes de la UD2 (tema 9: `describe`, `it`, `expect` y `toBe`):

8. Un `describe` por función, con **al menos dos tests** cada una (16 como mínimo).
9. Cada función tiene al menos un **caso límite**: texto vacío, solo espacios, longitud justa, un solo elemento…
10. Al menos un test comprueba que dos censuradores creados con palabras distintas **no se mezclan**: es la prueba de que el closure funciona.
11. Los nombres de los tests describen el comportamiento: «devuelve 0 si el texto solo tiene espacios», no «test 3».

**Calidad**:

12. `npm run lint` sin errores y código formateado (`npm run format`).

**Entrega.** Completa el `README.md`: cómo ejecutarlo, la salida de `npm start`, la salida de `npm test` con el caso límite de cada `describe`, qué test falla con cada cambio de «Comprueba tu solución» y la salida de ESLint y Prettier.

> 📝 **Nota del Profesor**: Prueba a escribir primero los tests de una función a partir de su JSDoc, comprobar que fallan y programarla después: es el **desarrollo guiado por pruebas** (TDD), que verás en el tema 10. Allí verás también `toThrow`, para comprobar que una función lanza un error: cuando llegues, vuelve a este ejercicio y añade el test del `RangeError` de `truncar`.

## Comprueba tu solución

- `npm start` muestra exactamente:

  ```text
  1. Ñandú
  2. El Señor De Los Anillos
  3. 3 palabras
  4. 5202 CEWD
  5. true · false
  6. Desarrollo web…
  7. Desarrollo we...
  8. No seas ***** que eso es ***
  9. Ana · Ana y Luis · Ana, Luis y Eva
  10. ❌ RangeError: Longitud máxima no válida: 0
  ```

- `npm test` termina con todos los tests en verde y al menos 16 tests.
- **Tus tests detectan errores**: cambia `truncar` para que no quite el espacio final (`trimEnd`) y comprueba que algún test falla. Haz lo mismo quitando el `.toLowerCase()` del censurador. Después, deshaz los cambios.
- `truncar('Hola', 4)` devuelve `'Hola'` (cabe justo) y `truncar('abcdefghij', 5)` devuelve un texto de **5** caracteres.
- `esPalindromo('   ')` devuelve `false` e `invertir('ab😀')` devuelve `'😀ba'`, con el emoji intacto.
- Dos censuradores creados con palabras distintas no se mezclan: cada uno recuerda las suyas.
- `npm run lint` no muestra errores y `npm run format:check` dice `All matched files use Prettier code style!`.

## Integración continua (opcional)

> 📝 Este apartado es **opcional** y no cuenta para la corrección. Hazlo si en clase habéis visto GitHub Actions; si no, sáltatelo.

Sube el proyecto a un repositorio tuyo de GitHub (el `.gitignore` ya deja fuera `node_modules/`). Escribe un *workflow* de GitHub Actions que pase **todas las comprobaciones del proyecto** cada vez que subas cambios. Es como el de la UD2, con una mejora: las dependencias se instalan con **`npm ci`** a partir de `package-lock.json`, el fichero que anota la versión exacta de cada paquete instalado. Así la integración continua usa las mismas versiones que tu contenedor, y con la caché de npm la instalación es más rápida. Escríbelo tú, en `.github/workflows/ci.yml`, con estas orientaciones:

- Se ejecuta con cada `push` y cada *pull request* a la rama `main`.
- Tiene un único trabajo (*job*) que se ejecuta en `ubuntu-latest`.
- Sus pasos, en este orden, cada uno con un nombre (`name`) en español que diga qué hace:
  1. Descargar el código, con la acción `actions/checkout@v7`.
  2. Instalar Node.js 24 con la caché de npm, con la acción `actions/setup-node@v7`, `node-version: 24` y `cache: npm`.
  3. Instalar las dependencias con `npm ci`.
  4. Revisar el código con ESLint: `npm run lint`.
  5. Comprobar el formato con Prettier: `npm run format:check`.
  6. Ejecutar los tests: `npm test`.
- Sube también `package-lock.json`: lo creó `npm install` al abrir el contenedor. Sin él, `npm ci` falla. Si añades o actualizas una dependencia, vuelve a subirlo.
- Prettier también revisa el formato de `ci.yml`: ejecuta `npm run format` antes de subirlo.

Compruébalo:

1. Sube los cambios y abre la pestaña **Actions** del repositorio: la ejecución debe salir en verde, con los seis pasos.
2. Rompe algo a propósito (por ejemplo, cambia el valor esperado de un test), sube el cambio y comprueba que la ejecución sale en rojo en el paso que corresponde. Después, deshaz el cambio y comprueba que vuelve a verde.

Deja constancia en la sección «Integración continua (opcional)» del `README.md`: el enlace a la ejecución en verde y dos capturas en `img/`, una de la ejecución en verde con sus pasos y otra de la ejecución en rojo con el paso que falla.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen que ha construido el `Dockerfile` tampoco se borra (se llama `vsc-` seguido del nombre de la carpeta), así que la próxima vez no hace falta construirla de nuevo. Si necesitas espacio, bórrala desde la pestaña **Images** de Docker Desktop o con `docker image rm <nombre>`.
