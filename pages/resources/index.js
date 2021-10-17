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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--layoutGap);
  margin-bottom: var(--layoutGap);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const ArticleCard = styled.div`
  background-color: var(--accentColor);
  border-radius: var(--radius);
  box-shadow: var(--cardBorder);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  overflow: hidden;

  opacity: 0;
  animation: fadeInUp 0.5s ease;
  animation-fill-mode: forwards;
  animation-delay: ${props => props.delay}ms;

  & button {
    width: 100%;
  }

  & > * + * {
    margin-top: 1rem;
  }

  & img {
    width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--cardBorder);
    opacity: 1;
  }

  & h4 {
    color: var(--titleColor);
    font-size: 24px;
    font-weight: 700;
  }

  & .tags {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
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

function Resources({ posts }) {

  const router = useRouter()
  const {filter} = router.query;

  function filterPosts() {
    posts = posts.filter(post => post.content.tags.indexOf(filter) !== -1);
  }

  return (
    <>
    <Header active="resources" />
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
          <h4>{post.content.title}</h4>
          <div className="tags">
            {post.content.tags.map(tag => (
              <Tag href={`/resources?filter=${tag}`} key={tag}>{`#${tag}`}</Tag>
            ))}
          </div>
          <Button primary willLoad link={`/resources/${post.slug}`}>View Resource</Button>
        </ArticleCard>
      ))}
      </GridWrapper>
      <Footer />
    </Container>
    </>
  );
}

export const getStaticProps = async () => {

  const files = fs.readdirSync(path.join('content/resources'));

  const posts = files.map((filename => {
    const slug = filename.replace('.mdx', '');

    const markdown = fs.readFileSync(path.join('content/resources', filename), 'utf-8');
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

export default Resources;
