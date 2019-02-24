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

import { Module } from '@yourwishes/app-base';
import { RESPONSE_OK } from '@yourwishes/app-api';
import { NyceApp } from './../app/NyceApp';
import { NyceServerActions} from './../actions/';
import { NyceServerState } from './../states/';
import { reducer as nyceReducer } from './../reducers/';

import { SetSceneHandler } from './../api/';

import * as Actions from './../actions/';

export class NyceModule extends Module {
  app:NyceApp<NyceServerState,NyceServerActions>;

  constructor(app:NyceApp<any,any>) {
    super(app);

    if(!app.server) throw new Error("Ensure Server has been setup before initializing Nyce");
    if(!app.socket) throw new Error("Ensure Socket Server has been setup before initializing Nyce");
    if(!app.store) throw new Error("Ensure Store module has been setup before initializing Nyce");
    this.app = app;

    //Setup the Nyce Reducer
    app.store.addReducer(nyceReducer);

    //Add our API Routes
    [
      SetSceneHandler
    ].forEach(e => app.socket.addHandler(new e(app.socket)));
  }

  setScene(scene:string) {
    this.app.store.store.dispatch(Actions.setScene(scene));
    this.app.socket.sockets.forEach(e => e.send({ code: RESPONSE_OK, data: { scene }, path: '/scene/set' }));
  }

  async init():Promise<void> {

  }
}
