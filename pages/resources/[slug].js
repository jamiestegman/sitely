import fs from "fs";
import path from "path";
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';

import Header from '../../components/Header';
import ResourceLayout from "../../components/templates/ResourceLayout";
import Button from "../../components/Button";

const Post = ({ source, metadata, slug }) => {

  const components = {Button};

  return (
    <>
      <Head>
        <title>{metadata.title} - Sitely</title>
      </Head>
      <Header />
      <ResourceLayout type="resources" metadata={metadata} slug={slug} source={source} />
    </>
  )
}

export const getStaticPaths = async () => {

  const files = fs.readdirSync('content/resources');

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

  const markdown = fs.readFileSync(path.join('content/resources', slug + '.mdx'), 'utf-8');
  const { content, data } = matter(markdown)
  const mdxSource = await serialize(content, { scope: data })
  return { props: { source: mdxSource, metadata: data, slug: slug } }
}

export default Post;