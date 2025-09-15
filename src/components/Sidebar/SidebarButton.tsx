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
  switch (variant) {
    case "gold":
      return (
        <button
          className={`s-button--gold relative w-full h-[3rem] flex relatve duration-200 ${
            active ? "pl-[1.5rem]" : "pl-[1.25rem]"
          }`}
        >
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            <div
              className={`s-button-sb--gold absolute left-0 top-0 w-[10rem] h-full duration-200 sb-background--${variant}`}
            ></div>
            <div
              className={`absolute top-0 left-0 w-[2px] h-full sb-line--gold ${
                variant == "gold" || active ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
          <div className="s-button-content--gold flex items-center justify-start w-full h-full gap-0.5 relative z-[1]">
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
        <button className="s-button--promo relative w-full h-[3rem] flex duration-200 overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full w-[2px] sb-line--${variant}`}
          ></div>
          <img
            className="s-button-image--promo absolute top-0 left-0 w-[10rem] h-full object-cover duration-200"
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
          // onMouseOver={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          className={`s-button relative w-full h-[3rem] flex relatve duration-200 ${
            active ? "pl-[1.5rem]" : "pl-[1.25rem]"
          }`}
        >
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            {!active && (
              <div
                className={`s-button--hovered absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[5.625rem] h-[5.625rem] sb-radial-gradient--hover--${variant} opacity-65`}
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
              className={` w-[2.5rem] ${
                !active && icon != "ten_years" && "s-button-content"
              } opacity-100`}
            />

            <span
              className={`block text-white tracking-[0.2px] uppercase font-bold text-lg duration-200 ${
                active ? "opacity-100" : "opacity-75 s-button-content"
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
