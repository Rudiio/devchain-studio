import { ChangeEvent, useState } from "react";

import { ChatMessage } from "src/types/ChatMessage";
import { WsMessage } from "src/types/WsMessage";
import {Textarea} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { PaperPlaneRight, X, Check } from "@phosphor-icons/react";
import {Spinner} from "@nextui-org/react";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";


interface ChatInputProps{
    onSendMessage : (str_msg:ChatMessage,client_message:WsMessage) => void;
    state : string;
    choices : Array<string>
}

/** Chat input Components. The user write messages he wants to transmit to the application */
function ChatInput({onSendMessage, state, choices} : ChatInputProps)
{
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState<string[]>([]);

    const handleMessageChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setMessage(() => (e.target as HTMLInputElement).value)
    }
    
    const handleClickChat = () => {
        // Creating the user message
        const user_message : ChatMessage = {
            id:0,
            sender:"User",
            content:message,
            model:"None",
            document:"None"
        };

        // Message to send to back-end
        const client_message : WsMessage = {
            id : 0,
            object : "user message",
            action : '',
            streaming : false,
            content : {sender:'User',
                        model:'None',
                        document : 'TODO',
                        content :message,
                        subcontent:[''],}
        };

        // Logic to send message to chat and to back-end
        onSendMessage(user_message,client_message);

        // Reset the message state 
        setMessage("");
    };

    const handleClickChoice = () =>{
        // Creating the user message
        const user_message : ChatMessage = {
            id:0,
            sender:"User",
            content:selected[0],
            model:"None",
            document:"None"
        };

        // Message to send to back-end
        const client_message : WsMessage = {
            id : 0,
            object : "user message",
            action : '',
            streaming : false,
            content : {sender:'User',
                        model:'None',
                        document : 'TODO',
                        content :selected[0],
                        subcontent:['']}
            };

        onSendMessage(user_message,client_message);
        setSelected([]);
    } 

    if (state ==='chat'){
        return (
            <div className="p-3 pr-6 px-3  rounded-lg">
                <div className="relative flex flew-row gap-3 place-content-center opacity-80">
                    <Textarea
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type your message here"
                    className="text-sm"
                    minRows={1}/>
                    {message.length === 0 ? <Button isIconOnly radius="full" className="bg-gray-500 text-white shadow-lg">
                                            <PaperPlaneRight size={20} />
                                            </Button>
                    : <Button isIconOnly onClick={handleClickChat} radius="full" className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                                            <PaperPlaneRight size={20} />
                                            </Button>
                    }   
                </div>
            </div>
        )
    }
    else if (state === 'choice'){
        return (
            <div className="p-3 pr-6 flex flex-row justify-center items-center gap-4 border-none rounded-lg" >
                <CheckboxGroup
                className=" p-3 border-none rounded-lg bg-content2"
                label="Select one option"
                defaultValue={[]}
                value={selected}
                onValueChange={setSelected}
                >
                {choices.map((val,index) => <Checkbox key={index} value={val}>{val}</Checkbox>)}
                </CheckboxGroup>
                {selected.length !=1 ? <Button isIconOnly radius="full" className="bg-gray-500 text-white shadow-lg">
                                            <PaperPlaneRight size={25} />
                                            </Button>
                : <Button isIconOnly onClick={handleClickChoice} radius="full" className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                                            <PaperPlaneRight size={25} />
                                            </Button>
                }   
            </div>
        )
    }
    else if(state ==='processing') {
        return (
            <div className="p-3 pr-10 border-none rounded-lg">
                <div className="box-content flex flew-row gap-4 place-content-center opacity-80">
                    <Textarea
                    value={message}
                    // onChange={handleMessageChange}
                    placeholder="The Application is processing"
                    className="text-sm"
                    minRows={1}/>
                    <Spinner color="secondary"/>
                </div>
            </div>
        )
    }
    else if(state ==='stop') {
        return (
            <div className="p-3 pr-10 border-none rounded-lg">
                <div className="flex flew-row gap-4 justify-center items-center opacity-80">
                    <Textarea
                    value={message}
                    placeholder="The Application is processing"
                    className="text-sm"
                    minRows={1}/>
                    <X size={32} color="#be0404" />
                </div>
            </div>
        )
    }
    else if(state ==='OK') {
        return (
            <div className="p-3 pr-10 border-none rounded-lg">
                <div className="flex flew-row gap-4 justify-center items-center opacity-80">
                    <Textarea
                    value={message}
                    placeholder="The project ended succesfully."
                    className="text-sm"
                    minRows={1}/>
                    <Check size={32} color="#09ae14" />
                </div>
            </div>
        )
    }
}

export default ChatInput;