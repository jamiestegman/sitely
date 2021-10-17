import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';

import Container from '/components/Container';
import Tag from '/components/Tag';
import TableOfContents from "/components/TableOfContents";
import Footer from '/components/Footer';

import Button from '/components/Button';

import { BsBoxArrowUpRight } from 'react-icons/bs';
import { BiChevronRight } from 'react-icons/bi';

const ArticleGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 75% 1fr;
  grid-gap: var(--layoutGap);

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`

const Article = styled.article`
  border-radius: 8px;
  overflow: hidden;
  padding: 0 4rem;
  color: var(--textColor);
  width: 100%;
  margin: auto;
  margin-bottom: var(--layoutGap);

  & > .title {

    & h1 {
      font-size: 45px;
      line-height: 1.3;
    }

    & .h1-wrapper {
      display: flex;
      align-items: center;
    }

    & .live-site-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      width: max-content;
      transition: var(--transition);
      margin-left: 1em;
      color: var(--primaryColor);
      border: none;

      &:hover {
        background-color: transparent;
        filter: brightness(70%);
        transition: var(--transition);
      }
    }

    & img {
      margin: 1rem 0;
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
      color: var(--primaryColor);
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

const Sidebar = styled.aside`
  position: sticky;
  align-self: start;
  top: calc(var(--headerHeight) + var(--layoutGap));

  padding-top: 9rem;

  margin-bottom: var(--layoutGap);
  width: 100%;
  white-space: nowrap;
  flex: 1;

  & p {
    font-size: 0.9em;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 600px) {
    display: none;
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

const BlogLayout = (props) => {

  const { author, title, description, tags, website, img } = props.metadata;

  // The components that get passed into the .mdx file.
  const components = {Button};

  return(
    <>
      <Container>
        <ArticleGrid>

          <Article>
            <div className="title">
              <Breadcrumbs>
                <Link href="/">Home</Link>
                <BiChevronRight />
                <Link href={`/${props.type}`}>{props.type}</Link>
              </Breadcrumbs>
              <div className="h1-wrapper">
              <h1>{title}</h1>
                {website && <a className="live-site-link" href={website} target="_blank" rel="noreferrer"><BsBoxArrowUpRight /></a>}
              </div>
              <p>{description}</p>
              <div className="tags">
                {tags.map(tag => (
                  <Tag href={`/${props.type}?filter=${tag}`} key={tag}>{`#${tag}`}</Tag>
                ))}
              </div>
            </div>

            <MDXRemote {...props.source} components={components} />
          </Article>

          <Sidebar>
            <TableOfContents />
          </Sidebar>
        </ArticleGrid>

        <Footer content />
      </Container>
    </>
  )
}

export default BlogLayout;