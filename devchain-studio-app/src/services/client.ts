import {WsMessage} from "../types/WsMessage"

class WsClient{
    private _websocket : WebSocket;
    private _url : string = "ws://localhost:8000/ws";

    constructor(){

        this._websocket = new WebSocket(this._url);

        // Setting up event handling    
        this.configure_websocket();
    }

    public  initialize() : void{
        if (!this.is_connected()){
            this._websocket = new WebSocket(this._url);
        }
    }

    private configure_websocket():void{
        this._websocket.addEventListener("open",() => {
            console.log("Connected to server");
        });

        this._websocket.addEventListener("error",()=> {
            console.log("Error encountered");
        });
    }

    public configure_on_disconect(disconnection_handler : () => void): void {
        this._websocket.addEventListener("close",() => {
            disconnection_handler();
        })
    }

    public configure_on_message(message_handler : (msg:WsMessage)=>void):void {
        this._websocket.addEventListener("message", (event:MessageEvent) => {
            const msg : WsMessage = JSON.parse(JSON.parse(event.data));
            console.log("Message from server ",msg);
            message_handler(msg);
        });
    }

    is_connected() : boolean {
        return (this._websocket != null && this._websocket.readyState == 1);
    }

    public get_ready_state(){
        return this._websocket.readyState;
    }

    public close(){
        this._websocket.close();
    }

    public reset(){
        this.close();
        this._websocket = this._websocket = new WebSocket(this._url);

        // Setting up event handling    
        this.configure_websocket();
    }

    public send(msg : WsMessage)
    {
        if (this.is_connected()){
            const str_msg = JSON.stringify(msg);
            this._websocket.send(str_msg);
        }
    }
}

const socket = new WsClient();

export default socket;