import { NyceApp, NyceModule, reducer as nyceReducer } from './../';

class DummyApp extends NyceApp<any, any> {
  getNyceReducer() { return null; }
}

const dummyApp = new DummyApp();

describe('NyceModule', () => {
  it('should require an app', () => {
    expect(() => new NyceModule(null)).toThrow();
    expect(() => new NyceModule(dummyApp)).not.toThrow();
  });

  it('should require the app to have a server setup', () => {
    let app = new DummyApp();
    delete app.server;
    expect(() => new NyceModule(app)).toThrow();
  });

  it('should require the app to have a socket setup', () => {
    let app = new DummyApp();
    delete app.socket;
    expect(() => new NyceModule(app)).toThrow();
  });

  it('should require the app to have a store setup', () => {
    let app = new DummyApp();
    delete app.store;
    expect(() => new NyceModule(app)).toThrow();
  });
});

describe('loadPackage', () => {
  it('should load the package data', () => {
    expect(new NyceModule(new DummyApp()).package).toHaveProperty('name', '@yourwishes/nyce');
  });
});
