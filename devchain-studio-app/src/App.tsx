import { useState, useEffect, useRef} from "react"

import ChatInput from "./components/ChatInput"
import Header from "./components/Header"
import ChatWindow from "./components/ChatWindow"

import { ChatMessage } from "./types/ChatMessage"
import { WsMessage } from "./types/WsMessage"
import socket from "./services/client"
import './App.css'


function App() {
  const effectRan = useRef(false);  // Not really necessary in production
  const [chatMessageList, setChatMessage] = useState<Array<ChatMessage>>([]);
  const [chatInputState,setChatInputState] = useState<string>("processing");
  const [chatInputChoices,setChatInputChoices] = useState<Array<string>>([]);

  const add_message = (msg : ChatMessage) =>{
    setChatMessage( (l) => [...l,msg] )
  };
  
  /** This function is passed to  */
  function send_message(user_msg: ChatMessage, ws_msg : WsMessage)
  {
    // Setting the Chatinput state to processing after sending a message
    setChatInputState('processing');

    // Send message to the Chat
    add_message(user_msg);

    // Sending the message to back-end
    socket.send(ws_msg);
  }

  // Handle the messages from the server
  const handleServerMessage = (msg:WsMessage) => {

    if (msg.streaming){
      setChatMessage(l => {
        const newMessages = [...l];
        newMessages[newMessages.length -1].content += msg.content.content;
        return newMessages;
      });
    }
    else{
      // Convert a WsMessage into a Chat Message
      const server_msg : ChatMessage = {
        id:msg.id,
        sender:msg.content.sender,
        model:msg.content.model,
        document:msg.content.document,
        content:msg.content.content
      }
  
      // send message to chat
      add_message(server_msg);
    }
    
    // Handle action
    if (msg.action){
      handleAction(msg.action,msg.content.subcontent);
    }
  }

  // Handle the actions that should be passed down to the ChatInput components : state + subcontent
  const handleAction = (action : string, subcontent: Array<string>) => {
    setChatInputState(action);
    if (action === 'choice'){
      setChatInputChoices(subcontent);
    } 
  }
  
  /**Necessary to restart the front-end (only re-render everything) */
  function reset(){
    setChatMessage([]);
    socket.reset();
    socket.configure_on_message(handleServerMessage);
  }

  function stop(){
    socket.close();
    setChatInputState('stop');
  }
  
  function handleDisconnect(){
    setChatInputState('stop');
  }

  useEffect(() => {
    if (!effectRan.current){
      socket.configure_on_disconect(handleDisconnect);
      socket.configure_on_message(handleServerMessage);
    }
    return () => {effectRan.current = true;
    };
  }),[reset];

  return (
    <div className="p-2 font-mono flex flex-col justify-between gap-2 h-screen w-full">
      <Header reset={reset} stop={stop}/>
      <ChatWindow ChatMessageList={chatMessageList}/>
      <ChatInput onSendMessage={send_message} state={chatInputState} choices={chatInputChoices}/>
    </div>
  )
}

export default App
