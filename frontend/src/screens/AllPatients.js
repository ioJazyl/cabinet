import { Grid, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import Patient from "../components/Patient";
import usePatients from "../hooks/usePatients.js";
import { useEffect, useState } from "react";
import axios from "axios";
function AllPatients() {
  const { patients } = usePatients();
  const [query, setQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  async function updatePatients() {
    try {
      const response = await axios.get("http://localhost:8000/patients");
      setFilteredPatients(response.data);
    } catch (error) {
      console.error("Error updating patients:", error);
    }
  }

  useEffect(() => {
    const updatedFilteredPatients = patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
        patient.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredPatients(updatedFilteredPatients);
  }, [patients, query]);

  return (
    <Grid mr={4} gap={4}>
      <h1 className="mr-4 mt-2 rounded-md text-2xl font-bold">Mes Patients</h1>
      {filteredPatients.length === 0 ? (
        <Text size={"md"} mt={4} fontWeight={"semibold"} color={"gray"}>
          Vous avez 0 patients...
        </Text>
      ) : (
        <>
          <Input
            placeholder="Rechercher..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            mb={4}
          >
            {filteredPatients.map((patient) => (
              <Patient
                patient={patient}
                key={patient._id}
                onUpdatePatients={updatePatients}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Grid>
  );
}

export default AllPatients;
