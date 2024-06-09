import MessageList from "./MessageList"
import { ChatMessage } from "../types/ChatMessage"
import {ScrollShadow} from "@nextui-org/react";

interface ChatWindowProps{
    ChatMessageList : Array<ChatMessage>
}

function ChatWindow({ChatMessageList} : ChatWindowProps) : JSX.Element
{

    return(
        <>
        <div className="overflow-y-auto rounded-lg text-sm">
            <ScrollShadow>
            <MessageList chatlist={ChatMessageList}/>
            </ScrollShadow>
        </div>
        </>
    )
}


export default ChatWindow