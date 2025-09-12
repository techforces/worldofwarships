const defaultIcons = {
  arrow: "/icons/arrow.svg",
  coal: "/icons/coal.svg",
  experience: "/icons/experience.svg",
  filter: "/icons/filter.svg",
  gold: "/icons/gold.svg",
  mute: "/icons/mute.svg",
  premium: "/icons/premium.svg",
  search: "/icons/search.svg",
  steel: "/icons/steel.svg",
  volume: "/icons/volume.svg",
  wallet: "/icons/wallet.svg",
};

const sidebarIcons = {
  featured: "/sidebar-icons/featured.svg",
  ship: "/sidebar-icons/ship.svg",
  commander: "/sidebar-icons/commander.svg",
  crate: "/sidebar-icons/crate.svg",
  instruments: "/sidebar-icons/instruments.svg",
  knot: "/sidebar-icons/knot.svg",
  ten_years: "/sidebar-icons/10-years.svg",
  gold_and_silver: "/sidebar-icons/gold-and-silver.svg",
  star: "/sidebar-icons/star.svg",
};

const iconSources = {
  ...sidebarIcons,
  ...defaultIcons,
};

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
