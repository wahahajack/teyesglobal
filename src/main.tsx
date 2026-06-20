import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { initDataLayer, loadGtmWhenIdle, persistAdParams } from "./lib/tracking";

initDataLayer();
persistAdParams();

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);

loadGtmWhenIdle();