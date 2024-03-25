import { HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon, SearchIcon, TriangleUpIcon } from "@chakra-ui/icons";

function Header() {
  return (
    <SimpleGrid
      color="white"
      borderColor="lightgray"
      bg="teal.400"
      h="100vh"
      pt={4}
    >
      <VStack align="start">
        <Link
          to="/"
          className="w-full rounded-full px-3 py-3 font-semibold transition-all hover:bg-green-200 hover:text-zinc-700"
        >
          <HStack>
            <TriangleUpIcon /> <p>Home</p>
          </HStack>
        </Link>
        <Link
          to="/patients/new"
          className="w-full rounded-full px-3 py-3 font-semibold transition-all hover:bg-green-200 hover:text-zinc-700"
        >
          <HStack>
            <AddIcon /> <p>Ajouter un patient</p>
          </HStack>
        </Link>
        <Link
          to="/patients"
          className="w-full rounded-full px-3 py-3 font-semibold transition-all hover:bg-green-200 hover:text-zinc-700"
        >
          <HStack>
            <SearchIcon /> <p>Tout mes patients</p>
          </HStack>
        </Link>
      </VStack>
    </SimpleGrid>
    // <div className=" flex h-screen w-80 flex-col border-r-2 border-zinc-300 bg-slate-200 pt-4">
    //   <strong className="mb-3 text-center text-2xl text-blue-700">
    //     <Link to="/">Cabinet Zioui</Link>
    //   </strong>
    //   <Link
    //     to="/patients/new"
    //     className="border-b-2 bg-slate-100 p-4 text-center  transition-colors hover:bg-blue-500 hover:text-white"
    //   >
    //     Ajouter un patient
    //   </Link>
    //   <Link
    //     to="/patients"
    //     className="bg-slate-100 p-4 text-center  transition-colors hover:bg-blue-500 hover:text-white"
    //   >
    //     Mes Patients
    //   </Link>
    // </div>
  );
}

export default Header;
