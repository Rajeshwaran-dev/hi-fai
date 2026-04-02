import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BreadcrumbPage from "./components/BreadcrumbPage.jsx";
import { RouteTransitionProvider } from "./components/RouteTransitionProvider.jsx";
import {
  SchoolStudentsBody,
  CollegeStudentsBody,
  SchoolOrganizationsBody,
  CollegeOrganizationsBody,
  LearningHubBody,
  GetStartedBody,
} from "./pages/subpageContent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTransitionProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/students/school-students"
            element={
              <BreadcrumbPage
                title="School Students"
                subtitle="Foundational AI literacy, creative project studios, and responsible-use habits for secondary learners."
              >
                <SchoolStudentsBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/students/college-students"
            element={
              <BreadcrumbPage
                title="College Students"
                subtitle="Rigorous innovation labs, mentor feedback, and portfolio storytelling for university cohorts."
              >
                <CollegeStudentsBody />
              </BreadcrumbPage>
            }
          />
          <Route
            path="/school-organizations"
            element={
              <BreadcrumbPage
                title="School Organizations"
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
                title="College Organizations"
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
                title="Get Started"
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
