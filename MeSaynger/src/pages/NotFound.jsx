import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Box py={20} textAlign="center" bg="red.400">
      <Heading as="h1" size="2xl" mb={4} color={"white"}>
        Error
      </Heading>
      <Text fontSize="6xl" mb={8} color={"white"}>
      Oops! Page not found
      </Text>
      <Text color={"white"}>
<NavLink to="/">Go back to /home</NavLink>
</Text>
    </Box>
  );
};

export default NotFound;
