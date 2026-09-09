import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { initEmailAttributionContext } from "./lib/emailAttribution";
import {
  initDataLayer,
  installContactEntryTracking,
  installPageJourneyTracking,
  loadGtmWhenIdle,
  persistAdParams,
} from "./lib/tracking";

initDataLayer();
initEmailAttributionContext();
persistAdParams();
installContactEntryTracking();
installPageJourneyTracking();

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);

loadGtmWhenIdle();
