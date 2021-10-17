import fs from "fs";
import path from "path";
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import Header from '../../components/Header';
import BlogLayout from "../../components/templates/BlogLayout";
import Button from "../../components/Button";

const Post = ({ source, metadata, slug }) => {

  return (
    <>
      <Head>
        <title>{metadata.title} - Sitely</title>
      </Head>
      <Header />
      <BlogLayout type="posts" source={source} metadata={metadata} slug={slug} />
    </>
  )
}

export const getStaticPaths = async () => {

  const files = fs.readdirSync('content/posts');

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

  const markdown = fs.readFileSync(path.join('content/posts', slug + '.mdx'), 'utf-8');
  const { content, data } = matter(markdown)
  const mdxSource = await serialize(content, { scope: data })
  return { props: { source: mdxSource, metadata: data, slug: slug } }
}

export default Post;