import {useRef, useState, useCallback} from 'react';
import useClickOutside from './useClickOutside';

import styled from 'styled-components';
import Logo from './Logo';
import Button from './Button';

import {IoMdClose} from 'react-icons/io';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 85vh;
  text-align: center;

  & .mobile-only {
    display: none;
  }

  @media (max-width: 600px) {
    min-height: auto;
    margin: var(--layoutGap) 0;

    & .mobile-only {
      display: block;
    }
  }
`

const Title = styled.h1`
  color: var(--titleColor);
  margin-bottom: 0.75rem;

  @media (max-width: 600px) {
    font-size: 2em;
    margin-top: 2rem;
  }
`

const Text = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    min-width: 10rem;
  }

  & > * + * {
    margin-left: 1rem;
  }
`

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 6rem;

  & > div {
    position: relative;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: solid 1px var(--inputColor);
    cursor: pointer;
  }

  & .hover-controls {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0,0,0,0.7);
    backdrop-filter: blur(2px);
    opacity: 0;
    visbility: hidden;
    transition: var(--transitionSlow);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > div:hover .hover-controls {
    visbility: visible;
    opacity: 1;
    transition: var(--transitionSlow);
  }

  & img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin-top: 3rem;

    & button {
      width: 60%;
    }
  }
`

const Background = styled.div`
position: absolute;
width: 100vw;
height: 100vh;
z-index: -1;

& > div {
  width: 25vw;
  height: 25vw;
  filter: blur(7vw);
  -webkit-filter: blur(7vw);
  mix-blend-mode: multiply;
  opacity: 0;
  border-radius: 9999px;
  position: absolute;
  transform: translate(-50%, -50%);
}
& > div:first-of-type {
  background-color: var(--primaryColor);
  left: 30%;
  top: 36%;
}

& > div:nth-of-type(2) {
  background-color: #0097ff;
  left: 70%;
  top: 41%;
}

& > div:nth-of-type(3) {
  background-color: #700fff;
  left: 45%;
  top: 38%;
}
`

const Overlay = styled.div`
  background-color: rgba(0,0,0,0.75);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transform-origin: 0 0;

  animation: popoverTranslated 0.15s ease;
  animation-fill-mode: forwards;

  & iframe {
    border: none;
    border-radius: var(--radius);
    box-shadow: 0 5px 30px -5px rgba(0,0,0,0.5);
    width: 80vw;
    height: 80vh;
  }

  & p {
    color: white;
    opacity: 0.6;
    position: absolute;
    top: 101%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);
  }

  & p:hover {
    filter: brightness(120%);
    transition: var(--transition);
  }

  @media (max-width: 600px) {
    & iframe {
      width: 90vw;
      height: 85vh;
    }
  }
`

const Loader = styled.div`
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
  border: 2px solid transparent;
  border-color: transparent #fff #fff #fff;
  opacity: 0.7;
  border-radius: 50%;
  animation: loading 0.6s linear infinite;
  position: absolute;
  z-index: -1;

  @keyframes loading {
    100% {
        transform: rotate(360deg);
    }
  }
`

function Hero() {

  return(
    <Wrapper>
      <Background><div/><div/><div/></Background>
      <span className="mobile-only"><Logo /></span>
      <Title>Resource Hub for Frontend Devs</Title>
      <Text>Articles, code snippets and tips that help developers build beautiful web experiences.</Text>
      <ButtonWrapper>
        <Button primary willLoad link="/resources">View Resources</Button>
        <Button willLoad link="/posts">View Posts</Button>
      </ButtonWrapper>

      <ImageContainer>
        <div>
          <img src="/images/stripe/stripe_atf.png" />
          <div className="hover-controls">
            <Button primary willLoad link="/breakdowns/stripe-homepage">View Article</Button>
          </div>
        </div>
        <div>
          <img src="/images/mighty/mighty_atf.png" />
          <div className="hover-controls">
            <Button primary willLoad link="/breakdowns/mighty-homepage">View Article</Button>
          </div>
        </div>
        <div>
          <img src="/images/intercom/intercom_atf.png" />
          <div className="hover-controls">
            <Button primary willLoad link="/breakdowns/intercom-landing">View Article</Button>
          </div>
        </div>
      </ImageContainer>
    </Wrapper>
  )
}

export default Hero;