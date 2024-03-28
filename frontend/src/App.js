import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header";
import { ChakraProvider, Grid } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Grid templateColumns="1fr 4fr " alignItems={"start"} gap={4}>
        <Sidebar />
        <Outlet />
      </Grid>
    </ChakraProvider>
  );
}

export default App;
