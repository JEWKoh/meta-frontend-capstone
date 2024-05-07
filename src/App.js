import { ChakraProvider } from "@chakra-ui/react";
import { AlertProvider } from "./context/alertContext";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Pages from "./utils/Pages";
import Layout from "./shared/Layout";
import NotFound from "./components/NotFound";
import Reservations from "./pages/Reservations";
import Alert from "./components/Alert";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <div data-testid="app-component">
          <Layout>
            <Routes>
              <Route path={Pages.get("home").path} element={<Main />} />
              <Route path={Pages.get("about").path} element={<NotFound />} />
              <Route path={Pages.get("menu").path} element={<NotFound />} />
              <Route
                path={Pages.get("reservations").path}
                element={<Reservations />}
              />
              <Route path={Pages.get("orders").path} element={<NotFound />} />
              <Route path={Pages.get("login").path} element={<NotFound />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </Layout>
        </div>
        <Alert />
      </AlertProvider>
      </ChakraProvider>
  );
};

export default App;