import styled from 'styled-components';
import Button from './Button';
import { useState } from 'react';

import {BiCheck} from 'react-icons/bi';
import {FiCopy} from 'react-icons/fi';

const Wrapper = styled.div`
  color: var(--textColor);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  width: 100%;

  & > div {
    width: 100%;
  }
`

const Visual = styled.div`
  position: relative;

  & .element {
    background-color: var(--accentColor);
    border-radius: var(--radiusLarge);
    padding: var(--layoutGap);
    width: 100%;
  }

`

const CopyButton = styled.button`
  outline: none;
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  width: 100%;
  height: 100%;
  padding: 1.2em 1.5em;
  font-weight: 500;
  font-size: 0.9em;
  background-color: var(--accentColor);
  color: var(--titleColor);
  transition: var(--transitionSlow);
  border-radius: var(--radiusLarge);
  cursor: pointer;
  user-select: none;

  opacity: 0.8;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > svg {
    color: var(--textColor);
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    transition: var(--transition);

    & .tooltip {
      visibility: visible;
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }

  &:focus {
    box-shadow: var(--focus);
    transition: var(--transitionSlow);
  }

  & .tooltip {
    visibility: hidden;
    opacity: 0;
    transition: var(--transitionSlow);
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) scale(0.9);
    padding: 0.6em;
    border-radius: var(--radius);
    font-size: 0.9em;
    background-color: var(--tooltipBackground);
    color: var(--alwaysLight);
    z-index: 2;

    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%);
      width: 0;
      height: 0;
      border-left: solid 6px transparent;
      border-right: solid 6px transparent;
      border-top: solid 6px var(--tooltipBackground);
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 1.2em 1em;
  }
`

function ComponentBox(props) {

  const [copyButtonText, setCopyButtonText] = useState(<FiCopy />);
  const [tooltipText, setTooltipText] = useState('Click to copy');

  // Gets the element with the class 'element' and copies the CSS property equal to props.property.
  const copyHandler = (e, property) => {
    const copyButton = e.target;
    const element = copyButton.closest('.wrapper').querySelector('.element');
    navigator.clipboard.writeText(property + ": " + element.style.getPropertyValue(property) + ";");

    // Set the html of the button to a checkmark icon, then back after 'duration' ms.
    const duration = 1000;
    setCopyButtonText(<BiCheck />);
    setTooltipText('Copied!');
    setTimeout(() => {
      setCopyButtonText(<FiCopy />);
      setTooltipText('Click to copy');
    }, duration);
  }

  return(
    <Wrapper className="wrapper">
      {/* The visual of the copyable component. */}
      <Visual>
      <CopyButton onClick={(e) => copyHandler(e, props.property)}>{copyButtonText}
        <span className="tooltip">{tooltipText}</span>
      </CopyButton>
      {props.children}
      </Visual>
    </Wrapper>
  )
}

export default ComponentBox;