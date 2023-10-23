import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Theme>
        <App />
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>
);
