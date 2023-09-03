import React, { useState } from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    console.log(message)
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
    // <Flex
    //   p="2"
    //   bottom="0"
    //   width="50%"
    //   position="fixed"
    //   borderTopWidth="1px"
    //   bg="white"
    // >
    //   <Input placeholder="Type your message..." flex="1" mr="2"  />
    //   <Button colorScheme="blue" onClick={handleMessageSend}>Send</Button>
    // </Flex>
  );
};

export default ChatInput;