import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme.ts";
// import App from "./App.tsx";
import "./index.css";
import Viewer from "./pages/viewer/Viewer.tsx";

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <App />
  // },
  {
    path: '/:id',
    element: <Viewer />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
