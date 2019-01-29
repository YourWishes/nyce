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

import { RESPONSE_OK } from '@yourwishes/app-api';
import { SocketConnection } from '@yourwishes/app-socket';
import { NyceApp } from './../app/';
import { increment } from './../actions/';

export class NyceConnection extends SocketConnection {
  interval:NodeJS.Timeout;

  sendState() {
    //Sends the entire state to the client
    this.send({
      path: '/state/receive',
      code: RESPONSE_OK,
      data: (this.module.app as NyceApp).nyce.store.getState()
    });
  }

  async onConnect():Promise<void> {
    this.sendState();
    this.interval = setInterval(() => {
      (this.module.app as NyceApp).nyce.store.dispatch(increment(1));
      this.sendState();
    }, 1000);
  }

  async onDisconnect(reason:string): Promise<void> {
    clearInterval(this.interval);
  }
}
