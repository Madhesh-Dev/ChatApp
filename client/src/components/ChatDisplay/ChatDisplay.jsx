import "./ChatDisplay.css";
import {format} from "timeago.js";

function ChatDisplay({own,message}) {
    return (
        <div className={own? "chatdisplay own": "chatdisplay"}>
            <div className="chatTop">
                <img src="https://m.media-amazon.com/images/I/61G+OTTRVvL._SL1125_.jpg" alt="chat owner" className="chatTopImg"/>
                <p className="chatTopText">{message.text}</p>
            </div>
            <div className="chatBottom">{format(message.createdAt)}</div>
        </div>
    );
}

export default ChatDisplay;