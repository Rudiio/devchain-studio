
export interface WsMessage {
    id : number,
    object : string,
    content : WsMessageContent,
    action : string,
    streaming : boolean
}


interface WsMessageContent{
    sender : string,
    model : string,
    document : string,
    content : string,
    subcontent: Array<string> 
}