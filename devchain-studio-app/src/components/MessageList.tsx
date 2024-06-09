import ChatBubble from "./ChatBubble";
import { ChatMessage } from "../types/ChatMessage";

import { useRef, useEffect } from "react";

interface MessageListProps{
    chatlist : Array<ChatMessage>;
}

function MessageList({chatlist} : MessageListProps): JSX.Element
{
    const container = useRef<HTMLDivElement>(null);

    useEffect( () => {
        container.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
    });
    

    return(
        <div className="flex flex-col" ref={container}>
            {chatlist.map((msg,index)=> <ChatBubble key={index} msg={msg}/>)}
        </div>
    );
}



export default MessageList