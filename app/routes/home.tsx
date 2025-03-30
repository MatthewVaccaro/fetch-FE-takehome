import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { API } from "~/api/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  try {
    const res = await API.get("/dogs/breeds");
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Home() {
  return <Welcome />;
}
