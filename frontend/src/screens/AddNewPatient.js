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
  console.log();
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
        dOperation,
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
    <Box
      h={"full"}
      px={7}
      pb={4}
      rounded={"lg"}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Heading color="teal.500" mb={5} mt={4}>
        Ajouter un patient
      </Heading>
      <Divider mb={5} />
      <form onSubmit={handleSubmit}>
        <Flex minW={"max-content"} gap={2}>
          <Box w={"full"}>
            <FormControl isRequired>
              <FormLabel>Nom</FormLabel>
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                bg={"white"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt={4}>Prénom</FormLabel>
              <Input
                type="text"
                name="firstName"
                onChange={handleChange}
                bg={"white"}
              />
            </FormControl>
            <FormControl>
              {/* TODO : change the field age */}
              <FormLabel mt={4}>Age</FormLabel>
              <Input
                type="date"
                name="age"
                value={age}
                onChange={handleChange}
                bg={"white"}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4} as="legend">
                Operation EOS
              </FormLabel>
              <RadioGroup defaultValue={isOperated} onChange={setIsOperated}>
                <HStack spacing="24px">
                  <Radio
                    value="false"
                    isChecked={isOperated === "false"}
                    bg={"white"}
                  >
                    Non
                  </Radio>
                  <Radio
                    value="true"
                    isChecked={isOperated === "true"}
                    bg={"white"}
                  >
                    Oui
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            {isOperated === "true" && (
              <FormControl>
                <Flex
                  justifyContent={"space-around"}
                  mt={4}
                  border={"0.5px solid lightgray"}
                  rounded={"lg"}
                  py={2}
                  px={2}
                >
                  <Box>
                    <FormLabel>Date Opération</FormLabel>
                    <Input
                      size={"sm"}
                      type="date"
                      name="dOperation"
                      value={dOperation}
                      onChange={handleChange}
                      bg={"white"}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Date Entrée</FormLabel>
                    <Input
                      size={"sm"}
                      type="date"
                      name="dEnter"
                      value={dEnter}
                      onChange={handleChange}
                      bg={"white"}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Date Sortie</FormLabel>
                    <Input
                      size={"sm"}
                      type="date"
                      name="dExit"
                      value={dExit}
                      onChange={handleChange}
                      bg={"white"}
                    />
                  </Box>
                </Flex>
              </FormControl>
            )}
          </Box>

          <Box w={"full"}>
            <FormControl>
              <FormLabel>Telephone</FormLabel>
              <Input
                type="number"
                name="telephone"
                onChange={handleChange}
                bg={"white"}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Diagnostic</FormLabel>
              <Textarea
                type="text"
                name="diagnostic"
                onChange={handleChange}
                bg={"white"}
              />
            </FormControl>

            <Box border={"2px dashed gray"} rounded={"lg"} p={2} mt={4}>
              <Heading mb={1} size={"sm"}>
                1ere Visite
              </Heading>
              <Divider mb={2} />
              <FormControl>
                <FormLabel>Observation</FormLabel>
                <Textarea
                  mb={1}
                  type="text"
                  name="observation"
                  onChange={handleChange}
                  bg={"white"}
                />
                <FormLabel mt={4}>Paiement</FormLabel>

                <Input
                  placeholder="payment"
                  type="number"
                  name="payment"
                  onChange={handleChange}
                  bg={"white"}
                />
              </FormControl>
            </Box>
          </Box>
        </Flex>

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
    </Box>
  );
}

export default AddNewPatient;
