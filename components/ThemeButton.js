import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import {HiSun, HiMoon} from 'react-icons/hi';

const Button = styled.div`
  padding: 0.5em;
  background-color: var(--accentColor);
  border-radius: 999px;
  box-shadow: 0 0 1px 1px var(--inputColor);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 0.9em;
    color: var(--titleColor);
  }

  & .mobile-only {
    display: none;
  }

  @media (max-width: 600px) {
    box-shadow: 0 2px 7px -1px rgba(33, 35, 39, 0.4);
    width: max-content;
    box-shadow: none;

    & .mobile-only {
      display: flex;
      margin-right: 1rem;
    }

    & svg {
      width: 1em;
      height: 1em;
    }
  }
`

const ThemeButton = () => {

  const [theme, toggleTheme] = useState(null);

  // Get initial state on render. This is necessary due to Next.js SSR.
  useEffect(() => {
    let initialTheme = 'dark';
    if (document.body.classList.contains('light-mode')) initialTheme = 'light';
    toggleTheme(initialTheme);
  }, [])

  useEffect(() => {
    if (theme !== null) {
      localStorage.setItem('theme', theme);
      document.body.classList.remove('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.add(theme + '-mode', 'theme-transition');

      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);
    }
  }, [theme]);

  const themeHandler = () => {
    theme === 'dark' ? toggleTheme('light') : toggleTheme('dark');
  }

  return (
    <Button onClick={themeHandler}><span className="mobile-only">Toggle Theme</span>{ theme === 'light' ? <HiMoon /> : <HiSun /> }</Button>
  );
};

export default ThemeButton;