import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import ReconnectingWebSocket from '../utils/reconnecting-websocket';

@Injectable({
  providedIn: 'root',
})
export class WsLiveService {
  connection!: ReconnectingWebSocket;

  constructor(private http: HttpClient) {}

  init(): Observable<any> {
    const list = new Subject<any>();
    const listObservable = from(list);
    this.connection = new ReconnectingWebSocket(
      'ws:://localhost'
      // this.apiService.live.params(this.routeParams.id)
    );

    this.connection.onmessage = (response) => {
      const data = JSON.parse(response.data);
      list.next({
        type: data.type,
        data: data.message,
      });
    };

    this.connection.onclose = (close) => {
      console.log('onclose', close);
    };

    this.connection.onerror = (error) => {
      console.log('onerror ' + JSON.stringify(error));
    };
    return listObservable;
  }
}
