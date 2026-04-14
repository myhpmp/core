import { describe, it, expect } from 'vitest';
import { calcTokenExp } from '../src/exp-calculator.js';

describe('calcTokenExp', () => {
  it('returns 0 for 0 tokens', () => {
    expect(calcTokenExp(0)).toBe(0);
  });

  it('returns floor of tokens/1000', () => {
    expect(calcTokenExp(1500)).toBe(1);
    expect(calcTokenExp(5000)).toBe(5);
  });

  it('returns 0 for negative tokens', () => {
    expect(calcTokenExp(-500)).toBe(0);
  });

  it('returns 0 for NaN', () => {
    expect(calcTokenExp(NaN)).toBe(0);
  });

  it('returns 0 for Infinity', () => {
    expect(calcTokenExp(Infinity)).toBe(0);
    expect(calcTokenExp(-Infinity)).toBe(0);
  });
});
