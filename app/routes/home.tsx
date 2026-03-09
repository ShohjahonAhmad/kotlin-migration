import type { Route } from "./+types/home";
import { OverviewPage } from "../page/index/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kotlin Programming Language" },
    {
      name: "description",
      content: "A modern programming language that makes developers happier.",
    },
  ];
}

export default function Home() {
  return <OverviewPage />;
}
