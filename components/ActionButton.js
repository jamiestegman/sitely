import { useState, useRef, useCallback } from 'react';
import useClickOutside from './useClickOutside';

import styled from 'styled-components';
import Nav from './Nav';

import {GiHamburgerMenu} from 'react-icons/gi';

const Wrapper = styled.div`
  display: none;
  z-index: 999;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 30px;
  right: 25px;

  & nav {
    opacity: 0;
    animation: fadeInUp 0.3s ease;
    animation-fill-mode: forwards;

  }

  @media (max-width: 600px) {
    display: flex;
  }
`

const NavButton = styled.div`
  position: relative;
  background-color: var(--accentColor);
  box-shadow: 0 6px 15px -5px rgba(0, 0, 0, 0.6);
  color: var(--titleColor);
  border-radius: 999px;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

function ActionButton() {

  const [menuState, setMenuState] = useState(false);
  const menu = useRef(null);

  const close = useCallback(() => setMenuState(false), []);
  useClickOutside(menu, close);

  return(
    <Wrapper>
      <NavButton onClick={() => setMenuState(!menuState)}><GiHamburgerMenu /></NavButton>
      {menuState && <Nav innerRef={menu} /> }
    </Wrapper>
  )
}

export default ActionButton;