import { sceneReducer } from './SceneReducer';
import { setScene } from './../../actions';

describe('sceneReducer', () => {
  it('should return an initial state', () => {
    let value;

    expect(() => {
      return value = sceneReducer(undefined, { type: undefined } as any);
    }).not.toThrow();

    expect(value).toBeDefined();
    expect(value).not.toBeNull();
  });

  it('should set the scene', () => {
    expect(() => sceneReducer(undefined, setScene('example'))).not.toThrow();
    expect( sceneReducer(undefined, setScene('example')) ).toStrictEqual('example');
    expect( sceneReducer(undefined, setScene('lorem')) ).toStrictEqual('lorem');
  });
});
