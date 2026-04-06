import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
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
                subtitle="This page focuses on early skill discovery and assessment."
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
                subtitle="This page focuses on real-world exposure through global projects."
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
                subtitle="Partner with HIfAi to roll out age-right programs, teacher enablement, and outcome analytics."
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
                subtitle="Scale interdisciplinary studios, credit-bearing paths, and employer-backed challenges with shared rubrics."
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
                subtitle="Templates, sprint playbooks, and facilitator resources for everyone in the HIfAi network."
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
                subtitle="Share a few details so we can match you to the right pathway and onboarding pack."
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
