import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BreadcrumbPage from "./components/BreadcrumbPage.jsx";
import { RouteTransitionProvider } from "./components/RouteTransitionProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTransitionProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/students/school-students" element={<BreadcrumbPage title="School Students" />} />
          <Route path="/students/college-students" element={<BreadcrumbPage title="College Students" />} />
          <Route path="/school-organizations" element={<BreadcrumbPage title="School Organizations" />} />
          <Route path="/college-organizations" element={<BreadcrumbPage title="College Organizations" />} />
          <Route path="/learning-hub" element={<BreadcrumbPage title="Learning Hub" />} />
          <Route path="/get-started" element={<BreadcrumbPage title="Get Started" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RouteTransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
