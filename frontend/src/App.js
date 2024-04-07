import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header";
import { ChakraProvider, Grid } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Grid
        templateColumns="1fr 4fr "
        alignItems={"start"}
        p={4}
        gap={4}
        className="flex min-h-screen w-full flex-col items-center justify-center gap-5"
        style={{
          position: "relative",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/bgCabinet.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Sidebar />
        <Outlet />
      </Grid>
    </ChakraProvider>
  );
}

export default App;
