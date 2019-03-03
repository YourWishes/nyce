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


import { SocketRequest } from '@yourwishes/app-socket/public';
import { NyceSocketHandler, NyceSocketConnection } from './../../socket';
import { setScene } from './../../actions/';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export class ReceiveSceneHandler<S,A extends Action> extends NyceSocketHandler<S,A> {
  constructor(connection:NyceSocketConnection<S,A>) {
    super(connection, '/scene/set');
  }

  async onRequest(request:SocketRequest):Promise<void> {
    (
      this.connection.app.store.dispatch as ThunkDispatch<any, any, any>
    )( setScene(request.data['scene']) );
  }
}
