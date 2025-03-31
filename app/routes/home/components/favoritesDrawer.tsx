import { useFavoriteStore } from "~/store/favoriteStore";
import backArrow from "~/assets/backArrow.svg";
import close from "~/assets/close.svg";
import { useEffect } from "react";

export function FavoritesDrawer() {
  const toggleVisible = useFavoriteStore((s) => s.toggleVisible);
  const removeFavorite = useFavoriteStore((s) => s.remove);
  const favorites = useFavoriteStore((s) => s.favorites);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-50 flex justify-end">
      <div className="w-5/6 h-screen bg-white rounded-l-xl p-6 overflow-y-scroll">
        <div className="mb-6">
          <div className="flex gap-2">
            <button onClick={toggleVisible}>
              <img src={backArrow} alt="Purple back arrow" />
            </button>
            <h3 className="font-semibold text-brand-purple"> Favorites </h3>
          </div>
          <p className="text-brand-purple/70">
            Companions you're really excited about!
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {favorites.map((dog) => (
            <li
              key={dog.id}
              className="w-full bg-brand-purple/20 rounded py-3 px-4 flex justify-between items-center"
            >
              <div className="flex gap-2">
                <img
                  className="rounded-full w-15 h-15 border-4 border-white object-cover"
                  src={dog.img}
                  alt={`${dog.name}'s adoption photo`}
                />
                <div className="flex flex-col">
                  <h4 className="text-brand-purple font-semibold">
                    {dog.name}
                  </h4>
                  <p className="text-brand-purple/70">
                    {dog.age} <span className="opacity-50"> | </span>
                    {dog.breed}
                    <span className="opacity-50"> | </span>
                    {dog.zip_code}
                  </p>
                </div>
              </div>
              <button onClick={() => removeFavorite(dog.id)}>
                <img src={close} alt="Red thin x" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
