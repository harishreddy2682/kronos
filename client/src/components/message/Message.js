import './message.css'
import React from "react";

const Message = ({ children, type }) => {
  if (type === "error") {
    type = "#e96060";
  } else if (type === "success") {
    type = "#62dc6c";
  } else {
    type = "#62a1dc";
  }

  return (
    <>
      <div className='message-container'>
        <div id='message-box' style={{ backgroundColor: type }}>
          <p id='message-text'>{children}</p>
        </div>
      </div>
    </>
  );
};

Message.defaultProps = {
  type: "info",
  message: "This is a message",
};

export default Message;