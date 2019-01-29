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

import { Socket } from 'socket.io';
import { App } from '@yourwishes/app-base';
import { IReactApp, ReactModule } from '@yourwishes/app-react';
import { ISocketApp, SocketModule, SocketConnection } from '@yourwishes/app-socket';
import { NyceConnection } from './../connection/';
import { NyceModule } from './../module/';


export class NyceApp extends App implements IReactApp, ISocketApp {
  socket:SocketModule;
  server:ReactModule;
  nyce:NyceModule;

  constructor() {
    super();

    this.server = new ReactModule(this);
    this.addModule(this.server);

    this.socket = new SocketModule(this);
    this.addModule(this.socket);

    this.nyce = new NyceModule(this);
    this.addModule(this.nyce);
  }

  async acceptSocket(module:SocketModule, socket:Socket):Promise<SocketConnection> {
    return new NyceConnection(module, socket);
  }

  getReducers():object { return {} }
}
