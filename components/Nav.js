import styled from 'styled-components';
import Button from './Button';
import { useRouter } from "next/router";
import Link from 'next/link';
import ThemeButton from './ThemeButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & * + * {
    margin-left: 1rem;
  }

  & a {
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

    & li.active a {
      color: var(--uiLinkColorActive);
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
`

function Nav(props) {

  const router = useRouter();

  return(
    <Wrapper>
      <ul>
        <li className={router.pathname === '/resources' && 'active'}>
          <Link
          href={router.pathname !== '/resources' ? '/resources' : ''}>
          Resources
          </Link>
        </li>
        <li className={router.pathname === '/breakdowns' && 'active'}>
          <Link
          href={router.pathname !== '/breakdowns' ? '/breakdowns' : ''}>
          Breakdowns
          </Link>
        </li>
      </ul>
      <ThemeButton />
    </Wrapper>
  )
}

export default Nav;