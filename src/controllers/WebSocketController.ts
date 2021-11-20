
import type {IWebSocketController} from "./types/types";
import type WebSocket from "ws";

export class WebSocketController  {

    private readonly _wsConnection: WebSocket;

    constructor(connection: WebSocket) {
        this._wsConnection = connection;
    }

    send(data: any){
        this._wsConnection.send(JSON.stringify(data));
    }

}
