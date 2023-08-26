import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Box p="4" borderTopWidth="1px">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        size="sm"
      />
      <Button mt="2" size="sm" onClick={handleMessageSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
