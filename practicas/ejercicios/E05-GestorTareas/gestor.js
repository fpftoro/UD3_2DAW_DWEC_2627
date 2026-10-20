// E05 · Gestor de tareas con Map y Set

/**
 * @typedef {object} Tarea
 * @property {number} id Identificador, consecutivo desde 1.
 * @property {string} titulo Título sin espacios en los extremos.
 * @property {Set<string>} etiquetas Etiquetas de la tarea, sin repetir.
 * @property {boolean} hecha Si está completada.
 */

/**
 * @typedef {object} Resumen
 * @property {number} total Número de tareas.
 * @property {number} hechas Tareas completadas.
 * @property {number} pendientes Tareas sin completar.
 */

/**
 * Crea un gestor de tareas. Cada gestor tiene sus propias tareas, a las que solo se accede
 * a través de sus funciones.
 *
 * @returns {{
 *   anadir: (titulo: string, ...etiquetas: string[]) => number,
 *   completar: (id: number) => boolean,
 *   eliminar: (id: number) => boolean,
 *   pendientes: () => string[],
 *   porEtiqueta: (etiqueta: string) => string[],
 *   etiquetasUsadas: () => string[],
 *   contarPorEtiqueta: () => Map<string, number>,
 *   resumen: () => Resumen
 * }}
 */
export function crearGestorTareas() {
  // TODO: el estado del gestor (las tareas y el siguiente id) va aquí, en el closure

  return {
    /**
     * Añade una tarea. Las etiquetas repetidas se guardan una sola vez.
     * @param {string} titulo Título de la tarea; se quitan los espacios de los extremos.
     * @param {...string} etiquetas Etiquetas de la tarea.
     * @returns {number} El id de la tarea nueva.
     * @throws {Error} Si el título está vacío o solo tiene espacios.
     */
    anadir: (titulo, ...etiquetas) => 0,

    /**
     * Marca una tarea como hecha.
     * @param {number} id
     * @returns {boolean} `true` si existía y estaba pendiente; `false` en otro caso.
     */
    completar: (id) => false,

    /**
     * Elimina una tarea.
     * @param {number} id
     * @returns {boolean} `true` si existía.
     */
    eliminar: (id) => false,

    /**
     * Títulos de las tareas pendientes, en el orden en que se añadieron.
     * @returns {string[]}
     */
    pendientes: () => [],

    /**
     * Títulos de las tareas que tienen una etiqueta.
     * @param {string} etiqueta
     * @returns {string[]}
     */
    porEtiqueta: (etiqueta) => [],

    /**
     * Todas las etiquetas usadas, sin repetir y en orden alfabético.
     * @returns {string[]}
     */
    etiquetasUsadas: () => [],

    /**
     * Número de tareas de cada etiqueta, en el orden en que apareció cada etiqueta por primera vez.
     * @returns {Map<string, number>}
     */
    contarPorEtiqueta: () => new Map(),

    /**
     * Totales del gestor.
     * @returns {Resumen}
     */
    resumen: () => ({ total: 0, hechas: 0, pendientes: 0 }),
  };
}
