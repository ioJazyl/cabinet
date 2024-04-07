import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
  CardFooter,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  Grid,
} from "@chakra-ui/react";
import usePatientById from "../hooks/usePatientById";
import calcAge from "../utils/calcAge";
import formatDate from "../utils/formatDate";
import { GiMoneyStack } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import handleReload from "../utils/handleReload.js";
import useVisitsCount from "../hooks/useVisitCount.js";
function PatientInfo() {
  const { id: patientID } = useParams();
  const { countPage } = useVisitsCount(patientID);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen2, setIsOpen2] = useState(false);

  const [observation, setObservation] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [allVisits, setAllVisits] = useState([]);
  const [payment, setPayment] = useState(0);
  const { patientInfo, isLoading, visits } = usePatientById(
    patientID,
    currentPage,
  );
  const { name, firstName, age, diagnostic, dEnter, dExit, dOperation } =
    patientInfo;
  const navigate = useNavigate();
  const countPageRef = useRef(countPage);

  const toast = useToast();
  // const { pageCount } = pagination;

  useEffect(() => {
    if (visits && visits.length > 0) {
      setAllVisits(visits);
    }
  }, [visits]);

  useEffect(() => {
    // Update the ref value whenever countPage changes
    countPageRef.current = countPage;
  }, [countPage]);

  const onClose2 = () => {
    setIsOpen2(false);
    setObservation("");
    setPayment("");
  };

  async function handleSave(idSelected) {
    try {
      // Make sure patientID, observation, and payment are defined correctly
      await axios.put("http://localhost:8000/visits/update", {
        id: idSelected,
        observation,
        payment,
      });

      // Show success toast notification
      toast({
        title: "Visite Modifiée",
        description: "Vous avez modifié une visite.",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "top",
      });

      // Reload data or perform other necessary actions
      handleReload();
    } catch (error) {
      // Handle errors appropriately, such as displaying error messages to the user or logging them for debugging
      console.error(error);
    }

    // Close the modal
    onClose();
  }

  async function handleSubmitObservation() {
    try {
      await axios.post("http://localhost:8000/patients/new-visit", {
        observation,
        payment,
        patient: patientID,
        name,
        firstName,
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
  //pagination isnt hchanging

  async function handleDelete(id) {
    try {
      await axios.post("http://localhost:8000/visits/delete-id", { id });

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
        description: `Une erreur est survenue lors de la suppression de la visite avec l'identifiant ${patientID}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function handlePageChange({ selected }) {
    setCurrentPage((s) => selected);
  }

  async function handleDeletePatient() {
    try {
      await axios.delete(`http://localhost:8000/patients/${patientID}`);

      toast({
        title: "Patient Supprimé",
        description: "Le patient a été supprimée avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Erreur de suppression",
        description: `Une erreur est survenue lors de la suppression du patient avec l'identifiant ${patientID}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    navigate("/patients");
  }

  if (!patientInfo) return <Box>Loading</Box>;

  return (
    <>
      {!isLoading && (
        <Card pl={4} w={"full"}>
          <CardHeader display={"flex"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
              <Heading
                size="md"
                px={3}
                py={2}
                border={"1px solid lightgray"}
                rounded={"lg"}
              >
                Patient: {name} {firstName}{" "}
                <Text pt="2" fontSize="md" color={"gray.700"}>
                  Age: {calcAge(age)} ans.
                </Text>
              </Heading>
              <Link to={`/patients/${patientID}/edit`}>
                <Button leftIcon={<AiOutlineEdit />}>Modifier</Button>
              </Link>
            </Flex>
            <Button colorScheme="red" onClick={handleDeletePatient}>
              Supprimer le patient
            </Button>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="1">
              <Box display={"grid"} gap={2}>
                <Box display={"grid"}>
                  <Heading size="xs" textTransform="uppercase" mb={1}>
                    Diagnostic
                  </Heading>
                  <Textarea
                    readOnly
                    defaultValue={diagnostic}
                    bg={"teal.50"}
                    border={"1px solid teal"}
                    h={"fit-content"}
                    pt="2"
                    fontSize="sm"
                    fontStyle={"italic"}
                  />
                </Box>
                <Box display={"flex"} gap={3}>
                  <Tag size={"lg"} variant="outline" colorScheme="gray">
                    <TagLabel>Date Operation {formatDate(dOperation)}</TagLabel>
                  </Tag>
                  <Tag size={"lg"} variant="outline" colorScheme="gray">
                    <TagLabel>Date Entrée {formatDate(dEnter)}</TagLabel>
                  </Tag>
                  <Tag size={"lg"} variant="outline" colorScheme="gray">
                    <TagLabel>Date Sortie {formatDate(dExit)}</TagLabel>
                  </Tag>
                </Box>
              </Box>
              <Box
                border={"1px solid lightgray"}
                w={"20%"}
                rounded={"full"}
                mx={"auto"}
              ></Box>
              <Grid templateColumns={"1fr 1fr"} gap={4}>
                {allVisits.map((visit, i) => (
                  <Card align="center" key={i} size={"sm"}>
                    <CardHeader textAlign={"center"}>
                      <Heading size="md">Observation {i + 1}</Heading>
                      <Heading size="sm" color={"gray"}>
                        {" "}
                        {formatDate(visit.createdAt)}
                      </Heading>
                    </CardHeader>
                    <CardBody w={"full"}>
                      <Textarea
                        readOnly
                        defaultValue={visit.observation}
                        bg={"teal.50"}
                        border={"1px solid teal"}
                      />
                    </CardBody>
                    <CardFooter display={"flex"} gap={4}>
                      <IconButton
                        icon={<MdDeleteOutline />}
                        colorScheme="red"
                        variant={"outline"}
                        onClick={() => handleDelete(visit._id)}
                      />
                      <Tag size={"lg"} variant="subtle" colorScheme="teal">
                        <TagLeftIcon as={GiMoneyStack} />
                        <TagLabel>{visit.payment} .DA</TagLabel>
                      </Tag>
                      <>
                        <Button
                          leftIcon={<AiOutlineEdit />}
                          onClick={() => setIsOpen2(true)}
                        >
                          Modifier
                        </Button>
                        <Modal isOpen={isOpen2} onClose={onClose2}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>
                              Modifier Observation et Paiement
                            </ModalHeader>
                            <ModalBody>
                              <FormControl>
                                <FormLabel>Observation</FormLabel>
                                <Input
                                  type="text"
                                  value={observation}
                                  onChange={(e) =>
                                    setObservation(e.target.value)
                                  }
                                  placeholder="Modifier observation"
                                />
                              </FormControl>
                              <FormControl mt={4}>
                                <FormLabel>Payment</FormLabel>
                                <Input
                                  type="number"
                                  value={payment}
                                  onChange={(e) => setPayment(e.target.value)}
                                  placeholder="Modifier payment"
                                />
                              </FormControl>
                            </ModalBody>
                            <ModalFooter display={"flex"} gap={2}>
                              <Button
                                colorScheme="teal"
                                onClick={() => handleSave(visit._id)}
                              >
                                Modifier
                              </Button>
                              <Button variant="ghost" onClick={onClose2}>
                                Retour
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                    </CardFooter>
                  </Card>
                ))}
              </Grid>

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
          <CardFooter w={"full"} display={"flex"} justifyContent={"center"}>
            <ReactPaginate
              className=" flex justify-center rounded-sm py-2 font-semibold"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(countPage)}
              previousLabel="<"
              renderOnZeroPageCount={null}
              forcePage={currentPage} // Controlled currentPage
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                listStyle: "none",
                padding: 0,
              }}
              previousClassName="paginate-item"
              nextClassName="paginate-item"
              breakClassName="paginate-item"
              containerClassName="paginate-container"
              activeClassName="active"
              pageClassName="paginate-item"
            />

            <style>
              {`
    .paginate-item {
      margin: 0 5px;
      padding: 8px 12px; /* Adjust spacing */
      border-radius: 10px; /* Rounded shape */
      color: teal;
      cursor: pointer;
    }
    
    .active {
      color: white;
      background-color: teal;
    }
    `}
            </style>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default PatientInfo;
