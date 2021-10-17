import styled from 'styled-components';
import Logo from './Logo';
import Link from 'next/link';
import CTAFooter from './CTAFooter';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 2fr;
  grid-gap: 3rem;
  margin-top: 70px;

  & p, a {
    font-size: 0.9em;
    font-weight: 500;
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    display: flex;
    width: 100%;

    & > div:not(div:first-of-type) {
      display: none;
    }
  }
`

const Links = styled.div`
  display: flex;
  margin-top: 1rem;
  color: var(--uiLinkColor);

  & a {
    color: var(--uiLinkColor);
    display: flex;
    align-items: center;
    transition: var(--transition);
  }

  & a:hover {
    color: var(--uiLinkColorHover);
    transition: var(--transition);
  }

  & > * + * {
    margin-left: 0.5rem;
  }
`

const ColumnTitle = styled.p`
  font-weight: 800;
  color: var(--textColor);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;

  & + ul {
    list-style: none;

    & li {
      color: var(--uiLinkColor);

      & + li {
        margin-top: 0.5rem;
      }

      & a {
        transition: var(--transition);
      }

      & a:hover {
        color: var(--uiLinkColorHover);
        transition: var(--transition);
      }
    }
  }
`

function Footer(props) {
  return(
    <>
    {props.content && <CTAFooter /> }
    <Wrapper>
      <div>
        <Logo />
        <p style={{marginTop: '1.5rem'}}>Learn to create incredible user experiences on the web
        with info-packed articles, popular site breakdowns and free resources.</p>
        <Links>
          <Link href="https://jamiestegman.com" target="_blank" rel="noreferrer">© Jamie Stegman</Link>
          {/* <span>·</span>
          <a href="terms">Terms</a>
          <span>·</span>
          <a href="privacy">Privacy</a> */}
        </Links>
      </div>

      <div></div>

      {/* <div>
        <ColumnTitle>Community</ColumnTitle>
        <ul>
          <li><a>Hi</a></li>
        </ul>
      </div> */}

      <div>
        <ColumnTitle>Links</ColumnTitle>
        <ul>
          <li><Link href="/resources">Resources</Link></li>
          <li><Link href="/posts">Posts</Link></li>
          <li><Link href="/breakdowns">Breakdowns</Link></li>
        </ul>
      </div>
    </Wrapper>
    </>
  )
}

export default Footer;