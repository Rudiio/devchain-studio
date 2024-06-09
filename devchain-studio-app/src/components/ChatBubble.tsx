import { ChatMessage } from "../types/ChatMessage";
import {Card, CardHeader, CardBody} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { OpenAiLogo, UserCircle, FileText } from "@phosphor-icons/react";
import Devchain_icon from "/Devchain_icon.svg"

interface ChatBubbleProps{
    msg : ChatMessage
}

function ChatBubble({msg}:ChatBubbleProps): JSX.Element
{
    return(
        <div className="p-3">
            <Card isBlurred className="p-3 border-none bg-content2">
                <CardHeader className="text-sm flex flex-row justify-between content-center ">
                    <Button radius='full' size="sm"
                    startContent={msg.sender==='User'? <UserCircle size={27}/>:<img className="size-8" src={Devchain_icon}/>}>
                        {msg.sender}
                    </Button>

                    <Button radius="full" size='sm' startContent={<FileText size={27} />}>
                        {msg.document}
                    </Button>
                    
                    {/* Conditional rendering for the Model  */}
                    {(msg.sender!='User' || msg.model!=="None") ? <Button size='sm' radius="full" startContent={<OpenAiLogo size={32}/>}>{msg.model}</Button> : null }
                </CardHeader>

                <CardBody>
                    <div className="border-none rounded-lg">
                        <p className="py-3 px-2 whitespace-pre-wrap">
                            {msg.content}
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}



export default ChatBubble