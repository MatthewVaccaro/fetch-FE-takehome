import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function Pagination(props: { totalPages: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<[number, number]>([0, 4]);

  useEffect(() => {
    console.log("STARTING");
    const currentPage = searchParams.get("from") ?? "0";
    const parsePage = parseInt(currentPage) / 25;
    const min = Math.max(parsePage - 1, 0);
    const max = Math.min(min + 4, props.totalPages);

    setRange([min, max]);
    return () => {
      // setRange([0, 4]);
    };
  }, []);

  useEffect(() => {
    if (props.totalPages) {
      console.log("EVERY");
      const currentPage = searchParams.get("from") ?? "0";
      const parsePage = parseInt(currentPage) / 25;

      console.log({
        parsePage,
        low: range[0],
        high: range[1],
        totalPages: props.totalPages,
      });

      if (parsePage === range[0] && range[0] > 0) {
        const low = Math.max(range[0] - 4, 0);
        setRange([low, range[0]]);
      }

      const max = Math.min(props.totalPages, range[1] + 4);
      if (parsePage === range[1] && max !== range[1]) {
        console.log("HIGH", max);
        setRange([range[1], max]);
      }
    }
    return () => {
      // setRange([0, 4]);
    };
  }, [searchParams, props.totalPages]);

  return (
    <footer className="flex justify-center mt-4">
      <ol className="flex gap-3 mx-auto">
        <li>
          <button
            className="p-4 border-2 border-brand-purple rounded-sm disabled:opacity-50"
            disabled={searchParams.get("from") === "0"}
            onClick={() => {
              setSearchParams((prevParams) => {
                const newParams = new URLSearchParams(prevParams);
                const previousCount = prevParams.get("from") ?? "0";
                newParams.delete("from");
                newParams.append("from", `${parseInt(previousCount) - 25}`);
                return newParams;
              });
            }}
          >
            <p className="text-brand-purple">Back</p>
          </button>
        </li>
        {findRange(range[0], range[1]).map((v) => {
          const currentPage = (searchParams.get("from") ?? "0") === `${v * 25}`;
          return (
            <li key={v}>
              <button
                onClick={() => {
                  setSearchParams((prevParams) => {
                    const newParams = new URLSearchParams(prevParams);
                    newParams.delete("from");
                    newParams.append("from", `${v * 25}`);
                    return newParams;
                  });
                }}
                className={`p-4 border-2 border-brand-purple rounded-sm ${
                  currentPage ? "bg-brand-purple" : "bg-brand-purple/20"
                }`}
              >
                <p
                  className={`${
                    currentPage ? "text-white" : "text-brand-purple"
                  } font-semibold`}
                >
                  {Math.round(v)}
                </p>
              </button>
            </li>
          );
        })}
        <li>
          <button
            disabled={searchParams.get("from") === `${props.totalPages * 25}`}
            onClick={() => {
              setSearchParams((prevParams) => {
                const newParams = new URLSearchParams(prevParams);
                const previousCount = prevParams.get("from") ?? "0";
                newParams.delete("from");
                newParams.append("from", `${parseInt(previousCount) + 25}`);
                return newParams;
              });
            }}
            className="p-4 border-2 border-brand-purple rounded-sm disabled:opacity-50"
          >
            <p className="text-brand-purple">Next</p>
          </button>
        </li>
      </ol>
    </footer>
  );
}

const findRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);
