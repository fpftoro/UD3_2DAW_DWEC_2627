// E04 · Funciones del catálogo escritas con bucles. Reescríbelas con operaciones agregadas.

/**
 * @typedef {object} Producto
 * @property {string} codigo
 * @property {string} nombre
 * @property {string} categoria
 * @property {number} precio
 * @property {number} stock
 * @property {string[]} etiquetas
 */

/**
 * Nombres de los productos en mayúsculas.
 * @param {Producto[]} productos
 * @returns {string[]}
 */
export function nombresEnMayusculas(productos) {
  const resultado = [];
  for (const producto of productos) {
    resultado.push(producto.nombre.toUpperCase());
  }
  return resultado;
}

/**
 * Productos con el precio rebajado un porcentaje, redondeado a céntimos.
 * @param {Producto[]} productos
 * @param {number} porcentaje
 * @returns {Producto[]}
 */
export function aplicarRebaja(productos, porcentaje) {
  for (const producto of productos) {
    producto.precio = Math.round(producto.precio * (1 - porcentaje / 100) * 100) / 100;
  }
  return productos;
}

/**
 * Valor del inventario: suma de precio × stock de todos los productos.
 * @param {Producto[]} productos
 * @returns {number}
 */
export function valorInventario(productos) {
  let total = 0;
  for (const producto of productos) {
    total += producto.precio * producto.stock;
  }
  return total;
}

/**
 * Nombres de los n productos más caros, de mayor a menor precio.
 * @param {Producto[]} productos
 * @param {number} n
 * @returns {string[]}
 */
export function masCaros(productos, n) {
  productos.sort((a, b) => b.precio - a.precio);
  const nombres = [];
  for (let i = 0; i < n; i++) {
    nombres.push(productos[i].nombre);
  }
  return nombres;
}

/**
 * Producto con un código, o undefined si no existe.
 * @param {Producto[]} productos
 * @param {string} codigo
 * @returns {Producto|undefined}
 */
export function buscarPorCodigo(productos, codigo) {
  let encontrado;
  for (const producto of productos) {
    if (producto.codigo === codigo) {
      encontrado = producto;
      break;
    }
  }
  return encontrado;
}

/**
 * Productos con stock.
 * @param {Producto[]} productos
 * @returns {Producto[]}
 */
export function disponibles(productos) {
  const resultado = [];
  for (const producto of productos) {
    if (producto.stock > 0) {
      resultado.push(producto);
    }
  }
  return resultado;
}

/**
 * Número de productos de cada categoría.
 * @param {Producto[]} productos
 * @returns {Object<string, number>}
 */
export function contarPorCategoria(productos) {
  const cuenta = {};
  for (const producto of productos) {
    if (cuenta[producto.categoria] === undefined) {
      cuenta[producto.categoria] = 0;
    }
    cuenta[producto.categoria]++;
  }
  return cuenta;
}

/**
 * Indica si algún producto está agotado.
 * @param {Producto[]} productos
 * @returns {boolean}
 */
export function hayAgotados(productos) {
  let agotado = false;
  for (const producto of productos) {
    if (producto.stock === 0) {
      agotado = true;
      break;
    }
  }
  return agotado;
}

/**
 * Indica si todos los productos tienen un precio mayor que 0.
 * @param {Producto[]} productos
 * @returns {boolean}
 */
export function todosConPrecio(productos) {
  for (const producto of productos) {
    if (!(producto.precio > 0)) {
      return false;
    }
  }
  return true;
}

/**
 * Etiquetas de todos los productos, sin repetir y en orden alfabético.
 * @param {Producto[]} productos
 * @returns {string[]}
 */
export function etiquetasDistintas(productos) {
  const etiquetas = [];
  for (const producto of productos) {
    for (const etiqueta of producto.etiquetas) {
      if (!etiquetas.includes(etiqueta)) {
        etiquetas.push(etiqueta);
      }
    }
  }
  return etiquetas.sort();
}
