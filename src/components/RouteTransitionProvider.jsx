import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RouteTransitionContext = createContext({ transitionTo: () => {} });
const TRANSITION_MS = 1000;

function RouteTransitionOverlay({ isActive }) {
  return (
    <div
      className={`route-loader ${isActive ? "route-loader--active" : ""}`}
      aria-hidden={!isActive}
      role="status"
      aria-live="polite"
    >
      <div className="route-loader__grid" />
      <div className="route-loader__glow route-loader__glow--left" />
      <div className="route-loader__glow route-loader__glow--right" />
      <div className="route-loader__orbit">
        <span className="route-loader__ring route-loader__ring--outer" />
        <span className="route-loader__ring route-loader__ring--inner" />
        <span className="route-loader__core" />
        <span className="route-loader__dot route-loader__dot--a" />
        <span className="route-loader__dot route-loader__dot--b" />
      </div>
      {/* <p className="route-loader__label">Loading next experience...</p> */}
    </div>
  );
}

export function RouteTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const transitionTo = useCallback(
    (to) => {
      if (!to || to === location.pathname || isTransitioning) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (to === "/") {
        navigate(to);
        return;
      }
      setIsTransitioning(true);
      timerRef.current = window.setTimeout(() => {
        navigate(to);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    },
    [isTransitioning, location.pathname, navigate]
  );

  const value = useMemo(() => ({ transitionTo, isTransitioning }), [transitionTo, isTransitioning]);

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
      <RouteTransitionOverlay isActive={isTransitioning} />
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  return useContext(RouteTransitionContext);
}
