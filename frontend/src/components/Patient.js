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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import calcAge from "../utils/calcAge.js";
import { BsList } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import handleReload from "../utils/handleReload.js";

function Patient({ patient, onUpdatePatients }) {
  const {
    name,
    firstName,
    age,
    telephone,
    diagnostic,
    createdAt,
    _id: id,
  } = patient;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleDelete(id) {
    try {
      await axios.post("http://localhost:8000/patients/delete", {
        id,
      });

      toast({
        title: "Patient supprimé",
        description: "Patient supprimé de la base de donnée",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "top",
      });

      handleReload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card borderTop={"8px"} borderColor={"teal.100"} bg={"white"}>
      <CardHeader>
        <Heading size="md">
          {name} {firstName}
        </Heading>
        <Text>{calcAge(age)} ans</Text>
      </CardHeader>
      <CardBody>
        <Heading size={"sm"} mb={1}>
          Diagnostic
        </Heading>
        <Textarea readOnly defaultValue={diagnostic} />
      </CardBody>
      <Box className="mx-auto w-fit rounded-lg border border-zinc-100 bg-teal-100 p-2 font-bold text-teal-900">
        Tel: {telephone}
      </Box>
      <CardFooter gap={3} display={"grid"}>
        <Box borderTop={"1px"} borderColor={"gray.50"} padding={2}>
          <Text
            fontSize={"sm"}
            fontWeight={"semibold"}
            color={"teal.700"}
            textAlign={"center"}
          >
            Créer le {formatDate(createdAt)}
          </Text>
        </Box>
        <Box display={"grid"} gap={2}>
          <Link to={`/patients/${id}`}>
            <Button rightIcon={<BsList />} w={"full"} colorScheme="teal">
              Consulter
            </Button>
          </Link>

          <>
            <Button
              rightIcon={<MdDeleteOutline />}
              onClick={onOpen}
              variant={"outline"}
              colorScheme="red"
            >
              Supprimer
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Supprimer le patient ?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Voulez-vous vraiment supprimer le patient ?</Text>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="teal"
                    variant={"outline"}
                    mr={3}
                    onClick={onClose}
                  >
                    Fermer
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => handleDelete(id)}
                  >
                    Oui,Supprimer
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>

          {/* <Button
            colorScheme={"red"}
            variant={"outline"}
            onClick={() => handleDelete(id)}
          >
            Supprimer
          </Button> */}
        </Box>
      </CardFooter>
    </Card>
  );
}

export default Patient;
