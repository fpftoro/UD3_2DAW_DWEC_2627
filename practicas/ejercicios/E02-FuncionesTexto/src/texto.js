/**
 * Biblioteca de funciones para trabajar con textos.
 * Todas son funciones puras: reciben textos y devuelven resultados, sin mostrar nada.
 */

/**
 * Pone en mayúscula la primera letra de un texto. El resto no cambia.
 *
 * @param {string} texto Texto de entrada.
 * @returns {string} El texto con la primera letra en mayúscula, o `''` si está vacío.
 * @example
 * capitalizar('ñandú'); // 'Ñandú'
 */
export function capitalizar(texto) {
  // TODO
  return texto;
}

/**
 * Pone en mayúscula la primera letra de cada palabra y en minúscula el resto.
 * Las palabras están separadas por espacios.
 *
 * @param {string} texto Texto de entrada.
 * @returns {string} El texto con cada palabra capitalizada.
 * @example
 * capitalizarPalabras('el SEÑOR de los anillos'); // 'El Señor De Los Anillos'
 */
export function capitalizarPalabras(texto) {
  // TODO
  return texto;
}

/**
 * Cuenta las palabras de un texto. Los espacios repetidos y los de los extremos no cuentan.
 *
 * @param {string} texto Texto de entrada.
 * @returns {number} Número de palabras (0 si está vacío o solo tiene espacios).
 * @example
 * contarPalabras('  hola   mundo '); // 2
 */
export function contarPalabras(texto) {
  // TODO
  return 0;
}

/**
 * Invierte el orden de los caracteres de un texto.
 *
 * @param {string} texto Texto de entrada.
 * @returns {string} El texto al revés.
 * @example
 * invertir('hola'); // 'aloh'
 */
export function invertir(texto) {
  // TODO
  return texto;
}

/**
 * Indica si un texto se lee igual de izquierda a derecha que al revés,
 * sin tener en cuenta los espacios ni las mayúsculas.
 *
 * @param {string} texto Texto de entrada.
 * @returns {boolean} `true` si es un palíndromo; `false` si no lo es o si no tiene ningún carácter aparte de espacios.
 * @example
 * esPalindromo('Anita lava la tina'); // true
 */
export function esPalindromo(texto) {
  // TODO
  return false;
}

/**
 * Acorta un texto a una longitud máxima, terminándolo con una marca de corte.
 * Si el texto ya cabe, se devuelve igual. Los espacios que queden antes de la marca se quitan.
 *
 * @param {string} texto Texto de entrada.
 * @param {number} maximo Longitud máxima del resultado, marca incluida.
 * @param {string} [final='…'] Marca que se añade al cortar.
 * @returns {string} El texto acortado.
 * @throws {RangeError} Si `maximo` no es un entero mayor que la longitud de `final`.
 * @example
 * truncar('Hola mundo', 6); // 'Hola…'
 */
export function truncar(texto, maximo, final = '…') {
  // TODO
  return texto;
}

/**
 * Crea una función que censura las palabras prohibidas de un texto, sustituyendo cada una
 * por tantos asteriscos como letras tiene. No distingue mayúsculas de minúsculas.
 * Solo se censuran palabras completas separadas por espacios, sin signos de puntuación pegados.
 *
 * @param {...string} prohibidas Palabras prohibidas, en minúsculas.
 * @returns {function(string): string} Función que recibe un texto y lo devuelve censurado.
 * @example
 * const censurar = crearCensurador('feo');
 * censurar('Qué FEO es'); // 'Qué *** es'
 */
export function crearCensurador(...prohibidas) {
  // TODO
  return (texto) => texto;
}

/**
 * Une varios elementos en una enumeración en español: «a, b y c».
 *
 * @param {...string} elementos Elementos que se enumeran.
 * @returns {string} La enumeración, o `''` si no hay elementos.
 * @example
 * unirConY('Ana', 'Luis', 'Eva'); // 'Ana, Luis y Eva'
 */
export function unirConY(...elementos) {
  // TODO
  return '';
}
