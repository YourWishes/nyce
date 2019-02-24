// Copyright (c) 2019 Dominic Masters
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { Reducer } from 'redux';
import { Socket } from 'socket.io';
import { App } from '@yourwishes/app-base';
import { IReactApp, ReactModule } from '@yourwishes/app-react';
import { ISocketApp, SocketModule } from '@yourwishes/app-socket';
import { IStoreApp, StoreModule } from '@yourwishes/app-store-module';

import { NyceConnection } from './../connection/';
import { NyceModule } from './../module/';
import { NyceServerActions } from './../actions/';
import { NyceServerState } from './../states/';

export abstract class NyceApp<S extends NyceServerState, A extends NyceServerActions>
  extends App
  implements IReactApp, ISocketApp, IStoreApp<S,A>
{
  store:StoreModule<S,A>;
  socket:SocketModule;
  server:ReactModule;
  nyce:NyceModule;

  constructor() {
    super();

    this.server = new ReactModule(this);
    this.addModule(this.server);

    this.socket = new SocketModule(this);
    this.addModule(this.socket);

    this.store = new StoreModule(this);
    this.addModule(this.store);

    this.nyce = new NyceModule(this);
    this.addModule(this.nyce);
  }

  async acceptSocket(module:SocketModule, socket:Socket):Promise<NyceConnection> {
    return new NyceConnection(module, socket);
  }

  abstract getReducer():Reducer<S,A>;
}
