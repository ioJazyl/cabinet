import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate.js";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
function Patient({ patient, onUpdatePatients }) {
  const {
    name,
    firstName,
    age,
    diagnostic,
    createdAt,
    updatedAt,
    _id: id,
  } = patient;

  const toast = useToast();

  async function handleDelete(id) {
    try {
      await axios.post("http://localhost:8000/patients/delete", {
        id,
      });
      onUpdatePatients();

      toast({
        title: "Patient Ajouté",
        description: "Vous avez ajouté un patient à la base de donnée",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "top",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card borderTop={"8px"} borderColor={"teal.300"} bg={"white"}>
      <CardHeader>
        <Heading size="md">
          {name} {firstName}
        </Heading>
        <Text>{age} ans</Text>
      </CardHeader>
      <CardBody>
        <Text>{diagnostic}</Text>
      </CardBody>
      <CardFooter gap={3} display={"grid"}>
        <Box borderTop={"1px"} borderColor={"gray.100"} padding={2}>
          <Text fontSize={"sm"} fontWeight={"semibold"} color={"teal.700"}>
            Créer le {formatDate(createdAt)}
          </Text>

          <Text fontSize={"sm"} fontWeight={"semibold"} color={"teal.700"}>
            Modifier le {formatDate(updatedAt)}
          </Text>
        </Box>
        <Box display={"grid"} gap={2}>
          <Link to={`/patients/${id}`}>
            <Button w={"full"} colorScheme="teal">
              Consulter
            </Button>
          </Link>
          <Button
            colorScheme={"red"}
            variant={"outline"}
            onClick={() => handleDelete(id)}
          >
            Supprimer
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
}

export default Patient;
