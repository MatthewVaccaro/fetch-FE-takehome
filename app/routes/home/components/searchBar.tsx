import Select, { type StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import { useSearchParams, useLoaderData } from "react-router";
import { useMemo } from "react";
import { useFavoriteStore } from "~/store/favoriteStore";

const animatedComponents = makeAnimated();

export function SearchBar() {
  const data = useLoaderData<Array<string>>();
  const favorites = useFavoriteStore((s) => s.favorites);
  const toggleVisible = useFavoriteStore((s) => s.toggleVisible);
  const toggleMatch = useFavoriteStore((s) => s.toggleMatch);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValues = useMemo(() => {
    return searchParams
      .getAll("breeds")
      .filter(Boolean)
      .map((v) => ({ value: v, label: v }));
  }, [searchParams]);

  return (
    <div className="bg-white rounded-md">
      <Select
        className="py-2"
        name="breeds"
        placeholder="What breed are you looking for?"
        closeMenuOnSelect
        components={animatedComponents}
        value={searchValues}
        onChange={(e) => {
          const eventValue = e as Array<{ value: string; label: string }>;
          const selectedBreeds = eventValue.map(({ value }) => value);
          setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.delete("breeds");
            newParams.delete("from");
            selectedBreeds.forEach((breed) =>
              newParams.append("breeds", breed)
            );
            return newParams;
          });
        }}
        options={data.map((string) => ({
          value: string,
          label: string,
        }))}
        styles={customStyles}
        isMulti
      />
      <div className="px-3">
        <div className="w-full bg-brand-purple/20 h-[2px] rounded-sm " />
      </div>
      <div className="p-3 flex flex-col md:flex-row justify-between items-center">
        {favorites.length > 0 && (
          <div className="flex gap-2">
            <ul className="flex pl-6">
              {favorites.map((dog, index) => {
                if (index <= 2) {
                  return (
                    <li
                      key={dog.id}
                      className=" -ml-6 rounded-full border-4 box-border border-white overflow-hidden h-13 w-13"
                    >
                      <img
                        src={dog.img}
                        alt={`${dog.name}'s adoption photo`}
                        className="w-full h-full object-cover"
                      />
                    </li>
                  );
                }
              })}
              {favorites.length > 3 && (
                <li className="-ml-6 rounded-full border-4 box-border border-white bg-brand-purple h-14 w-14 flex items-center justify-center">
                  <h5 className="text-white font-semibold">
                    +{favorites.length - 3}
                  </h5>
                </li>
              )}
            </ul>
            <button
              onClick={toggleVisible}
              className="text-brand-purple font-semibold hover:text-brand-purple/50 duration-300 transition-all"
            >
              Edit Favorites
            </button>
          </div>
        )}
        {favorites.length > 0 && (
          <button
            onClick={toggleMatch}
            className="bg-brand-red rounded-md px-6 py-3 text-white hover:bg-brand-red/70 duration-300 transition-all"
          >
            Show Match
          </button>
        )}
      </div>
    </div>
  );
}

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    fontSize: "1rem", // text-xs
    fontWeight: 500, // font-semibold
    backgroundColor: "white",
    transition: "all 0.3s",
    boxShadow: "none",
    border: "white",
    paddingRight: 8,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#572EBB",
    borderRadius: "0.5rem",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "#572EBB",
    color: "white",
    transition: "all 0.3s",
    paddingLeft: 24,
    paddingRight: 24,
    ":hover": {
      color: "#572EBB",
      background: "#F0ECFB",
      paddingLeft: 12,
    },
  }),
  clearIndicator: () => ({
    color: "#DE543F",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: () => ({ display: "none" }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#572EBB",
      borderRadius: 100,
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
    paddingLeft: 12,
    paddingRight: 12,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "white",
    ":hover": {
      color: "#DE543F",
    },
  }),
};
