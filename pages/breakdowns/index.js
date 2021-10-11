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
  }

  & .tags {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--backgroundColor);
      color: var(--textColor);
      border-radius: 9999px;
      padding: 0.5em 0.8em;
      font-size: 0.7em;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      opacity: 0.6;
      transition: var(--transitionSlow);

      & + a {
        margin-left: 1rem;
      }

      &:hover {
        opacity: 1;
        transition: var(--transitionSlow);
      }
    }
  }
`

function Breakdowns({ posts }) {

  return (
    <>
    <Header active="breakdowns" />
    <Container>
      <GridWrapper>
      {posts.map((post, index) => (
        <ArticleCard key={index} delay={index * 150}>
          {post.content.img && <img src={post.content.img} />}
          <h4>{post.content.title}</h4>
          <div className="tags">
            {post.content.tags.map(tag => (
              <Link href={`/breakdowns?tag=${tag}`} key={tag}>{`#${tag}`}</Link>
            ))}
          </div>
          <Button primary willLoad link={`/breakdowns/${post.slug}`}>View Breakdown</Button>
        </ArticleCard>
      ))}
      </GridWrapper>
      <Footer />
    </Container>
    </>
  );
}

export const getStaticProps = async () => {

  const files = fs.readdirSync(path.join('posts/breakdowns'));

  const posts = files.map((filename => {
    const slug = filename.replace('.mdx', '');

    const markdown = fs.readFileSync(path.join('posts/breakdowns', filename), 'utf-8');
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

export default Breakdowns;
