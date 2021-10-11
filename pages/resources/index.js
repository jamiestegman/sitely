import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import styled from 'styled-components';
import path from "path";
import matter from 'gray-matter';
import fs from "fs";
import Link from 'next/link';

const GridWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--layoutGap);
  width: 80%;
  margin: 0 auto;

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

  & a {
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
    margin-top: 1rem;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      background-color: var(--backgroundColor);
      color: var(--textColor);
      border-radius: 9999px;
      padding: 0.3em 0.6em;
      font-size: 0.6em;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      opacity: 0.6;
      transition: var(--transitionSlow);

      &:hover {
        opacity: 1;
        transition: var(--transitionSlow);
      }

      & + a {
        margin-left: 1rem;
      }
    }
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

function Resources({ posts }) {

  return (
    <>
    <Header active="resources" />
    <Container>
      <GridWrapper>
      {posts.map((post, index) => (
        <ArticleCard key={index} delay={index * 150}>
          <div>
            <h4>{post.content.title}</h4>
            <div className="tags">
              {post.content.tags.map(tag => (
                <Link href={`/resources?tag=${tag}`} key={tag}>{`#${tag}`}</Link>
              ))}
            </div>
          </div>
          <Button primary willLoad link={`/resources/${post.slug}`}>View Post</Button>
        </ArticleCard>
      ))}
      </GridWrapper>
      <Footer />
    </Container>
    </>
  );
}

export const getStaticProps = async () => {

  const files = fs.readdirSync(path.join('posts/resources'));

  const posts = files.map((filename => {
    const slug = filename.replace('.mdx', '');

    const markdown = fs.readFileSync(path.join('posts/resources', filename), 'utf-8');
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
