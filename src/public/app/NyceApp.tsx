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

import './../styles/NyceStyles.scss';

import * as React from 'react';
import { Reducer, Action } from 'redux';
import { App, Router, Route } from '@yourwishes/app-simple-react/dist/public';
import { StoreListener, reduceReducers } from '@yourwishes/app-store';

import { LoadingPage } from './../admin/loading';
import { NyceSocketConnection } from './../socket/NyceSocketConnection';
import { NycePublicState } from './../states/';
import { NycePublicActions } from './../actions/';
import { ReceiveSceneHandler, ReceiveStateHandler } from './../api/';
import { reducer as nyceReducer } from './../reducers/';
import { getScenePath } from './../scene';

export abstract class NyceApp<S, A extends Action> extends
  App<S & NycePublicState, A | NycePublicActions> implements
  StoreListener<S & NycePublicState>
{
  socket:NyceSocketConnection<S,A>;

  constructor() {
    super('nyce');//For 'nyce', refer to NyceCompiler.ts in private/compiler..

    //Setup state listeners
    this.store.addStateChangeListener('scene', this);

    //Setup Socket Connection
    this.socket = new NyceSocketConnection<S,A>(this);

    //Setup Default Handlers
    [
      ReceiveSceneHandler,
      ReceiveStateHandler
    ].forEach(e => {
      let i = new e(this.socket);
      this.socket.handlers.push(i);
    });
  }

  getComponent() {
    let scenes = this.getScenes();

    return (
      <Router history={this.history}>

        {/* Admin Panel Scenes */}
        <Route exact path="/admin" load={() => import('./../admin/dashboard/index')} loadingComponent={LoadingPage} />

        {/* Graphics Scenes */}
        { scenes }
      </Router>
    );
  }

  abstract getScenes():JSX.Element;
  abstract getNyceReducer():Reducer<S,A>;
  getReducer():Reducer<S & NycePublicState, A | NycePublicActions> {
    return reduceReducers<S&NycePublicState, A|NycePublicActions>(
      nyceReducer as any, this.getNyceReducer() as any
    );
  }

  onStateChange(newState:S&NycePublicState, oldState:S|NycePublicActions, key:string) {
    //Update scene if the request calls for it.
    if(key == 'scene') {
      this.history.push(getScenePath(newState.scene));
    }
  }
}
