import { Box, Divider, Flex, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import { BsClipboard } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";

function Header() {
  return (
    <Flex
      flexDirection={"column"}
      boxShadow={"lg"}
      minH={"100vh"}
      left={0}
      top={0}
      bottom={0}
      bg={"teal.50"}
    >
      <Box
        transition="background-color 0.3s"
        _hover={{ bg: "teal.400", color: "white" }}
        p={4}
      >
        <Link to="/">
          <HStack pl={4}>
            <BsClipboard />
            <Heading size={"sm"}>Dashboard</Heading>
          </HStack>
        </Link>
      </Box>
      <Divider />
      <Box
        p={4}
        transition="background-color 0.3s"
        _hover={{ bg: "teal.400", color: "white" }}
      >
        <Link to="/patients/new">
          <HStack pl={4}>
            <AiOutlineUserAdd />
            <Heading size={"sm"}>Ajouter un patient</Heading>
          </HStack>
        </Link>
      </Box>
      <Divider />

      <Box
        transition="background-color 0.3s"
        _hover={{ bg: "teal.400", color: "white" }}
        p={4}
      >
        <Link to="/patients">
          <HStack pl={4}>
            <GrGroup />
            <Heading size={"sm"}>Tout mes patiens</Heading>
          </HStack>
        </Link>
      </Box>
      <Divider />
    </Flex>
  );
}

export default Header;
