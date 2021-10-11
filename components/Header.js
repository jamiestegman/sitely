
import styled from 'styled-components';
import Logo from './Logo';
import ThemeButton from './ThemeButton';
import Nav from './Nav';

const Wrapper = styled.div`
  height: var(--headerHeight);
  padding: 0 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  position: fixed;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: auto;
  z-index: 9990;
  ${props => !props.home && 'box-shadow: var(--cardBorder);'}
  background-color: var(--cardBackgroundColor);
  backdrop-filter: blur(20px);

  @media (max-width: 600px) {
    & a {
      padding: 0.8em;
    }
  }
`

function Header(props) {
  return(
    <Wrapper>
      <Logo />
      <Nav active={props.active} />
    </Wrapper>
  )
}

export default Header;