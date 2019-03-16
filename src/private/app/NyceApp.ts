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

import { Reducer, Action } from 'redux';
import { Socket } from 'socket.io';

import { App } from '@yourwishes/app-base';
import { ServerModule } from '@yourwishes/app-server';
import { IReactApp, ReactModule } from '@yourwishes/app-react';
import { ISimpleReactApp, SimpleReactModule } from '@yourwishes/app-simple-react';
import { ISocketApp, SocketModule } from '@yourwishes/app-socket';
import { IStoreApp, StoreModule } from '@yourwishes/app-store-module';
import { reduceReducers } from '@yourwishes/app-store';

import { NyceConnection } from './../connection/';
import { NyceCompiler } from './../compiler';
import { NyceModule } from './../module/';
import { NyceServerActions } from './../actions/';
import { NyceServerState } from './../states/';
import { reducer as nyceReducer } from './../reducers/';

export abstract class NyceApp<S, A extends Action> extends App implements
  ISimpleReactApp, ISocketApp, IStoreApp<S & NyceServerState,A | NyceServerActions>
{
  react:ReactModule;
  server:ServerModule;
  simpleReact:SimpleReactModule;

  store:StoreModule<S & NyceServerState,A | NyceServerActions>;
  socket:SocketModule;
  nyce:NyceModule<S,A>;

  constructor() {
    super();

    // Server and React
    this.server = new ServerModule(this);
    this.react = new ReactModule(this);
    this.simpleReact = new SimpleReactModule(this);

    this.socket = new SocketModule(this);
    this.store = new StoreModule(this);
    this.nyce = new NyceModule<S,A>(this);
  }

  async acceptSocket(module:SocketModule, socket:Socket):Promise<NyceConnection> {
    return new NyceConnection(module, socket);
  }

  abstract getNyceReducer():Reducer<S,A>
  getCompiler() { return new NyceCompiler(); }
  getReducer():Reducer<S&NyceServerState, A|NyceServerActions> {
    return reduceReducers<S&NyceServerState, A|NyceServerActions>(
      nyceReducer as any, this.getNyceReducer() as any
    );
  }
}
