import React, { useState, useEffect } from "react";
import { Box, Center, CircularProgress, Grid ,Flex} from "@chakra-ui/react";
import Sidebar from "../components/SideBar.jsx"
import ChatApp from "../components/ChatApp.jsx"

import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate API request with a timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        // Replace this with actual API request logic
        // For demonstration, we'll increase the progress by 10% every 1 second
        setProgress(prevProgress => prevProgress + 100);
      } else {
        clearInterval(timer);
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <>
    <Box height="100vh">
      {loading ? (
        <Center height="100%">
          <CircularProgress value={progress} size="100px" thickness="8px" />
        </Center>
      ) : (
        <Grid
          templateColumns="1fr 2fr" // 4:8 ratio
          minH="100vh"
        >
          <Sidebar />
          <ChatApp />
        </Grid>
      )}
    </Box>
    
    <Flex h="100vh">
      <LeftPanel />
      <RightPanel />
    </Flex>
    </>
  );
};

export default LoadingScreen;
