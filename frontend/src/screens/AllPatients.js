import { Grid, Input, SimpleGrid, Text } from "@chakra-ui/react";
import Patient from "../components/Patient";
import usePatients from "../hooks/usePatients.js";
import { useEffect, useState } from "react";
import axios from "axios";
function AllPatients() {
  const { patients, handleQueryChange } = usePatients();
  const [searchQuery, setSearchQuery] = useState("");

  function handleChange(e) {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    handleQueryChange(newQuery); // Update the query in the hook
  }

  return (
    <Grid mr={4} gap={4}>
      <h1 className="mr-4 mt-2 rounded-md text-2xl font-bold">Mes Patients</h1>
      {patients.length === 0 ? (
        <Text size={"md"} mt={4} fontWeight={"semibold"} color={"gray"}>
          Vous avez 0 patients...
        </Text>
      ) : (
        <>
          <Input
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={handleChange}
          />
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            mb={4}
          >
            {patients.map((patient) => (
              <Patient patient={patient} key={patient._id} z />
            ))}
          </SimpleGrid>
        </>
      )}
    </Grid>
  );
}

export default AllPatients;
