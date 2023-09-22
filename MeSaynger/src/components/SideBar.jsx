import React, { useState } from "react";
import { Input, VStack } from "@chakra-ui/react";
import SideCard from "./SideCard";

const mockData = [
  {
    id: 1,
    image: "person1.jpg",
    name: "John Doe",
    number: "123-456-7890",
    recentChat: "Hello there!",
    date: "Aug 25",
  },
  {
    id: 2,
    image: "person2.jpg",
    name: "Jane Smith",
    number: "987-654-3210",
    recentChat: "Hi John!",
    date: "Aug 24",
  },
  // Add more mock data here
];

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = mockData.filter(
    person =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.number.includes(searchQuery)
  );

  return (
    <VStack p="4" spacing="3" align="stretch" overflowY="auto" maxH="100vh" flexGrow={1}>
    {/* Set maxH to limit the sidebar height, without taking the full viewport */}
    <Input
      placeholder="Search"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      flexShrink={0} // Prevent input from shrinking
    />
    {filteredData.map(person => (
      <SideCard key={person.id} person={person} />
    ))}
  </VStack>

  );
};

export default Sidebar;
