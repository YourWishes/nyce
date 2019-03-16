import { getSceneHandle, isValidSceneName, getScenePath } from './';

describe('getSceneHandle', () => {
  it('should return the handle of the scene', () => {
    let x = {
      'Some Scene': 'some-scene',
      'Test':'test',
      'CAPSLOCK': 'capslock',
      '1234': '1234',
      'already-a-handle': 'already-a-handle'
    };
    Object.keys(x).forEach(name => {
      expect(getSceneHandle(name)).toStrictEqual(x[name])
    });
  });
});


describe('isValidSceneName', () => {
  it('should return true if the scene name is valid', () => {
    [
      'Some Scene', 'Some Other Scene', 'Some Third Scene', 'I can use 9mb3r5', 'I can use spaces'
    ].forEach(e => expect(isValidSceneName(e)).toStrictEqual(true) );
  });

  it('should return false if the scene name is invalid', () => {
    [
      'bad-because-lines', 'bad \'cuz I used an apostrophe', '$#!T', '*', '123123!@#!@#!@#'
    ].forEach(e => expect(isValidSceneName(e)).toStrictEqual(false) );
  });
});

describe('getScenePath', () => {
  it('should return the path for a scene', () => {
    let tests = {
      'Some Scene': '/scenes/some-scene',
      'Some Other Scene': '/scenes/some-other-scene',
      'Lorem': '/scenes/lorem',
      'Scene 123': '/scenes/scene-123'
    };

    Object.keys(tests).forEach(name => {
      expect(getScenePath(name)).toStrictEqual(tests[name]);
    });
  });
});
