import {useState} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.button`
  outline: none;
  border: none;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;

  width: max-content;
  padding: 1.2em 1.5em;
  font-weight: 500;
  font-size: 0.9em;
  background-color: var(--accentColor);
  color: var(--titleColor);
  font-family: var(--fontFamily);
  transition: var(--transitionSlow);
  border-radius: var(--radius);
  box-shadow: var(--cardBorder);
  cursor: pointer;
  user-select: none;

  &.primary {
    background-color: var(--primaryColor);
    color: white;
  }

  &.primary > * {
    border-color: transparent #fff #fff #fff;
  }

  &:hover {
    filter: brightness(95%);
    transition: var(--transition);
  }

  &:focus {
    box-shadow: var(--focus);
    transition: var(--transitionSlow);
  }

  &.loading {
    opacity: 0.6;
    pointer-events: none;
    color: transparent;
    transition: color 0s, box-shadow var(--transitionSlow);
  }

  & > svg {
    margin-left: 0.6em;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 1.2em 1em;
  }
`

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.3em;
  height: 1.3em;
  border: 1.5px solid transparent;
  border-color: transparent var(--textColor) var(--textColor) var(--textColor);
  border-radius: 50%;
  animation: loading 0.8s linear infinite;

  @keyframes loading {
    from {
      transform: translate(-50%,-50%) rotate(0deg);
    } to{
        transform: translate(-50%,-50%) rotate(360deg);
    }
  }
`

function Button(props) {

  const [loading, setLoading] = useState(props.loading);

  const handleClick = () => {
    if (props.willLoad) {
      setLoading(true);

    }
    if (props.onClick) props.onClick();
  }

  // If the button is NOT a type="submit" button, wrap it in a Next Link.
  return (
    props.type === 'submit' ? (
      <Wrapper className={`${props.primary ? "primary": null} ${loading ? "loading" : null}`}
      onClick={handleClick}
      href={props.link}
      >
        {props.children}
        {loading && <Loader />}
      </Wrapper>
    ) : (
      <Link href={props.link ? props.link : ""}>
        <Wrapper className={`${props.primary ? "primary" : null} ${loading ? "loading" : null}`}
        onClick={handleClick}
        >
          {props.children}
          {loading && <Loader />}
        </Wrapper>
      </Link>
    )

  );
}

export default Button;