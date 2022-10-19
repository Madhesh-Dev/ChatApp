import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Conversation.css"
function Conversation({conversation,currentUser}) {

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const friendId = conversation.members.find((m)=> m !== currentUser._id);
        //console.log(friendId);
        const getUser = async()=>{

            try {
                
                const result = await axios("/users?userId=" + friendId);
                setUser(result.data);
               
                
            } catch (error) {
                console.log(error);
                
            }
            
        }
        getUser();
    },[currentUser,conversation])
    return (
        <div className="conversation">
            <img src="https://m.media-amazon.com/images/I/61G+OTTRVvL._SL1125_.jpg" alt="Lord shiva" className="conversationImg"/>
            <span className="conversationText">{user?.username}</span>
        </div>
    );
}

export default Conversation;