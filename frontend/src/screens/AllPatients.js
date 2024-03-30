import { Grid, Input, SimpleGrid, Text, Box, Heading } from "@chakra-ui/react";
import Patient from "../components/Patient";
import usePatients from "../hooks/usePatients.js";
import { useState } from "react";
import ReactPaginate from "react-paginate";

function AllPatients() {
  const [currentPage, setCurrentPage] = useState(0); // Current page index

  const { patients: data } = usePatients(currentPage);
  const { patients, pagination } = data;
  console.log(patients);
  function handlePageChange({ selected }) {
    setCurrentPage((s) => selected);
  }
  console.log(currentPage);
  return (
    <Grid mr={4} gap={4}>
      <Heading mt={4}>Mes Patients</Heading>

      <Input placeholder="Rechercher..." />
      {data.length === 0 ? (
        <Text size={"md"} fontWeight={"semibold"} color={"gray"}>
          Vous avez 0 patients...
        </Text>
      ) : (
        <>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            mb={4}
          >
            {patients.map((patient) => (
              <Patient patient={patient} key={patient._id} />
            ))}
          </SimpleGrid>
          <Box>
            <ReactPaginate
              className=" flex justify-center rounded-sm bg-teal-50 py-2 font-semibold"
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={pagination.pageCount}
              previousLabel="< previous"
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
          </Box>
        </>
      )}
    </Grid>
  );
}

export default AllPatients;
