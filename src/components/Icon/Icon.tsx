import { iconSources } from "./icons";

export type IconType = keyof typeof iconSources;

interface IconProps {
  icon?: IconType;
  className?: string;
}

const Icon = ({ icon = "featured", className = "" }: IconProps) => {
  return (
    <img
      className={`duration-200 ${className} `}
      src={iconSources[icon]}
      alt={`${icon} icon`}
      draggable={false}
    />
  );
};

export default Icon;
