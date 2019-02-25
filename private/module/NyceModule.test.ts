import { NyceApp, NyceModule, reducer as nyceReducer } from './../';

class DummyApp extends NyceApp<any, any> {
  getReducer() { return null; }
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

  it('should setup the nyce reducer', () => {
    let app = new DummyApp();
    expect(() => new NyceModule(app)).not.toThrow();
    expect(app.store.reducers).toContain(nyceReducer);
  });
});