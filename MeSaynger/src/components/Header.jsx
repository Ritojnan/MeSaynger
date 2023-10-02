import { Avatar, Flex, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import {
  CommunityIcon,
  MenuIcon,
  NewChatIcon,
  StatusIcon,
} from "../assets/icons";

const iconData = [
  { icon: <CommunityIcon />, label: "Community chat" },
  { icon: <StatusIcon />, label: "Status" },
  { icon: <NewChatIcon />, label: "New Chat" },
  { icon: <MenuIcon />, label: "Menu" },
];

// eslint-disable-next-line react/prop-types
function CustomTooltip({ label, icon, ...rest }) {
  return (
    <Tooltip
      shouldWrapChildren
      label={label}
      bg="#eae6df"
      color="black"
      fontSize="xs"
      {...rest}
    >
      <IconButton variant="ghost">{icon}</IconButton>
    </Tooltip>
  );
}

export function Header(props) {
  return (
    <Flex
      bg="#F9F9F9"
      justify="space-between"
      py="2"
      px="4"
      borderRight="1px solid #f2f2f2"
      color="#54656f"
      shadow="sm"
      {...props}
    >
      <Avatar
        boxSize="40px"
        name="Enes Şahin"
        src="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <HStack spacing="3">
        {iconData.map((item, index) => (
          <CustomTooltip key={index} label={item.label} icon={item.icon} />
        ))}
      </HStack>
    </Flex>
  );
}

// import { Box, Flex, Heading } from "@chakra-ui/react";

// const Header = () => {
//   return (
//     <Box bg="gray.800" py={4}>
//       <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
//         <Heading color="white">Business Website</Heading>
//         {/* Add navigation links or other content here */}
//       </Flex>
//     </Box>
//   );
// };

// export default Header;
