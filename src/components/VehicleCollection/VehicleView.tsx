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

  return (
    <div
      onLoad={() => setIsLoaded(true)}
      className="fixed top-0 left-0 h-full w-full z-100 bg-[rgba(10,18,24,0.4)] backdrop-blur-2xl"
    >
      <div className="absolute top-1/2 left-1/2 -translate-1/2 max-w-[90rem] w-full h-full max-h-[100vh] px-[1.25rem] py-[9rem] flex flex-col justify-center items-center gap-30">
        <div className="flex flex-col items-center gap-10 ">
          <h1
            className={`tracking-[1px] uppercase font-bold text-[4rem] ${
              isLoaded ? "opacity-100" : "opacity-0"
            } duration-500 delay-100`}
          >
            O Корабле
          </h1>

          <div className="w-full flex gap-40 items-center">
            <div className="w-full flex flex-col">
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
                className={`text-xl h-full ${
                  isLoaded ? "opacity-75" : "opacity-0"
                } duration-500 delay-300`}
              >
                {data.type.title} {toRoman(data.level)} уровня
              </p>
              <div
                className={`mt-12 flex-1 overflow-y-auto pr-4 shrink ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } duration-500 delay-400`}
              >
                <p className="text-xl min-h-0 h-[18.75rem] max-h-max leading-[165%] shrink">
                  {data.description}
                </p>
              </div>
            </div>
            <div
              className={`w-[43.75rem] h-[25rem] relative shrink-0 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } duration-500 delay-500`}
            >
              <LazyImage
                className="absolute right-0 top-0 w-[60%]"
                src={data.nation.icons.large}
                alt=""
              />

              <LazyImage
                className="absolute w-full h-full object-contain top-0 left-0"
                src={data.icons.large}
                alt=""
              />
            </div>
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
