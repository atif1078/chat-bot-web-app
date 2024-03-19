import "./App.css";
import gptLogo from "./assets/chatgptLogo.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAi } from "./openai";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd= useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text:"Hi, I am your chat bot",
    isBot: true,
  }]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [messages])

  const handleSend = async () => {
    try {
      const text = input;
      setInput('')
      setMessages([
        ...messages,
        {text, isBot: false}
      ])
      const res = await sendMsgToOpenAi(input);
      setMessages([...messages,
        {text , isBot: false},
      {text: res, isBot: true},
      ])
    } catch (error) {
      alert("An error occurred while sending the message. Please try again.");
    }
  };

  const handleQuery= async (e)=> {
    try {
      const text = e.target.value;
      setMessages([...messages, { text, isBot: false }]);
      const res = await sendMsgToOpenAi(input);
      setMessages([
        ...messages,
        { text, isBot: false },
        { text: res, isBot: true },
      ]);

    } catch (error) {
      alert("An error occurred while sending the message. Please try again.");
    }
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatBot</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button
              className="query"
              onClick={handleQuery}
              value={"text"}
            >
              <img src={msgIcon} alt="Query" />
              Let's discuss about it
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value={"How to use chat bot"}
            >
              <img src={msgIcon} alt="Query" />
              How to use chat bot
            </button>
          </div>
        </div>
        <div className="lowerSide">
          {" "}
          <img src={home} alt="Home" className="listItemsImg" />
          Home
        </div>
        <div className="lowerSide">
          {" "}
          <img src={saved} alt="Saved" className="listItemsImg" />
          Saved
        </div>
        <div className="lowerSide">
          {" "}
          <img src={rocket} alt="Upgrade" className="listItemsImg" />
          Upgrade
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />{" "}
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatBot </p>
        </div>
      </div>
    </div>
  );
}

export default App;
