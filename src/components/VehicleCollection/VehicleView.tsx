import { useCallback, useMemo, useEffect, useState } from "react";
import type { Vehicle } from "../../utils/queryTypes";
import { toRoman } from "../../utils/utils";
import LazyImage from "../LazyImage/LazyImage";
import Button from "../Button/Button";

interface VehicleViewProps {
  data: Vehicle;
  setItemIndex: (numl: number | null) => void;
}

const VehicleView = ({ data, setItemIndex }: VehicleViewProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const parseDescription = (text: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const paragraphs = doc.querySelectorAll("p");

    if (paragraphs.length > 0) {
      return [...paragraphs].map((p, index) => (
        <p key={index} className="text-xl leading-[165%] shrink">
          {p.textContent}
        </p>
      ));
    }
    return <p className="text-xl leading-[165%] shrink">{text}</p>;
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setItemIndex(null);
    },
    [setItemIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return (
    <div
      onLoad={() => setIsLoaded(true)}
      className="fixed top-0 left-0 h-full w-full z-100 bg-[rgba(10,18,24,0.4)] backdrop-blur-2xl"
    >
      <div className="absolute top-1/2 left-1/2 -translate-1/2 max-w-[120rem] w-full h-full max-h-[100vh] px-0 lg:px-[6rem] xl:px-[10rem] py-[5vh] sm:py-[7.5vh] flex flex-col justify-between items-center gap-15 lg:gap-15">
        <h1
          className={`tracking-[1px] leading-[100%] uppercase font-bold text-4xl xl:text-6xl ${
            isLoaded ? "opacity-100" : "opacity-0"
          } duration-500 delay-100`}
        >
          O Корабле
        </h1>

        <div className="w-full flex flex-col lg:flex-row-reverse gap-10 items-center h-max min-h-0 overflow-y-auto lg:overflow-y-visible px-[1.25rem] sm:px-[2.5rem] lg:px-0">
          <div
            className={`w-full h-auto aspect-video lg:aspect-auto lg:w-[50%] lg:h-full relative shrink-0 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } duration-500 delay-200 lg:delay-500`}
          >
            <LazyImage
              className="absolute right-0 top-1/2 w-full h-auto max-w-[75%] object-contain -translate-y-[70%] aspect-video"
              src={data.nation.icons.large}
              alt=""
            />

            <LazyImage
              className="absolute top-1/2 right-0 w-full h-auto object-contain -translate-y-1/2 aspect-video"
              src={data.icons.large}
              alt=""
            />
          </div>
          <div className="w-full flex flex-col lg:min-h-0 h-max lg:h-full">
            <div className="flex gap-3 items-center justify-center lg:justify-start">
              <h2
                className={`tracking-[1px] uppercase font-bold text-4xl xl:text-5xl w-max ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } duration-500 delay-300 lg:delay-200`}
              >
                {data.title}
              </h2>
              <LazyImage
                src={data.type.icons.default}
                className={`w-[5rem] lg:w-[6.5rem] object-contain ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } duration-500 delay-300 lg:delay-200`}
                alt=""
              />
            </div>
            <p
              className={`text-xl h-max ${
                isLoaded ? "opacity-75" : "opacity-0"
              } duration-500 delay-400 lg:delay-300 text-center lg:text-left`}
            >
              {data.type.title} {toRoman(data.level)} уровня
            </p>
            <div
              className={`mt-12 flex-1 lg:overflow-y-auto pr-4 lg:shrink ${
                isLoaded ? "opacity-100" : "opacity-0"
              } duration-500 delay-500 lg:delay-400 h-max lg:max-h-max flex flex-col gap-2`}
            >
              {parseDescription(data.description)}
            </div>
          </div>
        </div>

        <div
          className={`${
            isLoaded ? "opacity-100" : "opacity-0"
          } duration-500 delay-700`}
        >
          <Button
            handleClick={() => setItemIndex(null)}
            label={"Закрыть [ESC]"}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleView;
