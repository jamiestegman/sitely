import fs from "fs";
import path from "path";
import matter from 'gray-matter';
import Head from 'next/head';
import marked from 'marked';
import Link from 'next/link';

import styled from 'styled-components';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BiChevronRight } from 'react-icons/bi';
import Button from "../../components/Button";
import TableOfContents from "../../components/TableOfContents";

const ArticleGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 75% 1fr;
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

  & .tags {
    margin: 1.5rem 0;

    & a {
      background-color: var(--accentColor);
      color: var(--textColor);
      border-radius: 9999px;
      padding: 0.5em 1em;
      font-size: 0.9em;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      opacity: 0.6;
      transition: var(--transitionSlow);
      border: none;

      & + a {
        margin-left: 1rem;
      }

      &:hover {
        opacity: 1;
        transition: var(--transitionSlow);
      }
    }
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

  & p {
    margin: 1rem 0;
  }

  & a {
    font-weight: 600;
    border-bottom: solid 3px var(--primaryColor);
    transition: var(--transition);
  }

  & a:hover {
    background-color: var(--primaryColorLight);
    transition: var(--transition);
  }

  @media (max-width: 600px) {
    padding: 1rem;
    width: 100%;
    margin: 0;

    & > .title {
      h1 {
        font-size: 40px;
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

const PostContent = styled.div`
  margin: 5% 0;
  & p {
    font-size: 18px;
  }

  & h3 {
    font-size: 28px;
  }

  & blockquote {
    margin-left: 2em;

    & li + li {
      margin-top: 0.5rem;
    }
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

const Post = ({ contents, data, slug }) => {

  const { author, title, description, tags } = data;

  function convertToSlug(Text) {
    return Text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  return (
    <>
      <Head>
        <title>{title} - Sitely</title>
      </Head>
      <Header />
      <Container>
        <ArticleGrid>

          <Article>
            <div className="title">
              <Breadcrumbs>
                <Link href="/">Home</Link>
                <BiChevronRight />
                <Link href="/resources">Resources</Link>
              </Breadcrumbs>
              <div className="h1-wrapper">
                <h1 id={convertToSlug(title)}>{title}</h1>
              </div>
              <p>{description}</p>
              <div className="tags">
                {tags.map(tag => (
                  <Link href={`/breakdowns?tag=${tag}`} key={tag}>{`#${tag}`}</Link>
                ))}
              </div>
            </div>
            <PostContent  dangerouslySetInnerHTML={{ __html: contents }} />
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

export const getStaticPaths = async () => {

  const files = fs.readdirSync('posts/resources');

  return {
    paths: files.map(filename => ({
      params: {
        slug: filename.replace('.mdx', '')
      }
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {

  const markdown = fs.readFileSync(path.join('posts/resources', slug + '.mdx'), 'utf-8');
  const parsedMarkdown = matter(markdown);
  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      contents: htmlString,
      data: parsedMarkdown.data,
      slug: slug
    }
  }
}

export default Post;