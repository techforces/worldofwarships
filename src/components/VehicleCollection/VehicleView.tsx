import type { Vehicle } from "../../utils/queryTypes";
import { toRoman } from "../../utils/utils";
import LazyImage from "../LazyImage/LazyImage";
import Button from "../Button/Button";
import { useState } from "react";

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

  return (
    <div
      onLoad={() => setIsLoaded(true)}
      className="fixed top-0 left-0 h-full w-full z-100 bg-[rgba(10,18,24,0.4)] backdrop-blur-2xl"
    >
      <div className="absolute top-1/2 left-1/2 -translate-1/2 max-w-[120rem] w-full h-full max-h-[100vh] px-[10rem] py-[7.5vh] flex flex-col justify-between items-center gap-15">
        <h1
          className={`tracking-[1px] leading-[100%] uppercase font-bold text-[4rem] ${
            isLoaded ? "opacity-100" : "opacity-0"
          } duration-500 delay-100`}
        >
          O Корабле
        </h1>

        <div className="w-full flex gap-10 items-center h-max min-h-0">
          <div className="w-full flex flex-col min-h-0 h-full">
            <div className="flex gap-3 items-center">
              <h2
                className={`tracking-[1px] uppercase font-bold text-5xl w-max ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } duration-500 delay-200`}
              >
                {data.title}
              </h2>
              <LazyImage
                src={data.type.icons.default}
                className={`w-[6.5rem] object-contain ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } duration-500 delay-200`}
                alt=""
              />
            </div>
            <p
              className={`text-xl h-max ${
                isLoaded ? "opacity-75" : "opacity-0"
              } duration-500 delay-300`}
            >
              {data.type.title} {toRoman(data.level)} уровня
            </p>
            <div
              className={`mt-12 flex-1 overflow-y-auto pr-4 shrink ${
                isLoaded ? "opacity-100" : "opacity-0"
              } duration-500 delay-400 max-h-max flex flex-col gap-2`}
            >
              {/* <p className="text-xl min-h-0 h-max max-h-full leading-[165%] shrink">
                {data.description}
              </p> */}
              {parseDescription(data.description)}
            </div>
          </div>
          <div
            className={`w-[50%] h-full relative shrink-0 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } duration-500 delay-500`}
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
        </div>

        <div
          className={`${
            isLoaded ? "opacity-100" : "opacity-0"
          } duration-500 delay-700`}
        >
          <Button handleClick={() => setItemIndex(null)} label={"Закрыть"} />
        </div>
      </div>
    </div>
  );
};

export default VehicleView;
