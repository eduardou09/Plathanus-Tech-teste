import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout/layout.jsx";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);
