import type { Route } from "./+types/home";
import Select, { type StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import { API } from "~/api/api";
import {
  Form,
  redirect,
  useSearchParams,
  useLoaderData,
  useSubmit,
} from "react-router";
import { z, ZodError } from "zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActionData } from "react-router";
import { useNavigation } from "react-router";
import { AdoptionCard } from "./components/adoptionCards";
import { SearchBar } from "./components/searchBar";
import { useFavoriteStore } from "~/store/favoriteStore";
import { FavoritesDrawer } from "./components/favoritesDrawer";
import { Pagination } from "./components/pagination";
import { MatchCard } from "./components/matchCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const searchResponseSchema = z.object({
  resultIds: z.array(z.string()),
  total: z.number(),
  next: z.string().nullish(),
  prev: z.string().nullish(),
});

const dogResponseSchema = z.array(
  z.object({
    img: z.string(),
    name: z.string(),
    age: z.number(),
    breed: z.string(),
    zip_code: z.string(),
    id: z.string(),
  })
);
export async function clientAction({ request }: Route.ActionArgs) {
  try {
    console.log("RUNNING ACTION");
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const query = {
      breeds: searchParams.getAll("breeds"),
      sort: searchParams.get("sort"),
      from: searchParams.get("from"),
    };

    const parseQuery = z
      .object({
        breeds: z.array(z.string()),
        sort: z.enum(["asc", "desc"]).default("asc").nullish(),
        from: z.string().nullish(),
      })
      .parse(query);

    console.log({ parseQuery: parseQuery.breeds });

    const params = new URLSearchParams();
    parseQuery.breeds.forEach((breed) => {
      if (breed !== "") {
        params.append("breeds[]", breed.trim());
      }
    });

    params.append("size", "25");
    params.append("from", parseQuery.from ?? "0");
    if (parseQuery.sort) {
      params.append(
        "sort",
        parseQuery.sort === "desc" ? "breed:desc" : "breed:asc"
      );
    }

    const searchRes = await API.get("/dogs/search", { params });
    const parseSearch = searchResponseSchema.parse(searchRes.data);

    const dogsRes = await API.post("/dogs", parseSearch.resultIds);
    const parseDogs = dogResponseSchema.parse(dogsRes.data);

    return { dogs: parseDogs, results: parseSearch };
  } catch (e) {
    console.log(e);
  }
}

export async function clientLoader() {
  try {
    const res = await API.get<Array<string>>("/dogs/breeds");
    const parse = z.array(z.string()).parse(res.data);
    return parse;
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
}

export const shouldRevalidate = () => false;

export default function Home() {
  const submit = useSubmit();
  const search = useActionData<typeof clientAction>();
  const [searchParams, setSearchParams] = useSearchParams();
  const isVisible = useFavoriteStore((s) => s.isVisible);
  const isMatch = useFavoriteStore((s) => s.isMatch);

  useEffect(() => {
    submit({}, { method: "post" });

    return () => {
      setSearchParams((prev) => {
        prev.delete("breeds");
        prev.delete("sort");
        prev.delete("index");
        return prev;
      });
    };
  }, [searchParams]);

  return (
    <>
      <div className="bg-brand-purple w-full h-32 rounded-full absolute top-0 -z-0 -translate-y-1/2" />
      {isVisible && <FavoritesDrawer />}
      {isMatch && <MatchCard />}
      <div className="max-w-[650px] mx-auto mt-6 z-20 relative px-3">
        <Form>
          <SearchBar />
          <label htmlFor="sort" className="text-brand-purple/70 font-light">
            Sort By Breed
            <select
              name="sort"
              className="py-4 text-brand-purple font-bold px-1"
              defaultValue={searchParams.get("sort") ?? "asc"}
              onChange={(e) => {
                setSearchParams((prevParams) => {
                  const newParams = new URLSearchParams(prevParams);
                  newParams.delete("sort");
                  newParams.append("sort", e.target.value);
                  return newParams;
                });
              }}
            >
              <option value="asc"> A - Z</option>
              <option value="desc"> Z - A</option>
            </select>
          </label>
        </Form>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 my">
          {search?.dogs?.map((dog) => (
            <li key={dog.id}>
              <AdoptionCard {...dog} />
            </li>
          )) ?? <h1> LOADING....</h1>}
        </ol>

        <Pagination
          totalPages={
            search?.results.total ? Math.ceil(search.results.total / 25) : 0
          }
        />
      </div>
    </>
  );
}
