import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface NavItemProps {
  to: string;
  children: ReactNode;
}

const NavItem = ({ to, children }: NavItemProps) => {
  const activeStyle = "underline underline-offset-4";
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeStyle : undefined)}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
