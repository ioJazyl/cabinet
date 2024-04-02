import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import usePatients from "../hooks/usePatients";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";

function HomeScreen() {
  const { patients } = usePatients();
  return (
    <>
      <Box className="mt-4 flex h-screen w-full flex-col items-center justify-center gap-5 ">
        <Card align="center">
          <CardHeader>
            <Heading size="md">Bienvenue Mounir !</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Vous pouvez voir vos patients ou bien ajouter un nouveau.
            </Text>
          </CardBody>
          <CardFooter display={"flex"} gap={4}>
            <Button leftIcon={<AiOutlineUserAdd />} colorScheme="teal">
              Ajouter un patient
            </Button>
            <Button
              leftIcon={<GrGroup />}
              variant={"outline"}
              colorScheme="teal"
            >
              Voir mes patients
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
}

export default HomeScreen;
