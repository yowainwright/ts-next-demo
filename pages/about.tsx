import Link from "next/link";
import { Article } from "@components/Article";

export default function About() {
  return (
    <Article>
      <h1>About</h1>
      <p>
        <Link href="/">Home</Link>
      </p>
      <p>Test about.</p>
    </Article>
  );
}
