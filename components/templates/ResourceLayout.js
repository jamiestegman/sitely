import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';

import Container from '/components/Container';
import Footer from '/components/Footer';
import Tag from '/components/Tag';
import ComponentBox from '/components/ComponentBox';

import { BiChevronRight } from 'react-icons/bi';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: var(--layoutGap);

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`

const Article = styled.article`
  border-radius: 8px;
  padding: 0 4rem;
  color: var(--textColor);
  width: 100%;
  margin: auto;
  margin-bottom: var(--layoutGap);

  & > .title {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & h1 {
      font-size: 45px;
      line-height: 1.3;
    }

    & p {
      font-size: 16px;
      color: var(--textColorSoft);
    }
  }

  & p {
    margin: 1rem 0;
    font-size: 18px;
  }

  & h2 {
    font-size: 32px;
  }

  & blockquote {
    margin-left: 2em;

    & li + li {
      margin-top: 0.5rem;
    }
  }

  & .tags {
    margin: 1.5rem 0;
  }

  & img {
    border-radius: var(--radius);
    width: 100%;
    box-shadow: var(--cardBorder);
    margin: 2rem 0;
  }

  & h2, h3, h4 {
    margin-top: 3rem;
  }

  & p > a {
    font-weight: 600;
    border-bottom: solid 3px var(--primaryColor);
    transition: var(--transition);

    &:hover {
      background-color: var(--primaryColorLight);
      transition: var(--transition);
    }
  }

  @media (max-width: 600px) {
    padding: 1rem;
    width: 100%;
    margin: 0;

    & > .title {
      h1 {
        font-size: 32px;
      }
      p {
        max-width: 100%;
      }
    }
  }
`

const Author = styled.div`
  display: flex;
  align-items: center;
  width: max-content;

  & img {
    border-radius: 999px;
    width: 2rem;
    height: 2rem;
  }

  & p {
    margin-left: 1em;
    font-size: 0.8em;
    color: var(--uiLinkColor);
    font-weight: 500;
  }
`

const Breadcrumbs = styled.div`
  color: var(--uiLinkColor);
  font-weight: 400;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  & > * + * {
    margin-left: 0.5rem;
  }

  & a {
    font-weight: 400;
    font-size: 0.9em;
    border: none;
    padding: 0.3em;
  }

  & a:hover {
    background-color: transparent;
    color: var(--uiLinkColorHover);
  }
`

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-gap: 4rem;
  margin: var(--layoutGap) 0;
  place-items: center;

  @media (max-width: 1024px) {
    grid-gap: 3rem;
    grid-template-columns: repeat(${props => Math.round(props.columns*0.75)}, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => Math.round(props.columns*0.5)}, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`

const ResourceLayout = (props) => {

  const { author, title, description, tags } = props.metadata;

  const components = {ResourceGrid, ComponentBox};

  return(
    <>
      <Container>
        <Wrapper>
          <Article>
            <div className="title">
              <Breadcrumbs>
                <Link href="/">Home</Link>
                <BiChevronRight />
                <Link href={`/${props.type}`}>{props.type}</Link>
              </Breadcrumbs>
              <div className="h1-wrapper">
                <h1>{title}</h1>
              </div>
              <p>Simply click the copy icon on any of the examples below to copy the code to your clipboard.</p>
              <div className="tags">
                {tags.map(tag => (
                  <Tag href={`/${props.type}?filter=${tag}`} key={tag}>{`#${tag}`}</Tag>
                ))}
              </div>
            </div>

            <MDXRemote {...props.source} components={components} />
          </Article>
        </Wrapper>

        <Footer content />
      </Container>
    </>
  )
}

export default ResourceLayout;