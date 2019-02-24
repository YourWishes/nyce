import {
  reducer, CommonState, InitialState
} from './../';

describe('reducer', () => {
  it('should return a default value', () => {
    let value;
    expect(() => {
      return value = reducer(undefined,{type:undefined} as any);
    }).not.toThrow();

    expect(value).toBeDefined();
    expect(value).not.toBeNull()
  });

  it('should have the scene reducer', () => {
    expect(reducer(undefined, {type:undefined} as any)).toStrictEqual(InitialState);
  });
});
