import { SetSceneHandler } from './';
import { NyceApp, NyceServerActions, NyceServerState } from './../../';
import { RESPONSE_BAD_REQUEST, RESPONSE_OK } from '@yourwishes/app-api';
import { SocketAPIRequest } from '@yourwishes/app-socket';

class DummyApp extends NyceApp<NyceServerState, NyceServerActions> {
  getReducer() {return null;}
}
const dummyApp = new DummyApp();

describe('onRequest', () => {
  let handler = new SetSceneHandler(dummyApp.socket);

  it('should require a scene param', async () => {
    let request = new SocketAPIRequest(dummyApp.socket, handler.paths[0], {} as any, {
      notScene: 'test'
    });
    await expect( handler.onRequest(request) ).resolves.toHaveProperty('code', RESPONSE_BAD_REQUEST);
    request = new SocketAPIRequest(dummyApp.socket, handler.paths[0], {} as any, {
      scene: '012345689001234568900123456890123'
    });
    await expect( handler.onRequest(request) ).resolves.toHaveProperty('code', RESPONSE_BAD_REQUEST);
  });

  it('should attempt to trigger a setScene', async () => {
    let mockFunc = jest.fn();
    let dummySocket:any = {};
    let request = new SocketAPIRequest(dummyApp.socket, handler.paths[0], dummySocket, {
      scene: 'test'
    });

    request.owner = {
      app: { nyce: { setScene: scene => mockFunc(scene) } }
    } as any;

    await expect(handler.onRequest(request)).resolves;
    expect(mockFunc).toHaveBeenCalledWith('test');
  });
});
