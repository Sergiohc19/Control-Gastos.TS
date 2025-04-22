import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BugdetProvider } from "./context/BudgetContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BugdetProvider>
      <App />
    </BugdetProvider>
  </StrictMode>
);
