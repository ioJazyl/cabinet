import { Box, Heading, Text } from "@chakra-ui/react";
import usePatients from "../hooks/usePatients";

function HomeScreen() {
  const { patients } = usePatients();
  return (
    <Box className="mt-4 flex w-full items-center justify-between">
      <Heading>Bienvenue, Mounir</Heading>
      <Text className="mr-4">
        {patients.length} Patients dans la base de donnée.
      </Text>
    </Box>
  );
}

export default HomeScreen;
