import { useState } from "react";
import Icon, { type IconType } from "../Icon/Icon";
import "./sidebarButton.css";

interface SidebarButtonProps {
  icon?: IconType;
  label?: string;
  variant?: "primary" | "secondary" | "promo" | "gold";
  active?: boolean;
}

const SidebarButton = ({
  icon,
  label = "Label",
  variant = "secondary",
  active = false,
}: SidebarButtonProps) => {
  // В идеале, лучше написать через hover в css для прозводительности, но я сделал через стейт для экономии времени
  const [isHovered, setIsHovered] = useState(false);

  const isHighlighted = isHovered || active;

  switch (variant) {
    case "gold":
      return (
        <button
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full h-[3rem] flex relatve duration-200 ${
            isHighlighted ? "pl-[1.5rem]" : "pl-[1.25rem]"
          }`}
        >
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 w-[10rem] h-full ${
                !isHovered && "-translate-x-[1rem]"
              } 
              duration-200 sb-background--${variant}`}
            ></div>
            <div
              className={`absolute top-0 left-0 w-[2px] h-full sb-line--gold ${
                variant == "gold" || active ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
          <div className="flex items-center justify-start w-full h-full gap-0.5 relative z-[1]">
            <Icon icon={icon} className="w-[2.5rem]" />

            <span
              className={`block text-[#FFCC66] tracking-[0.2px] uppercase font-bold text-lg duration-200 opacity-100`}
            >
              {label}
            </span>
          </div>
        </button>
      );
    case "promo":
      return (
        <button
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full h-[3rem] flex duration-200 overflow-hidden ${
            isHovered ? "pl-[1.5rem]" : "pl-[1rem]"
          }`}
        >
          <div
            className={`absolute top-0 left-0 h-full w-[2px] sb-line--${variant}`}
          ></div>
          <img
            className={`absolute top-0 left-0 w-[10rem] h-full object-cover duration-200 ${
              !isHovered && "-translate-x-2"
            }`}
            src="/svg-background/promo.svg"
            alt=""
          />

          <div className="flex items-center justify-start w-full h-full gap-6 relative z-[1]">
            <Icon icon={icon} className="w-[1rem] h-[1rem]" />

            <span
              className={`block text-[#ffebd4] tracking-[0.2px] uppercase font-bold text-lg duration-200`}
            >
              {label}
            </span>
          </div>
        </button>
      );
    default:
      return (
        <button
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full h-[3rem] flex relatve duration-200 ${
            isHighlighted ? "pl-[1.5rem]" : "pl-[1.25rem]"
          }`}
        >
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            {isHovered && !active && (
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[5.625rem] h-[5.625rem] sb-radial-gradient--hover--${variant} opacity-65`}
              ></div>
            )}
            <div
              className={`absolute top-1/2 left-[-2.5rem] -translate-y-1/2 w-[5.625rem] h-[5.625rem] sb-radial-gradient--${variant}
              ${
                variant == "primary"
                  ? "opacity-100"
                  : active
                  ? "opacity-65"
                  : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute top-0 left-0 w-[2px] h-full sb-line--${variant} ${
                variant == "primary" || active ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>

          <div className="flex items-center justify-start w-full h-full gap-0.5 relative z-[1]">
            <Icon
              icon={icon}
              className={`w-[2.5rem] ${
                isHighlighted || icon == "ten_years"
                  ? "opacity-100"
                  : "opacity-75"
              }`}
            />

            <span
              className={`block text-white tracking-[0.2px] uppercase font-bold text-lg duration-200 ${
                isHighlighted ? "opacity-100" : "opacity-75"
              }`}
            >
              {label}
            </span>
          </div>
        </button>
      );
  }
};

export default SidebarButton;
