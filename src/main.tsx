import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/style/globals.css";

import RootLayout from "./layout/index.tsx";
import RouteConfigures from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <RootLayout>
        <RouteConfigures />
      </RootLayout>
    </StrictMode>
  </BrowserRouter>
);
