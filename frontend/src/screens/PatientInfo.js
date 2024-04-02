import React, { useState, useEffect } from "react";
import axios from "axios";
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
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import usePatientById from "../hooks/usePatientById";
import calcAge from "../utils/calcAge";
import formatDate from "../utils/formatDate";
import { GiMoneyStack } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
function PatientInfo() {
  const { id: patientID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [observation, setObservation] = useState("");
  const [payment, setPayment] = useState(0);
  const { patientInfo, isLoading, visits } = usePatientById(patientID);
  const toast = useToast();
  const [allVisits, setAllVisits] = useState([]);

  useEffect(() => {
    if (visits && visits.length > 0) {
      setAllVisits(visits);
    }
  }, [visits]);

  async function handleReload() {
    window.location.reload();
  }

  async function handleSubmitObservation() {
    try {
      await axios.post("http://localhost:8000/patients/new-visit", {
        observation,
        payment,
        patient: patientID,
      });

      toast({
        title: "Visite Ajoutée",
        description: "Vous avez ajouté une visite au patient.",
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

  async function handleDelete(id) {
    try {
      await axios.post("http://localhost:8000/visits/delete-id", { id });

      // Remove the deleted visit from allVisits state
      setAllVisits((prevVisits) =>
        prevVisits.filter((visit) => visit.id !== id),
      );

      toast({
        title: "Visite supprimée",
        description: "La visite a été supprimée avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      handleReload();
    } catch (error) {
      console.error(error);

      toast({
        title: "Erreur de suppression",
        description: `Une erreur est survenue lors de la suppression de la visite avec l'identifiant ${id}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  if (!patientInfo) return <Box>Loading</Box>;

  const { name, firstName, age, diagnostic } = patientInfo;

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
                  Coordonnées Personnelles
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
              {allVisits.map((visit, i) => (
                <Flex justifyContent={"space-between"} key={i}>
                  <Box display={"grid"} gap={2}>
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      Visite N:{i + 1}
                    </Text>

                    <Box>
                      <Heading size={"sm"}>Observation:</Heading>
                      <Text>{visit.observation}</Text>
                    </Box>
                  </Box>
                  <Box display={"grid"} gap={2}>
                    <Box fontWeight={"semibold"} fontSize={"sm"}>
                      {formatDate(visit.createdAt)}
                    </Box>

                    <Tag size={"lg"} variant="subtle" colorScheme="teal">
                      <TagLeftIcon as={GiMoneyStack} />
                      <TagLabel>{visit.payment}</TagLabel>
                    </Tag>
                    <Flex gap={2}>
                      <IconButton
                        icon={<AiOutlineEdit />}
                        variant={"outline"}
                      />
                      <IconButton
                        icon={<MdDeleteOutline />}
                        colorScheme="red"
                        variant={"outline"}
                        onClick={() => handleDelete(visit._id)}
                      />
                    </Flex>
                  </Box>
                </Flex>
              ))}
              <Flex flexDirection={"column"} gap={2}>
                <Button onClick={onOpen} variant={"outline"} colorScheme="teal">
                  Ajouter Visite
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Ajouter une visite</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Ajouter une observation</FormLabel>
                        <Textarea
                          value={observation}
                          onChange={(e) => setObservation(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Paiement</FormLabel>
                        <Input
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
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
                        Ajouter Visite
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
