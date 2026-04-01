import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BreadcrumbPage from "./pages/BreadcrumbPage.jsx";
import { RouteTransitionProvider } from "./components/RouteTransitionProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTransitionProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/explore" element={<BreadcrumbPage title="Explore" />} />
          <Route path="/evaluate" element={<BreadcrumbPage title="Evaluate" />} />
          <Route path="/extend" element={<BreadcrumbPage title="Extend" />} />
          <Route path="/expand" element={<BreadcrumbPage title="Expand" />} />
          <Route path="/get-started" element={<BreadcrumbPage title="Get Started" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RouteTransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
