# E01 · Funciones predefinidas

**Tipo:** autocorrección

Clasifica las funciones predefinidas del lenguaje y úsalas para limpiar, validar y preparar los datos de tres pedidos que llegan de un formulario web.

**CE:** RA4 a

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

El fichero `pedidos.js` contiene los datos de tres formularios. Todos los campos son **textos**, con espacios de más, comas decimales, unidades y valores incorrectos, igual que los escribiría un usuario.

## Requisitos

**Parte 1. Clasificación** (sección «Clasificación» del `README.md`)

1. Completa la tabla de la sección «Clasificación» del `README.md` con estas doce funciones: `parseInt`, `parseFloat`, `Number.isNaN`, `isNaN`, `Number.isFinite`, `Number.isInteger`, `encodeURIComponent`, `decodeURIComponent`, `structuredClone`, `setTimeout`, `Math.round`, `eval`.
2. Columnas: **Función**, **Familia** (global de conversión, global de comprobación, global de URI, global de evaluación, método de un objeto predefinido o función del entorno), **Qué devuelve** (tipo y un caso especial, como `NaN` o `-1`) y **Ejemplo** (una llamada y su resultado, comprobado en la consola).

**Parte 2. Programa** (`pedidos.js`)

Sin escribir funciones propias (eso llega en el tema 2), recorre los formularios con un bucle `for…of` (o `for…of` con `entries()` para numerarlos) y, para cada uno:

3. Guarda una **copia profunda** del formulario antes de modificar nada.
4. **Cliente:** quita los espacios de los extremos.
5. **Cantidad:** extrae el número entero del principio del texto. Es válida si es un entero mayor que 0.
6. **Precio:** cambia la coma decimal por un punto y convierte el texto **entero** en número (si sobra algo, no es un número). Es válido si es un número finito mayor que 0.
7. **Cupón** (porcentaje de descuento): conviértelo en número. Si el resultado es `NaN`, el descuento es 0 y se avisa de que el cupón no es válido.
8. **Total:** si cantidad y precio son válidos, `cantidad × precio × (1 − cupón / 100)`, redondeado a céntimos con `Math.round`. Si no, no se calcula.
9. **Enlace de seguimiento:** `https://envios.example/seguimiento?cliente=…&ciudad=…`, con el cliente (ya limpio) y la ciudad **codificados** para poder ir en una URL.
10. Al final, muestra el cliente del **primer** formulario tal como estaba en la copia, para comprobar que la copia no ha cambiado.
11. Usa en cada paso la función predefinida más adecuada, y **nunca** `isNaN` ni `isFinite` globales: usa las versiones de `Number`.

**Parte 3. Preguntas** (sección «Preguntas» del `README.md`)

12. ¿Por qué el precio se convierte con `Number` y la cantidad con `parseInt`? ¿Qué pasaría con `parseFloat('12,50')`?
13. ¿Por qué `Number('')` no sirve por sí solo para saber si el usuario ha escrito un cupón?
14. ¿Qué parte del enlace del tercer pedido se rompería si no lo codificaras? Pruébalo.

**Entrega.** Completa el `README.md`: cómo ejecutarlo, la salida del programa, la tabla de la clasificación, las respuestas a las preguntas y lo que ves al hacer la comprobación del cupón con espacios (abajo).

## Comprueba tu solución

`npm start` (o `node pedidos.js`) muestra exactamente:

```text
📦 Pedido 1 · Begoña Muñoz
   Cantidad: 3 ✅ · Precio: 12.5 ✅ · Cupón: 10 %
   Total: 33.75 €
   🔗 https://envios.example/seguimiento?cliente=Bego%C3%B1a%20Mu%C3%B1oz&ciudad=A%20Coru%C3%B1a
📦 Pedido 2 · Íñigo Pérez
   Cantidad: NaN ❌ · Precio: 8.99 ✅ · Cupón: 0 %
   Total: no se puede calcular
   🔗 https://envios.example/seguimiento?cliente=%C3%8D%C3%B1igo%20P%C3%A9rez&ciudad=Castell%C3%B3n%20de%20la%20Plana
📦 Pedido 3 · Ana & Luis S.L.
   Cantidad: 12 ✅ · Precio: 100 ✅ · Cupón: 0 % (cupón no válido: "abc")
   Total: 1200.00 €
   🔗 https://envios.example/seguimiento?cliente=Ana%20%26%20Luis%20S.L.&ciudad=Vitoria-Gasteiz
🗂️ Copia del pedido 1 sin modificar: "  Begoña Muñoz "
```

- `'1e2'` es un precio válido: `Number` entiende la notación científica (100). Si te sale `1`, has usado `parseInt`.
- Si en el pedido 3 te sale `cliente=Ana%20&%20Luis…`, has codificado con `encodeURI` en lugar de `encodeURIComponent`.
- Si la última línea muestra `"Begoña Muñoz"` sin espacios, tu copia comparte el objeto con el original: no es una copia.
- Cambia el cupón del pedido 2 por `'   '` (solo espacios): el descuento debe seguir siendo 0 y el programa no debe fallar.
- Tu tabla clasifica `structuredClone` y `setTimeout` como funciones **del entorno**, no de ECMAScript.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
