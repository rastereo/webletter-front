import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme.ts";
import App from "./App.tsx";
import "./index.css";
import WebletterView from "./pages/WebletterView.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/:id',
    element: <WebletterView />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
