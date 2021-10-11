import styled from 'styled-components';
import {useRef} from 'react';

const Bar = styled.div`
  width: 0%;
  height: 0.5vh;
  background-color: var(--primaryColor);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  transition: 0.1s ease;
`

function ProgressBar() {

  const BarRef = useRef(null);
  window.onscroll = () => handleScroll();

  function handleScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    BarRef.current.style.width = scrolled + "%";
  }

  return(
    <Bar ref={BarRef}></Bar>
  )
}

export default ProgressBar;