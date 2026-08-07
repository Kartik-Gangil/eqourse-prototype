import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Production HTML contains a semantic, crawlable fallback generated at build
// time. Clear it immediately before React mounts so users get the full app
// without duplicate headings or content flashes.
rootElement.replaceChildren();
createRoot(rootElement).render(<App />);
