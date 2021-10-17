import Container from '/components/Container';
import Header from '/components/Header';
import Footer from '/components/Footer';
import Button from '/components/Button';
import Tag from '/components/Tag';

import styled from 'styled-components';
import path from "path";
import matter from 'gray-matter';
import fs from "fs";
import Link from 'next/link';
import { useRouter } from 'next/router';

const GridWrapper = styled.div`
  display: flex;

  margin-bottom: var(--layoutGap);
  width: 100%;
  grid-gap: var(--layoutGap);

  @media (max-width: 600px) {
    width: 100%;
  }
`

const ArticleCard = styled.div`
  background-color: var(--accentColor);
  border-radius: var(--radius);
  box-shadow: var(--cardBorder);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;

  opacity: 0;
  animation: fadeInUp 0.5s ease;
  animation-fill-mode: forwards;
  animation-delay: ${props => props.delay}ms;

  will-change: transform;

  & button {
    padding: 1rem 1.8rem;
  }

  & h4 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--titleColor);
    margin-right: 2rem;
  }

  & .tags {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
    flex-direction: column;
    & h4 {
      font-size: 1.3em;
      margin: 0;
    }

    & .tags {
      margin: 1rem 0;
      display: grid;
      margin-top: 0.5rem;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 0.3em;

      & a + a {
        margin: 0;
      }
    }
  }
`

const Filter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: var(--layoutGap);
  opacity: 0.9;

  & > * + * {
    margin-left: 1rem;
  }

  & p {
    color: var(--titleColor);
    font-size: 0.8em;
  }

  & .filter {
    padding: 0.35em 0.75em;
    background-color: var(--accentColor);
    color: var(--primaryColor);
    border-radius: 9999px;

    font-size: 0.75em;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transitionSlow);
    border: solid 1px var(--primaryColorLight);
  }

  & span {
    display: flex;
    align-items: center;
    padding: 0.4rem;
    font-size: 0.8em;
    color: var(--textColor);
    opacity: 0.7;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      filter: brightness(0.9);
    }
  }
`

function Posts({ posts }) {

  const router = useRouter()
  const {filter} = router.query;

  function filterPosts() {
    posts = posts.filter(post => post.content.tags.indexOf(filter) !== -1);
  }

  return (
    <>
    <Header active="posts" />
    <Container>

      <Filter>
        <p>Filter by:</p>
        {filter ? (
        <>
        <div className="filter">#{filter}</div>
        <Link href={`${router.pathname}`}><span>Clear</span></Link>
        </>
        ) : <span>None</span>}
      </Filter>

      <GridWrapper>
      {filter && filterPosts()}
      {posts.map((post, index) => (
        <ArticleCard key={index} delay={index * 150}>
          <div>
            <h4>{post.content.title}</h4>
            <div className="tags">
              {post.content.tags.map(tag => (
                <Tag href={`/posts?filter=${tag}`} key={tag}>{`#${tag}`}</Tag>
              ))}
            </div>
          </div>
          <Button primary willLoad link={`/posts/${post.slug}`}>View Post</Button>
        </ArticleCard>
      ))}
      </GridWrapper>
      <Footer />
    </Container>
    </>
  );
}

export const getStaticProps = async () => {

  const files = fs.readdirSync(path.join('content/posts'));

  const posts = files.map((filename => {
    const slug = filename.replace('.mdx', '');

    const markdown = fs.readFileSync(path.join('content/posts', filename), 'utf-8');
    const {data: content} = matter(markdown);

    return {
      slug,
      content
    }
  }))

  return {
    props: {
      posts: posts
    }
  }
}

export default Posts;
