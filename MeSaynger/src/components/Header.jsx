import { Box, Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="gray.800" py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Heading color="white">Business Website</Heading>
        {/* Add navigation links or other content here */}
      </Flex>
    </Box>
  );
};

export default Header;
