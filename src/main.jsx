import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import logoPngUrl from "./assets/images/logo.png?url";
import "./index.css";

(() => {
  const ensureBrandLink = (rel, extra = {}) => {
    const sel = `link[rel="${rel}"][data-hifai-asset]`;
    let el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      el.setAttribute("data-hifai-asset", "");
      Object.assign(el, extra);
      document.head.appendChild(el);
    }
    el.href = logoPngUrl;
  };
  ensureBrandLink("icon", { type: "image/png" });
  ensureBrandLink("apple-touch-icon");
})();
import App from "./App.jsx";
import BreadcrumbPage from "./components/BreadcrumbPage.jsx";
import { RouteTransitionProvider } from "./components/RouteTransitionProvider.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import { SchoolStudentsBody } from "./pages/SchoolStudents.jsx";
import { CollegeStudentsBody } from "./pages/CollegeStudents.jsx";
import { SchoolOrganizationsBody } from "./pages/SchoolOrganizations.jsx";
import { CollegeOrganizationsBody } from "./pages/CollegeOrganizations.jsx";
import { LearningHubBody } from "./pages/LearningHub.jsx";
import { GetStartedBody } from "./pages/GetStarted.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTransitionProvider>
        <ScrollToTop />
        <FloatingWhatsApp />
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/students/school-students"
            element={
              <BreadcrumbPage
                title="School Student (Grades 9–12)"
              >
                <SchoolStudentsBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/students/college-students"
            element={
              <BreadcrumbPage
                title="College Student (3rd & Final Year Students)"
              >
                <CollegeStudentsBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/school-organizations"
            element={
              <BreadcrumbPage
                title="Schools"
              >
                <SchoolOrganizationsBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/college-organizations"
            element={
              <BreadcrumbPage
                title="Universities"
              >
                <CollegeOrganizationsBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/learning-hub"
            element={
              <BreadcrumbPage
                title="Learning Hub"
              >
                <LearningHubBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/get-started"
            element={
              <BreadcrumbPage
                title="Let's Hi-fAi"
              >
                <GetStartedBody />
              </BreadcrumbPage>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RouteTransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
