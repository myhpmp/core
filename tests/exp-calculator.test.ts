import { describe, it, expect } from 'vitest';
import { calcTokenExp, calcSessionExp, DAILY_SESSION_CAP } from '../src/exp-calculator.js';

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

describe('calcSessionExp', () => {
  it('returns 25 EXP with no daily count', () => {
    expect(calcSessionExp()).toBe(25);
  });

  it('returns 25 EXP when under daily cap', () => {
    expect(calcSessionExp(0)).toBe(25);
    expect(calcSessionExp(15)).toBe(25);
    expect(calcSessionExp(29)).toBe(25);
  });

  it('returns 0 EXP when at daily cap', () => {
    expect(calcSessionExp(30)).toBe(0);
  });

  it('returns 0 EXP when over daily cap', () => {
    expect(calcSessionExp(50)).toBe(0);
    expect(calcSessionExp(100)).toBe(0);
  });

  it('has DAILY_SESSION_CAP of 30', () => {
    expect(DAILY_SESSION_CAP).toBe(30);
  });
});
