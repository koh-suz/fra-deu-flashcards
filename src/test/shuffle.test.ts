import { describe, it, expect } from 'vitest';
import { shuffle } from '../utils/shuffle';

describe('shuffle', () => {
  it('returns an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr)).toHaveLength(arr.length);
  });

  it('contains all the same elements', () => {
    const arr = ['a', 'b', 'c'];
    const result = shuffle(arr);
    expect(result).toEqual(expect.arrayContaining(arr));
  });

  it('does not mutate the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });
});
