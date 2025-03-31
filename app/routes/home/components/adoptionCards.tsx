import type { z } from "zod";
import type { Dog, dogSchema } from "~/api/types";
import { useFavoriteStore } from "~/store/favoriteStore";
import { FavoriteIcon } from "../../../assets/favoriteIcon";

export function AdoptionCard(dog: Dog) {
  const { name, img, age, id, zip_code, breed } = dog;
  const addFavorite = useFavoriteStore((s) => s.add);
  const removeFavorite = useFavoriteStore((s) => s.remove);

  const isFavorite = useFavoriteStore(
    (s) => !!s.favorites.find((dog) => dog.id === id)
  );
  return (
    <div className="max-h-[281px] w-full rounded-md bg-white overflow-hidden relative hover:scale-105 duration-300 transition-all">
      <img
        className="w-full max-h-[168px] object-cover"
        src={img}
        alt={`${name}'s adoption photo`}
      />
      <div className="-mt-8 flex flex-col items-center p-3 pt-0">
        <button
          onClick={() => {
            isFavorite ? removeFavorite(id) : addFavorite(dog);
          }}
          className={`py-2 px-3 flex items-center justify-center rounded-sm ${
            isFavorite ? "bg-brand-red" : "bg-white"
          } absolute top-4 right-4`}
        >
          <FavoriteIcon
            fill={`${isFavorite ? "fill-white" : "fill-brand-red"} `}
          />
        </button>
        <h2 className="text-brand-purple font-bold text-center">{name}</h2>
        <h5 className="text-brand-purple font-light opacity-70">
          Age <span className="opacity-100 font-bold">{age}</span>
        </h5>
        <div className="flex gap-3 justify-center">
          <p className="text-brand-purple font-light opacity-70">
            Breed <span className="opacity-100 font-bold">{breed}</span>
          </p>
          <p className="text-brand-purple font-light opacity-70">
            Zip <span className="opacity-100 font-bold">{zip_code}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
