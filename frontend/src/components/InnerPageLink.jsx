import { useLocation } from "react-router-dom";
import { useRouteTransition } from "./RouteTransitionProvider.jsx";

export default function InnerPageLink({ to, className, children, ...rest }) {
  const { transitionTo } = useRouteTransition();
  const { pathname } = useLocation();

  return (
    <a
      href={to}
      className={className}
      {...rest}
      onClick={(e) => {
        if (pathname === to) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        transitionTo(to);
      }}
    >
      {children}
    </a>
  );
}
