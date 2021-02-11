import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Head from "next/head";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BlogTitle = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

const BlogPostList = styled.ul`
  margin: 0 auto;
  max-width: calc(100% - 4rem);
`;

const BlogPostItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 1rem;
  &:hover {
    background: #f9f9f9;
    cursor: pointer;
  }
`;

const BlogPostItemTitle = styled.h2``;

const BlogPostItemBody = styled.p``;

const title: string = "Next.js + Typescript";
export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <BlogTitle>{title}</BlogTitle>
        <p>
          <Link href="/about">About</Link>
        </p>
        <p>A basic blog setup</p>
        <BlogPostList>
          {posts.map((post, i) => (
            <Link href="/posts/[id]" as={`/posts/${post.id}`} key={i}>
              <BlogPostItem>
                <BlogPostItemTitle>{post.title}</BlogPostItemTitle>
                <BlogPostItemBody>{post.body}</BlogPostItemBody>
              </BlogPostItem>
            </Link>
          ))}
        </BlogPostList>
      </Main>
    </Container>
  );
}

export type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();
  return {
    props: {
      posts,
    },
  };
};
