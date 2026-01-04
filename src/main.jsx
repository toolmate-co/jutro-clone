import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { IntlProvider } from "react-intl";
import { messages } from "@i18n";
import "@/styles/index.scss";

const locale = "en";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  </StrictMode>
);
