import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { AppProvider } from "./AppContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ErrorBoundary>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </StrictMode>
  </BrowserRouter>
);
