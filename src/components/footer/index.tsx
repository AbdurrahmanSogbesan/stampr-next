import React from "react";
import { Icon } from "..";

interface FooterProps {
  footerLinks?: { icon: React.ReactNode; link: string }[];
}

export const Footer: React.FC<FooterProps> = ({ footerLinks }) => {
  return (
    <div className={`mt-2`}>
      <ul className="d-flex justify-content-end">
        {footerLinks?.map(({ icon, link }, index) => {
          return (
            <li key={index} className="nav-item d-flex align-items-center">
              <a title="Github" href="https://github.com/hmoskva/stampr">
                {icon || <Icon icon="github" />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
