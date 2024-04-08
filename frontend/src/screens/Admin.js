import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import useGetVisits from "../hooks/useAllVisits";
import formatDate from "../utils/formatDate";
import { GiMoneyStack } from "react-icons/gi";
import ReactPaginate from "react-paginate";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const mdp = "werbrouckroland";

function Admin() {
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(Date.now()); // Convert JavaScript timestamp to "YYYY-MM-DD" string
  const [currentPage, setCurrentPage] = useState(0);
  const { visits: data, monthlyPayment } = useGetVisits(
    formatDate(date),
    currentPage,
  );
  const { visits: allVisits, pageCount, visitsAll } = data;
  function handleDelete() {
    setPassword((p) => (p = ""));
  }
  function handlePageChange({ selected }) {
    setCurrentPage(selected);
  }
  const totalPayment =
    visitsAll?.reduce((total, visit) => total + visit.payment, 0) || 0;

  return (
    <Box
      px={7}
      rounded={"lg"}
      minH={"full"}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Flex my={4}>
        <IconButton icon={<AiOutlineUser />} />
        <Box ml="3">
          <Text fontWeight="bold">
            Zioui Mounir
            <Badge ml="1" colorScheme="green">
              Actif
            </Badge>
          </Text>
          <Text fontSize="sm">Docteur Traumatologue</Text>
        </Box>
      </Flex>
      <form className="mb-4 flex w-1/3 gap-2">
        <Input
          bg={"white"}
          value={password}
          placeholder="Inserez Mot de Passe"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            letterSpacing: "0.1em",
            color: "transparent",
            border: "solid 0.5px gray",
          }}
        />
        <Button onClick={handleDelete} colorScheme="teal">
          Vider
        </Button>
      </form>
      {password === mdp && (
        <Box>
          <form>
            <FormControl>
              <FormLabel>Selectionner une date</FormLabel>
              <Input
                bg={"white"}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                w={1 / 3}
                border={"0.7px solid gray"}
              />
            </FormControl>
          </form>
          <Flex gap={3} flexDirection={"column"} mt={4}>
            <Box display={"flex"} gap={4}>
              <Stat
                w={"fit-content"}
                py={3}
                px={5}
                rounded={"lg"}
                bg={"black"}
                color={"white"}
              >
                <StatLabel>Gain Journalier</StatLabel>
                <StatNumber>{totalPayment}.DA</StatNumber>
                <StatHelpText>{formatDate(date)}</StatHelpText>
              </Stat>{" "}
              <Stat
                w={"fit-content"}
                py={3}
                px={5}
                rounded={"lg"}
                bg={"darkorange"}
                color={"white"}
              >
                <StatLabel>Gain Mensuel</StatLabel>
                <StatNumber>{monthlyPayment}.DA</StatNumber>
                <StatHelpText>{formatDate(date)}</StatHelpText>
              </Stat>
            </Box>
            <Grid templateColumns="1fr 1fr" gap={4}>
              {allVisits.map((visit, i) => (
                <Link to={`/patients/${visit.patient}`} key={visit._id}>
                  <Flex
                    justifyContent={"space-between"}
                    w={"full"}
                    borderBottom={"1px"}
                    borderColor={"gray.300"}
                    py={2}
                    px={4}
                    bg={"gray.50"}
                    rounded={"lg"}
                  >
                    <Grid gap={1}>
                      <Heading size={"sm"}>
                        {visit.name} {visit.firstName}
                      </Heading>
                      <Text
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        maxWidth="17rem"
                      >
                        {i + 1} || {visit.observation}
                      </Text>
                    </Grid>

                    <Tag size={"lg"} variant="solid" colorScheme="gray">
                      <TagLeftIcon as={GiMoneyStack} />
                      <TagLabel>{visit.payment}</TagLabel>
                    </Tag>
                  </Flex>
                </Link>
              ))}
            </Grid>
          </Flex>
          <ReactPaginate
            className="flex justify-center rounded-lg py-2 text-sm font-semibold "
            breakLabel="..."
            nextLabel="Suivant"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount ? Math.ceil(pageCount) : 0}
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
        </Box>
      )}
    </Box>
  );
}

export default Admin;
