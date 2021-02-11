import {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
} from "next";
import Link from "next/link";
import { Article } from "@components/Article";
import type { Post } from "../index";

export default function About({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Article>
      <p>
        <Link href="/">Home</Link> <Link href="/about">About</Link>
      </p>

      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </Article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const emptyPost: Post = {
    id: 0,
    userId: 0,
    title: "Article not found",
    body: "",
  };

  if (!params?.id) {
    return {
      props: {
        post: emptyPost,
      },
    };
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  const post: Post = await res.json();
  return {
    props: {
      post,
    },
  };
};
