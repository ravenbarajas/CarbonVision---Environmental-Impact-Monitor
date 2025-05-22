import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { CarbonProvider } from "@/context/carbon-context";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <CarbonProvider>
      <App />
    </CarbonProvider>
  </ThemeProvider>
);
