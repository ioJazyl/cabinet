import { useNavigate, useParams } from "react-router-dom";
// import usePatientById from "../hooks/usePatientById";
import {
  Card,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Divider,
  Grid,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDate from "../utils/formatDate";

function EditPatient() {
  const { id: patientID } = useParams();
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [dEnter, setDenter] = useState("");
  const [dOperation, setDoperation] = useState("");
  const [dExit, setDexit] = useState("");
  const [telephone, setTelephone] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  // Add more state variables for other fields if needed

  useEffect(() => {
    // Fetch patient's information by ID when component mounts
    axios
      .get(`http://localhost:8000/patients/${patientID}`)
      .then((response) => {
        const {
          name,
          firstName,
          age,
          diagnostic,
          telephone,
          dEnter,
          dExit,
          dOperation,
        } = response.data.patient;
        // Populate input fields with fetched data
        setName(name);
        setFirstName(firstName);
        setAge(formatDate(age));
        setDiagnostic(diagnostic);
        setDenter(formatDate(dEnter));
        setDexit(formatDate(dExit));
        setDoperation(formatDate(dOperation));
        setTelephone(telephone);

        // Set other state variables if needed
      })
      .catch((error) => {
        console.error("Error fetching patient information:", error);
      });
  }, [patientID]);
  console.log(name, firstName, dExit, dEnter, dOperation, telephone, age);

  async function handleSave(e) {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/patients/${patientID}/update-patient`,
        {
          name,
          firstName,
          age,
          diagnostic,
          telephone,
          dEnter,
          dExit,
          dOperation,
        },
      );

      toast({
        title: "Patient Modifié",
        description: "Vous avez modifié un patient",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "right",
      });
      navigate(`/patients/${patientID}`);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(dOperation, diagnostic, telephone);
  return (
    <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }} px={7} py={4}>
      <Heading size={"lg"} mb={4}>
        Modification du patient
      </Heading>
      <Divider color={"gray.400"} mb={4} />
      <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
        <Grid gap={4}>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <Input
              bg={"white"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Prenom</FormLabel>

            <Input
              bg={"white"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <Input
              bg={"white"}
              type="date"
              value={age || ""}
              onChange={(e) => setAge(e.target.value)}
            />
            <FormHelperText>{formatDate(age)}</FormHelperText>
          </FormControl>
          <Divider />
          <FormControl>
            <FormLabel>Diagnostic</FormLabel>

            <Input
              bg={"white"}
              type="text"
              value={diagnostic}
              onChange={(e) => setDiagnostic(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Telephone</FormLabel>

            <Input
              bg={"white"}
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid h={"fit-content"} gap={4}>
          <FormControl>
            <FormLabel>Date Entrée</FormLabel>
            <Input
              bg={"white"}
              type="date"
              value={dEnter || ""}
              onChange={(e) => setDenter(e.target.value)}
            />
            <FormHelperText>{formatDate(dEnter)}</FormHelperText>
          </FormControl>
          <Divider />
          <FormControl>
            <FormLabel>Date Sortie</FormLabel>
            <Input
              bg={"white"}
              type="date"
              value={dExit || ""}
              onChange={(e) => setDexit(e.target.value)}
            />
            <FormHelperText>{formatDate(dExit)}</FormHelperText>
          </FormControl>
          <Divider />
          <FormControl>
            <FormLabel>Date Operation</FormLabel>
            <Input
              bg={"white"}
              type="date"
              value={dOperation || ""}
              onChange={(e) => setDoperation(e.target.value)}
            />
            <FormHelperText>{formatDate(dOperation)}</FormHelperText>
          </FormControl>
        </Grid>
        <Flex justifyContent={"end"} mt={1} gap={4} className="col-span-2">
          <Button
            mt={2}
            size={"md"}
            colorScheme="green"
            w={"full"}
            variant={"outline"}
            onClick={() => navigate(`/patients/${patientID}`)}
          >
            Retour
          </Button>
          <Button
            type="submit"
            mt={2}
            size={"md"}
            colorScheme="green"
            w={"full"}
          >
            Save
          </Button>
        </Flex>
      </form>
    </Card>
  );
}

export default EditPatient;
