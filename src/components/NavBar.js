/** @jsxImportSource @emotion/react */

import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/react";
import colors from "../aesthetics/colors";

const NavBar = () => {
  return (
    <header
      css={css`
        background-color: ${colors.primary};
        padding: 15px;
        display: flex;
        justify-content: start;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 100;
      `}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        role="img"
        aria-label="logo"
        css={css`
          font-size: 40px;
        `}
      >
        🐱‍🐉
      </span>
    </header>
  );
};

export default NavBar;
