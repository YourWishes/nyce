import { sceneReducer } from './SceneReducer';
import { setScene } from './../../actions';
import { InitialSceneState } from './../../states/';

describe('sceneReducer', () => {
  it('should return an initial state', () => {
    let value;

    expect(() => {
      return value = sceneReducer(undefined, { type: undefined } as any);
    }).not.toThrow();

    expect(value).toBeDefined();
    expect(value).not.toBeNull();
    expect(value).toStrictEqual(InitialSceneState);
  });

  it('should set the scene', () => {
    expect(() => sceneReducer(undefined, setScene('example'))).not.toThrow();
    expect( sceneReducer(undefined, setScene('example')) ).toStrictEqual('example');
    expect( sceneReducer(undefined, setScene('lorem')) ).toStrictEqual('lorem');
  });
});
