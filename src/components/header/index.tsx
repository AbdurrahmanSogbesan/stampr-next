import styles from "./Header.module.scss";
import React from "react";
import { Button } from "..";
import { RouterLink } from "@components/Link";
import useAuth from "src/hooks/useAuth";
import { logout } from "src/services/auth";

interface HeaderProps {
  links?: { text: string; link: string }[];
  src?: string;
}

export const Header: React.FC<HeaderProps> = ({
  src,
  links = [
    { text: "Home", link: "" },
    { text: "Princing", link: "" },
  ],
}) => {
  const { user } = useAuth();
  const { displayName, email } = user || {};
  return (
    <nav className={`py-4 ${styles.Header}`}>
      <RouterLink to="/" className="p-0">
        <img height="45" src={src} />
      </RouterLink>
      <ul className="nav">
        {links.map(({ text, link }, index) => {
          return (
            <li key={index} className="nav-item">
              <RouterLink label={text} to={link}></RouterLink>
            </li>
          );
        })}
      </ul>
      <div className="d-flex">
        {user?.uid ? (
          <div className="d-flex align-items-center">
            <p className="small mb-0 me-2">Hello, {displayName || email}</p>
            <Button
              variant="danger"
              handleClick={async () => {
                logout();
              }}
              label="Log out"
            />
          </div>
        ) : (
          <>
            <RouterLink to="/login">Log in</RouterLink>
            <Button label="Sign Up" />
          </>
        )}
      </div>
    </nav>
  );
};
