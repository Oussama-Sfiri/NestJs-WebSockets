import React, { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/WebsocketContext';

type MessagePayload = {
    content : string;
    msg : string;
}

function Chat() {
    const [userMsg, setUserMsg] = useState("");
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected!");
        });
        socket.on("onMessage", (newMessage : MessagePayload) => {
            console.log("onMessage event received!");
            console.log(newMessage);
            setMessages((prev) => [ ...prev, newMessage ]);
        });

        return () => {
            console.log("Unregistring Events...");
            socket.off('connect');
            socket.off('onMessage');
        };
    },[]);

    const sendMessageHandler = () => {
        socket.emit("newMessage", userMsg);
        setUserMsg("");
    }

  return (
    <div>
        <div>
            <h1>Chat Component</h1>
            <div>
                {messages.length === 0 ?
                    "No Messages" 
                    : 
                    messages.map((msg) => {
                        return (
                            <p>
                                {msg.content}
                            </p>
                        );
                    })
                }
            </div>
            <div>
                <input type="text" value={userMsg} onChange={(e) => setUserMsg(e.target.value)} />
                <button onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    </div>
  );
};

export default Chat;