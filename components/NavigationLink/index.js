import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const NavLink = ({ href, children }) => {
  const router = useRouter();

  return (
    <li
      style={{ listStyle: "none" }}
      className={href === router.pathname ? "active" : ""}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default NavLink;
