import { stateReducer } from './StateReducer';
import { setState } from './../../actions/';
import { InitialState } from './../../states/';

describe('stateReducer', () => {
  it('should return an initial state', () => {
    let value;

    expect(() => {
      return value = stateReducer(undefined, { type: undefined } as any);
    }).not.toThrow();

    expect(value).toBeDefined();
    expect(value).not.toBeNull();
    expect(value).toStrictEqual(InitialState);
  });

  it('should set the state', () => {
    let dummyState = {...InitialState};
    dummyState['test'] = 'test value';
    expect(() => stateReducer(undefined, setState(dummyState))).not.toThrow();
    expect( stateReducer(undefined, setState(dummyState)) ).toStrictEqual(dummyState);
    expect( stateReducer(undefined, setState(dummyState)) ).toHaveProperty('test', 'test value');
  });
});
