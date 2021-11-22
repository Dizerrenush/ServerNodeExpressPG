
import type WebSocket from "ws";

export class WebSocketController {

    private readonly _wsConnection: WebSocket;

    constructor(connection: WebSocket) {
        this._wsConnection = connection;
    }

    send<T>(data: T) {
        this._wsConnection.send(JSON.stringify(data));
    }

}
