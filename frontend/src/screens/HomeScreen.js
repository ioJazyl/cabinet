import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Box>
        <Card
          align="center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          w={"fit-content"}
          m="auto"
        >
          <CardHeader>
            <Heading size="md">Bienvenue Mounir !</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Vous pouvez voir vos patients ou bien ajouter un nouveau.
            </Text>
          </CardBody>
          <CardFooter display={"flex"} gap={4}>
            <Link to={"/patients/new"}>
              <Button leftIcon={<AiOutlineUserAdd />} colorScheme="teal">
                Ajouter un patient
              </Button>
            </Link>
            <Link to={"/patients"}>
              <Button
                leftIcon={<GrGroup />}
                variant={"outline"}
                colorScheme="teal"
              >
                Voir mes patients
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Box>
    </Flex>
  );
}

export default HomeScreen;
