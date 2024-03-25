import { Outlet } from "react-router-dom";
import Header from "./components/Header.js";
import { ChakraProvider, Grid } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Grid templateColumns="1fr 4fr " alignItems={"start"} gap={4}>
        <Header />
        <Outlet />
      </Grid>
    </ChakraProvider>
  );
}

export default App;
