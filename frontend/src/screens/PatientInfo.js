import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import usePatientById from "../hooks/usePatientById";
import calcAge from "../utils/calcAge";
import formatDate from "../utils/formatDate";
import { useState } from "react";
import axios from "axios";

function PatientInfo() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [observation, setObservation] = useState("");

  const { patientInfo, isLoading, visits } = usePatientById(id);
  console.log(visits);
  // eslint-disable-next-line no-unused-vars
  const { name, firstName, age, diagnostic } = patientInfo || {};
  const toast = useToast();
  async function handleSubmitObservation() {
    try {
      await axios.post("http://localhost:8000/patients/new-visit", {
        observation,
        patient: id,
      });

      toast({
        title: "Visite Ajouté",
        description: "Vous avez ajouté une Visite au patient",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "top",
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!patientInfo) return <Box>Loading</Box>;
  return (
    <>
      {!isLoading && (
        <Card>
          <CardHeader>
            <Heading size="md">
              Patient: {name} {firstName}
            </Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Coordonées Personnelles
                </Heading>
                <Text pt="2" fontSize="md" color={"gray.700"}>
                  {name} {firstName}, {calcAge(age)} ans.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Diagnostic
                </Heading>
                <Text pt="2" fontSize="sm" fontStyle={"italic"}>
                  {diagnostic}
                </Text>
              </Box>
              <Divider />
              {visits.map((visit, i) => (
                <Flex justifyContent={"space-between"}>
                  <Box>
                    <Text>Visite N:{i + 1}</Text>
                    <Text>{visit.observation}</Text>
                  </Box>
                  <Box>{formatDate(visit.createdAt)}</Box>
                </Flex>
              ))}
              <Flex flexDirection={"column"} gap={2}>
                {isOpen && (
                  <>
                    <Box>
                      <Textarea />
                    </Box>
                  </>
                )}
                <Button onClick={onOpen} variant={"outline"} colorScheme="teal">
                  Ajouter Visite
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Ajouter une visite?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Ajouter une observation</FormLabel>
                        <Textarea
                          value={observation}
                          onChange={(e) => setObservation(e.target.value)}
                        />
                      </FormControl>
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
                        colorScheme="teal"
                        onClick={handleSubmitObservation}
                      >
                        Oui, Ajouter Visite
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default PatientInfo;
