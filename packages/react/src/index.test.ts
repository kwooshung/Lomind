import { describe, it, expect } from 'vitest';
import slice from './';

describe('slice function', () => {
  it('slices an array', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice(array, 1, 3)).toEqual([2, 3]);
  });

  it('handles negative start', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice(array, -2)).toEqual([4, 5]);
  });

  it('handles negative end', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice(array, 1, -1)).toEqual([2, 3, 4]);
  });

  it('returns empty array for invalid range', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice(array, 3, 2)).toEqual([]);
  });

  it('handles null array', () => {
    expect(slice(null, 1, 3)).toEqual([]);
  });
});
