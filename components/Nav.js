import styled from 'styled-components';
import Button from './Button';
import { useRouter } from "next/router";
import Link from 'next/link';
import ThemeButton from './ThemeButton';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;

  & a, span {
    text-decoration: none;
    color: var(--uiLinkColor);
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  & ul {
    list-style: none;
    display: flex;
    align-items: center;

    & li + li {
      margin-left: 1.5em;
    }

    & li.active a {
      color: var(--primaryColor);
    }

    & a {
      padding: 0.5em;
      transition: var(--transition);
      user-select: none;
    }

    & a:not(.active):hover {
      color: var(--uiLinkColorHover);
      transition: var(--transition);
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-end;

    position: absolute;
    bottom: calc(100% + 1.5rem);
    right: 0;

    & ul {
      flex-direction: column;
      align-items: flex-start;
      border-radius: var(--radius);
      box-shadow: var(--cardBorder);
      margin-bottom: 1rem;
      background-color: var(--accentColor);
      box-shadow: var(--cardBorder), 0 6px 20px -4px rgba(0, 0, 0, 0.5);

      & li + li {
        margin-left: 0;
      }

      & li {
        border-top: solid 1px var(--cardBorderColor);
        padding: 1em;
        width: 100%;

        & a {
          min-width: 100%;
          height: 100%;
        }
      }

      & li:first-of-type {
        border: none;
      }
    }
  }
`

function Nav({innerRef}) {

  const router = useRouter();

  return(
    <Wrapper ref={innerRef}>
      <ul>
        <li className={router.pathname === '/resources' ? 'active' : null}>
          <Link
          href={router.pathname !== '/resources' ? '/resources' : ''}>
          Resources
          </Link>
        </li>
        <li className={router.pathname === '/posts' ? 'active' : null}>
          <Link
          href={router.pathname !== '/posts' ? '/posts' : ''}>
          Posts
          </Link>
        </li>
        <li className={router.pathname === '/breakdowns' ? 'active' : null}>
          <Link
          href={router.pathname !== '/breakdowns' ? '/breakdowns' : ''}>
          Breakdowns
          </Link>
        </li>
        <li><ThemeButton /></li>
      </ul>
    </Wrapper>
  )
}

export default Nav;