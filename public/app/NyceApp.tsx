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
import { App, Router, AppReducer } from '@yourwishes/app-simple-react/public';

import { SceneProps } from './../scene/Scene';
import { NyceSocketConnection } from './../socket/NyceSocketConnection';
import { ReceiveStateHandler } from './../api/state/ReceiveStateHandler';

export abstract class NyceApp extends App {
  socket:NyceSocketConnection;

  constructor(reducer:AppReducer={}) {
    //Setup Nyce Reducers
    reducer = {
      //...nyce,
      ...reducer
    };
    super('nyce', reducer);//For 'nyce', refer to NyceCompiler.ts in private/compiler..

    //Setup Socket Connection
    this.socket = new NyceSocketConnection(this);

    //Setup Default Handlers
    this.socket.handlers.push(new ReceiveStateHandler(this.socket));
  }

  getComponent() {
    let scenes = this.getScenes();

    return (
      <Router>
        {/* Graphics Scenes */}
        { scenes }
      </Router>
    );
  }

  abstract getScenes():React.ReactElement<SceneProps>[];
}
