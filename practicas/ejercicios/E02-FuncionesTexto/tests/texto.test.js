import { describe, it, expect } from 'vitest';
import { capitalizar } from '../src/texto.js';

describe('capitalizar', () => {
  it('pone en mayúscula la primera letra', () => {
    expect(capitalizar('hola')).toBe('Hola');
  });

  // TODO: añade aquí el resto de tests de capitalizar y un describe por cada función
});
