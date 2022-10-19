import "./statusOnline.css";

function StatusOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src="https://m.media-amazon.com/images/I/61G+OTTRVvL._SL1125_.jpg" alt="he is online" />
                 <div className="chatOnlineBadge"></div>
            </div>
             <span className="chatOnlineName">Mahesh</span>
            </div>
        </div>
    );
}

export default StatusOnline;

