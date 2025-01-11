import React from "react";
import "./RightPanelInput.css";

const RightPanelInput = ({data}) => {
    return (
        <div className="add-message">
            <textarea
                placeholder="Type a message..."
                rows={2}
                className="message-input"
                onFocus={(e) => (e.target.rows = 4)}
                onBlur={(e) => (e.target.rows = 2)}
            />
            <button className="send-button">Send</button>
        </div>
    )
}


export default RightPanelInput;