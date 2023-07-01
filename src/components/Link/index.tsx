import styles from "./Link.module.scss";
import React from "react";
import Link from "next/link";

interface LinkProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  label?: string;
  to: string;
  disabled?: boolean;
}

export const RouterLink: React.FC<LinkProps> = ({
  label = "link",
  to,
  children,
  disabled = false,
  className,
  onClick,
}) => {
  return (
    <Link
      href={to}
      legacyBehavior={false}
      className={`${className} nav-link ${styles.Link} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick ? () => onClick() : () => ({})}
    >
      {children || label}
    </Link>
  );
};
