
export interface ChatMessage{
    // Id of the message to track
    id : number;

    // The sender of the message (agent name or user) 
    sender : string;
    
    // The model if it is an AI agent
    model : string;
    
    // The action that is being executed
    document : string;

    // The content of the message
    content : string;
}