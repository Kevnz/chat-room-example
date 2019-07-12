import ReactDOM from "react-dom";

import React, { useState } from "react";
import { Form, TextBox, TextInput, Button } from "react-form-elements";
import { useNes, usePost } from "@brightleaf/react-hooks";

import "./styles.css";

const domain = "kev-pi.herokuapp.com";

const ChatRoom = () => {
  const { postData } = usePost(`https://${domain}/rooms/general/message`);
  const { client } = useNes(`wss://${domain}`);
  const [messages, setMessages] = useState([
    {
      body: "welcome to the jungle baby",
      user: "System"
    }
  ]); // Welcome Message
  const addMessage = msg => {
    messages.push(msg);
    setMessages([...messages]);
  };
  const handler = function(update, flags) {
    addMessage(update);
  };
  client.subscribe("/rooms/general", handler);

  const messageList = messages.map(({ user, body }, index) => {
    return (
      <div key={`key-${index}`}>
        <b>{user}:</b>
        {body}
      </div>
    );
  });

  return (
    <div className="container">
      <Form name="messagePost" onSubmit={postData}>
        <TextInput name="user" label="UserName" required />
        <TextBox name="body" label="Message" required />
        <Button>Send</Button>
      </Form>
      {messageList}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<ChatRoom />, rootElement);
