import { Box, Flex } from '@chakra-ui/react';
import { ChatList } from './chat-list';
import { Header } from './header';
import { SearchPanel } from './search-panel';

export function LeftPanel(props) {
  return (
    <Flex direction='column' w="30%" bg="#F9F9F9" {...props}>
      <Box>
        <Header />
        <SearchPanel />
      </Box>
      <ChatList flex='1' overflow='auto' />
    </Flex>
  );
}