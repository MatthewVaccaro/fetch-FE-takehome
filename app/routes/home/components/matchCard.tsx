import { useEffect, useState } from "react";
import { API } from "~/api/api";
import type { Dog } from "~/api/types";
import { useFavoriteStore } from "~/store/favoriteStore";

export function MatchCard() {
  const [dog, setDog] = useState<Dog | null>(null);
  const favorites = useFavoriteStore((s) => s.favorites);
  const toggleMatch = useFavoriteStore((s) => s.toggleMatch);

  useEffect(() => {
    API.post("/dogs/match", favorites)
      .then((res) => {
        console.log({ dog: res.data.match });
        setDog(res.data.match);
      })
      .catch((e) => console.log(e));

    return () => setDog(null);
  }, [favorites]);
  if (dog) {
    return (
      <div className="absolute w-full h-screen flex justify-center items-center bg-black/50 backdrop-blur-md z-50">
        <div className="bg-white rounded-lg w-full max-w-[550px] flex flex-col items-center px-6 pb-4">
          <div className="w-32 h-32 border-8 border-white rounded-full overflow-hidden -mt-14">
            <img
              className="object-cover w-full h-full"
              src={dog.img}
              alt={`${dog.name}'s adoption photo`}
            />
          </div>
          <h5 className="text-brand-purple/70">
            Meet your new Homebound Hound!
          </h5>
          <h2 className="text-brand-purple font-semibold">{dog?.name}</h2>
          <button
            onClick={toggleMatch}
            className="bg-brand-red rounded-md mt-3 px-6 py-3 text-white hover:bg-brand-red/70 duration-300 transition-all"
          >
            Schedule Adoption
          </button>
        </div>
      </div>
    );
  }
}
