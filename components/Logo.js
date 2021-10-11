import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  color: var(--titleColor);
  text-decoration: none;
  font-size: 1.3rem;
  font-family: 'Source Sans Pro';
  font-weight: 600;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  cursor: pointer;

  & > div {
    color: white;
    background-color: var(--primaryColor);
    border-radius: var(--radius);

    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    height: 1.4em;
    width: 1.4em;
    margin-right: 0.5em;
  }
`

function Logo() {
  return(
    <Link href="/"><Wrapper><div>S</div>Sitely</Wrapper></Link>
  )
}

export default Logo;