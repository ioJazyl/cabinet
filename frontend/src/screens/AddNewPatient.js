import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { GrFormAdd } from "react-icons/gr";

function AddNewPatient() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    firstName: "",
    age: "",
    telephone: "",
    diagnostic: "",
    dEnter: "",
    dExit: "",
    dOperation: "",
    payment: 0,
  });

  const navigate = useNavigate();
  const toast = useToast();

  function handleChange(e) {
    setPatientInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const {
    name,
    firstName,
    age,
    telephone,
    diagnostic,
    dEnter,
    dExit,
    dOperation,
    observation,
    payment,
  } = patientInfo;
  const [isOperated, setIsOperated] = useState("false");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/patients/new", {
        name,
        firstName,
        age,
        diagnostic,
        observation,
        telephone,
        dEnter,
        dExit,
        payment,
      });

      toast({
        title: "Patient Ajouté",
        description: "Vous avez ajouté un patient à la base de donnée",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "top",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mr-4">
      <Heading color="teal.400" mb={5} mt={4}>
        Ajouter un patient
      </Heading>
      <Divider mb={5} />
      <form onSubmit={handleSubmit}>
        <Flex minW={"max-content"} gap={2}>
          <Box w={"full"}>
            <FormControl isRequired>
              <FormLabel>Nom</FormLabel>
              <Input type="text" name="name" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt={4}>Prénom</FormLabel>
              <Input type="text" name="firstName" onChange={handleChange} />
            </FormControl>
            <FormControl>
              {/* TODO : change the field age */}
              <FormLabel mt={4}>Age</FormLabel>
              <Input
                type="date"
                name="age"
                value={age}
                onChange={handleChange}
              />
            </FormControl>
          </Box>

          <Box w={"full"}>
            <FormControl>
              <FormLabel>Telephone</FormLabel>
              <Input type="number" name="telephone" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Diagnostic</FormLabel>
              <Textarea type="text" name="diagnostic" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Observation</FormLabel>
              <Textarea
                mb={1}
                type="text"
                name="observation"
                onChange={handleChange}
              />
              <Input
                placeholder="payment"
                type="number"
                name="payment"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4} as="legend">
                Operation EOS
              </FormLabel>

              <RadioGroup defaultValue={isOperated} onChange={setIsOperated}>
                <HStack spacing="24px">
                  <Radio value="false" isChecked={isOperated === "false"}>
                    Non
                  </Radio>
                  <Radio value="true" isChecked={isOperated === "true"}>
                    Oui
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Box>
        </Flex>
        {isOperated === "true" && (
          <FormControl mt={3}>
            <Flex justifyContent={"space-around"}>
              <Box>
                <FormLabel>Date Opération</FormLabel>
                <Input
                  type="date"
                  name="dOperation"
                  value={dOperation}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Date Entrée</FormLabel>
                <Input
                  type="date"
                  name="dEnter"
                  value={dEnter}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel>Date Sortie</FormLabel>
                <Input
                  type="date"
                  name="dExit"
                  value={dExit}
                  onChange={handleChange}
                />
              </Box>
            </Flex>
          </FormControl>
        )}
        <Button
          rightIcon={<GrFormAdd />}
          colorScheme="teal"
          mt={6}
          type="submit"
          w="full"
        >
          Creer Patient
        </Button>
      </form>
    </div>
  );
}

export default AddNewPatient;
