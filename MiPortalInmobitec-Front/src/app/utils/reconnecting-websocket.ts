export default class ReconnectingWebSocket {
  constructor(url: string, protocols: string[] = []) {
    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;
    this.connect(false);
  }

  /**
   * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
   */
  public static debugAll = false;

  // These can be altered by calling code
  public debug = false;

  // Time to wait before attempting reconnect (after close)
  public reconnectInterval = 5000;
  // Time to wait for WebSocket to open (before aborting and retrying)
  public timeoutInterval = 3000;

  // Should only be used to read WebSocket readyState
  public readyState: number;

  // Whether WebSocket was forced to close by this client
  private forcedClose = false;
  // Whether WebSocket opening timed out
  private timedOut = false;

  // List of WebSocket sub-protocols
  private protocols: string[] = [];

  // The underlying WebSocket
  private ws: WebSocket | null = null;
  private url: string;

  // Set up the default 'noop' event handlers
  public onopen: (ev: Event) => void = (event: Event) => {};
  public onclose: (ev: CloseEvent) => void = (event: CloseEvent) => {};
  public onconnecting: () => void = () => {};
  public onmessage: (ev: MessageEvent) => void = (event: MessageEvent) => {};
  public onerror: (ev: ErrorEvent) => void = (event: ErrorEvent) => {};

  public connect(reconnectAttempt: boolean): void {
    this.ws = new WebSocket(this.url, this.protocols);

    this.onconnecting();
    this.log('ReconnectingWebSocket', 'attempt-connect', this.url);

    const localWs = this.ws;
    const timeout = setTimeout(() => {
      this.log('ReconnectingWebSocket', 'connection-timeout', this.url);
      this.timedOut = true;
      localWs.close();
      this.timedOut = false;
    }, this.timeoutInterval);

    this.ws.onopen = (event: Event) => {
      clearTimeout(timeout);
      this.log('ReconnectingWebSocket', 'onopen', this.url);
      this.readyState = WebSocket.OPEN;
      reconnectAttempt = false;
      this.onopen(event);
    };

    this.ws.onclose = (event: CloseEvent) => {
      clearTimeout(timeout);
      this.ws = null;
      if (this.forcedClose) {
        this.readyState = WebSocket.CLOSED;
        this.onclose(event);
      } else {
        this.readyState = WebSocket.CONNECTING;
        this.onconnecting();
        if (!reconnectAttempt && !this.timedOut) {
          this.log('ReconnectingWebSocket', 'onclose', this.url);
          this.onclose(event);
        }
        setTimeout(() => {
          this.connect(true);
        }, this.reconnectInterval);
      }
    };

    this.ws.onmessage = (event) => {
      this.log('ReconnectingWebSocket', 'onmessage', this.url, event.data);
      this.onmessage(event);
    };
    this.ws.onerror = (event: any) => {
      this.log('ReconnectingWebSocket', 'onerror', this.url, event);
      this.onerror(event);
    };
  }

  public send(data: any): any {
    if (this.ws === undefined || this.ws === null) {
      throw new Error('INVALID_STATE_ERR : Pausing to reconnect websocket');
    }

    this.log('ReconnectingWebSocket', 'send', this.url, data);

    return this.ws.send(data);
  }

  /**
   * Returns boolean, whether websocket was FORCEFULLY closed.
   */
  public close(): boolean {
    if (this.ws) {
      this.forcedClose = true;
      this.ws.close();
      return true;
    }
    return false;
  }

  /**
   * Additional public API method to refresh the connection if still open (close, re-open).
   * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
   *
   * Returns boolean, whether websocket was closed.
   */
  public refresh(): boolean {
    if (this.ws) {
      this.ws.close();
      return true;
    }
    return false;
  }

  private log(...args: any[]): void {
    if (this.debug || ReconnectingWebSocket.debugAll) {
      // tslint:disable-next-line: no-console
      console.debug.apply(console, args);
    }
  }
}
