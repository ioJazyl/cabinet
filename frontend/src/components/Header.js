import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import { BsClipboard } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
function Header() {
  return (
    <Flex
      flexDirection={"column"}
      boxShadow={"md"}
      minH={"fit-content"}
      left={0}
      top={0}
      bottom={0}
      className="white"
      bg={"white"}
      rounded={"lg"}
    >
      <Box transition="background-color 0.3s">
        <Link to="/">
          <Button
            py={8}
            variant={"ghost"}
            w={"full"}
            colorScheme="teal"
            leftIcon={<BsClipboard />}
          >
            Dashboard
          </Button>
        </Link>
      </Box>
      <Divider />
      <Box transition="background-color 0.3s">
        <Link to="/patients/new">
          <Button
            py={8}
            variant={"ghost"}
            w={"full"}
            colorScheme="teal"
            leftIcon={<AiOutlineUserAdd />}
          >
            Ajouter un patient
          </Button>
        </Link>
      </Box>
      <Divider />

      <Box transition="background-color 0.3s">
        <Link to="/patients">
          <Button
            py={8}
            variant={"ghost"}
            w={"full"}
            colorScheme="teal"
            leftIcon={<GrGroup />}
          >
            Tout mes patients
          </Button>
        </Link>
      </Box>
      <Divider />

      <Box transition="background-color 0.3s">
        <Link to="/admin">
          <Button
            py={8}
            variant={"ghost"}
            w={"full"}
            colorScheme="teal"
            leftIcon={<GrUserAdmin />}
          >
            Admin
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default Header;
