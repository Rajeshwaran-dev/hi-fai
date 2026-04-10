import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import logoPngUrl from "./assets/images/logo.png?url";
import "./index.css";
import "antd/dist/reset.css";

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
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { RouteTransitionProvider } from "./components/RouteTransitionProvider.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import { useReducedMotion } from "./hooks/useReducedMotion.js";
import { SchoolStudentsBody } from "./pages/SchoolStudents.jsx";
import { CollegeStudentsBody } from "./pages/CollegeStudents.jsx";
import { SchoolOrganizationsBody } from "./pages/SchoolOrganizations.jsx";
import { CollegeOrganizationsBody } from "./pages/CollegeOrganizations.jsx";
import { LearningHubBody } from "./pages/LearningHub.jsx";
import { GetStartedBody } from "./pages/GetStarted.jsx";
import { AboutBody } from "./pages/About.jsx";

function InnerPageLayout({ children }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar reducedMotion={reducedMotion} />
      <main className="pt-24 md:pt-48 pb-12">{children}</main>
      <Footer reducedMotion={reducedMotion} />
    </div>
  );
}

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
              <InnerPageLayout>
                <SchoolStudentsBody />
              </InnerPageLayout>
            }
          />
          <Route
            path="/students/college-students"
            element={
              <InnerPageLayout>
                <CollegeStudentsBody />
              </InnerPageLayout>
            }
          />
          <Route
            path="/school-organizations"
            element={
              <InnerPageLayout>
                <SchoolOrganizationsBody />
              </InnerPageLayout>
            }
          />
          <Route
            path="/college-organizations"
            element={
              <InnerPageLayout>
                <CollegeOrganizationsBody />
              </InnerPageLayout>
            }
          />
          <Route
            path="/learning-hub"
            element={
              <InnerPageLayout>
                <LearningHubBody />
              </InnerPageLayout>
            }
          />
          <Route
            path="/get-started"
            element={
              <InnerPageLayout>
                <GetStartedBody />
              </InnerPageLayout>
            }
          />
          <Route
            path="/about"
            element={
              <InnerPageLayout>
                <AboutBody />
              </InnerPageLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RouteTransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
