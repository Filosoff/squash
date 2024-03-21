import { createRoot } from 'react-dom/client';
import AppComponent from "./components/AppComponent";
import { CssBaseline } from "@mui/material";

const domNode: HTMLElement = document.getElementById('app')!;
const root = createRoot(domNode);
root.render(
  <>
    <CssBaseline />
    <AppComponent />
  </>
);