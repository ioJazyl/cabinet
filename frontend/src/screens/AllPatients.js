import {
  Grid,
  Input,
  SimpleGrid,
  Text,
  Box,
  Heading,
  Divider,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import Patient from "../components/Patient";
import usePatients from "../hooks/usePatients.js";
import { useState } from "react";
import ReactPaginate from "react-paginate";

function AllPatients() {
  const [currentPage, setCurrentPage] = useState(0); // Current page index

  const [query, setQuery] = useState("");
  const { patients: patientsPerPage, isLoading } = usePatients(
    currentPage,
    query,
  );
  const { patients, pagination } = patientsPerPage;

  function handlePageChange({ selected }) {
    setCurrentPage(selected);
  }
  if (!patients)
    return (
      <Flex
        minH={"full"}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        rounded={"lg"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner color="teal.500" size={"xl"} />
      </Flex>
    );
  return (
    <Grid
      gap={4}
      px={7}
      rounded={"lg"}
      minH={"full"}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Heading color="teal.500" mt={4}>
        Mes Patients
      </Heading>

      <>
        {patientsPerPage.patients && patientsPerPage.patients.length === 0 ? (
          <Text size="md" fontWeight="semibold" color="gray">
            Vous avez 0 patients...
            <Input
              placeholder="Rechercher..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              bg={"white"}
            />
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
              {patients &&
                patients.map((patient) => (
                  <Patient patient={patient} key={patient._id} />
                ))}
            </SimpleGrid>
            <Box>
              <ReactPaginate
                className="flex justify-center rounded-lg py-2 text-sm font-semibold "
                breakLabel="..."
                nextLabel="Suivant"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={pagination ? Math.ceil(pagination.pageCount) : 0}
                previousLabel="Precedent"
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
              <Divider />
            </Box>
          </>
        )}
      </>
    </Grid>
  );
}

export default AllPatients;
