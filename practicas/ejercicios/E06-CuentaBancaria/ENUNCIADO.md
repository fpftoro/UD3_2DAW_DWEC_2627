# E06 · Cuenta bancaria

**Tipo:** autocorrección

Define una clase `CuentaBancaria` que protege su saldo con campos privados y solo lo modifica a través de sus métodos, y úsala desde un programa principal.

**CE:** RA4 g, h, i

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

- `CuentaBancaria.js`: vacío. Ahí va la clase.
- `main.js`: crea dos cuentas, opera con ellas y comprueba que la clase se protege. **No lo modifiques.**

## Requisitos

Exporta desde `CuentaBancaria.js` la clase `CuentaBancaria` con este contrato:

| Miembro | Tipo | Comportamiento |
|---------|------|----------------|
| `constructor(titular, saldoInicial = 0)` | Constructor | Quita los espacios del titular. Lanza `Error('El titular no puede estar vacío')` si queda vacío y `RangeError('Saldo inicial no válido: …')` si el saldo es negativo o no es un número. Si el saldo inicial es mayor que 0, lo anota como movimiento `apertura` |
| `numero` | Propiedad pública | `ES-DWEC-0001`, `ES-DWEC-0002`…: un número consecutivo de cuatro cifras. Una cuenta que no llega a crearse **no** gasta número |
| `titular` | Propiedad pública | Nombre sin espacios en los extremos |
| `#saldo`, `#movimientos` | Campos **privados** | El saldo y la lista de movimientos `{ tipo, importe, saldo }` |
| `saldo` | _Getter_ | Devuelve el saldo. **Sin** _setter_: no se puede asignar |
| `movimientos` | _Getter_ | Devuelve una **copia** de los movimientos: modificarla no cambia la cuenta |
| `ingresar(importe)` | Método | Suma el importe, anota `ingreso` y devuelve el saldo nuevo |
| `retirar(importe)` | Método | Resta el importe, anota `retirada` y devuelve el saldo nuevo. Lanza `Error('Saldo insuficiente: X € disponibles')` si no alcanza |
| `transferir(destino, importe)` | Método | Pasa el importe a otra cuenta. Lanza `TypeError('El destino debe ser una CuentaBancaria')` si `destino` no lo es. Anota `transferencia a <número>` en el origen y `transferencia de <número>` en el destino |
| `toString()` | Método | `ES-DWEC-0001 · Ana López · 79.50 €` |
| `CuentaBancaria.totalCuentas` | _Getter_ **estático** | Número de cuentas abiertas |
| `CuentaBancaria.PREFIJO` | Campo estático | `'ES-DWEC-'` |

Además:

1. Los tres métodos que mueven dinero lanzan `RangeError('Importe no válido: …')` si el importe no es un número mayor que 0. Esa comprobación está en **un método privado** (`#validarImporte`), no repetida en cada método.
2. El saldo solo cambia en **un único método privado** que también anota el movimiento. Redondea a céntimos.
3. Documenta la clase con JSDoc: la clase con un `@example`, el constructor, cada método público con `@param`, `@returns` y `@throws`, y los _getters_ con `@type`.

**Entrega.** Completa el `README.md`: cómo ejecutarlo, la salida y las dos preguntas sobre los campos privados de las dos últimas comprobaciones (abajo).

## Comprueba tu solución

`npm start` (o `node main.js`) muestra exactamente:

```text
🏦 ES-DWEC-0001 · Ana López · 79.50 €
🏦 ES-DWEC-0002 · Luis Pérez · 50.50 €
❌ Retirar 500 de Ana: Error · Saldo insuficiente: 79.50 € disponibles
❌ Ingresar -5 en Ana: RangeError · Importe no válido: -5
❌ Transferir a un texto: TypeError · El destino debe ser una CuentaBancaria
❌ Abrir una cuenta sin titular: Error · El titular no puede estar vacío
❌ Cambiar el saldo a mano: TypeError · saldo: 79.50 €
📄 Extracto de Ana:
   apertura                           100.00 € →   100.00 €
   ingreso                             50.00 € →   150.00 €
   transferencia a ES-DWEC-0002       -70.50 € →    79.50 €
🔢 Cuentas abiertas: 2
🔑 Propiedades públicas: numero, titular
```

- `Object.keys(ana)` solo muestra `numero` y `titular`: el saldo y los movimientos son privados.
- La línea «Cambiar el saldo a mano» da un `TypeError`, porque `saldo` solo tiene _getter_, y el saldo sigue en 79.50 €.
- El extracto de Ana tiene **tres** movimientos: la «trampa» que `main.js` añade a la copia no aparece.
- Si «Cuentas abiertas» sale 3, la cuenta sin titular ha gastado un número: asígnalo después de validar.
- Si intentas escribir `ana.#saldo` en `main.js`, obtienes un `SyntaxError` antes de que se ejecute nada. Pruébalo, pega el error en el README y quítalo.
- En el método `transferir`, ¿puedes usar `destino.#saldo` o un método privado de `destino`? Pruébalo y explica por qué en el README.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
