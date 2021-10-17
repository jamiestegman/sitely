import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.span`
  & a {
    width: 100%;
    height: 100%;
    padding: 0.5em 1em;
    background-color: var(--accentColor);
    color: var(--textColor);
    border-radius: 9999px;

    font-size: 0.7em;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.6;
    transition: var(--transitionSlow);
    border: solid 1px var(--inputColor);

    &:hover {
      opacity: 1;
      color: var(--primaryColor);
      border-color: var(--primaryColorLight);
    }
  }

  &:focus {
    box-shadow: var(--focus);
  }

  & + span {
    margin-left: 1em;
  }
`

function Tag(props) {

  return(
    <Wrapper><Link href={props.href}>{props.children}</Link></Wrapper>
  )

}

export default Tag;