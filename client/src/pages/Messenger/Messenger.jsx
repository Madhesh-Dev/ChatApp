import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import StatusOnline from "../../components/status/StatusOnline";
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../Conversations/Conversation";
import "./Messenger.css"

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { useRef } from "react";

function Messenger() {

    const {user} = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]);
   
    const socket = useRef();
    const [newMessage,setNewMessage]= useState("");
    const scrollRef = useRef();

    useEffect(()=>{
        socket = io("ws://localhost:8900");
    })

    useEffect(()=>{
        socket.current.emit("addUser",user._id);
        socket.current.on("users",users=>{
            console.log(users);
        });
    },[user]);

   

   console.log(socket);

    useEffect(()=>{
        

        const getConv= async()=>{
        try {
            
            const result = await axios.get("/conversation/" + user._id);
            
            setConversations(result.data);
            

            
        } catch (error) {
            console.log(error)
            
        }
    };
    getConv();
        
    },[user._id]);

    useEffect(()=>{
        const getMessages = async()=>{
            try {
                const result =  await axios.get("/messages/" + currentChat?._id);
                setMessages(result.data);
                
            } catch (error) {
                console.log(error);
                
            }
           
        }

        getMessages();


    },[currentChat]);
    
    const handleNewMessage= async(e)=>{
        e.preventDefault();
        const message = {
            
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage
        }

        try {
            const result = await axios.post("/messages",message);
            setMessages([...messages,result.data]);
            setNewMessage("");
        
            
        } catch (error) {
            console.log(error);
            
        }

       
    }

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({
            behavior:"smooth"
        });

    },[messages]);

    
    return (
        <>
        <Topbar />
        <div className="Messenger">
            <div className="SearchFriends">
                <div className="SearchFriendsWrapper">
                    <input placeholder="Search for friends ...." className="SearchFriendsInput"/>
                    {conversations.map((c)=>(
                        <div onClick={()=>{setCurrentChat(c)}}>
                         <Conversation conversation={c} currentUser={user}/>
                         </div>

                    ))}
                   
                   
                    
                </div>
            </div>
            <div className="DisplayChat">
                <div className="DisplayChatWrapper">
                    {
                        currentChat ? 
                    <>
                    
                    <div className="chatBoxTop">
                    
                    {
                        messages.map((message)=>(
                            <div ref={scrollRef}>
                            
                            <ChatDisplay own={(user._id === message.sender)? true : false } message={message}/>
                            </div>
                        ))
                    }
                        
                    
                    
                    
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder="Write a message" className="chatTextArea" onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button className="chatSubmitButton" onClick={handleNewMessage}>Send</button>
                    </div>
                    </> : <span className="noChatSpan">Click on a conversation to start sending messages.</span>
                    }
                    
                </div>
            </div>
            <div className="Status">
                <div className="StatusWrapper">
                    <StatusOnline />
                    <StatusOnline />
                    <StatusOnline />
                    <StatusOnline />
                    <StatusOnline />
                    
                   
                </div>
            </div>

            
        </div>
        </>
    );
}

export default Messenger;