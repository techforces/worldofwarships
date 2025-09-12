const iconSources = {
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

export type SidebarIconType = keyof typeof iconSources;

interface SidebarIconProps {
  icon?: SidebarIconType;
  className?: string;
}

const SidebarIcon = ({
  icon = "featured",
  className = "",
}: SidebarIconProps) => {
  return (
    <img
      className={`w-full duration-200 ${className} `}
      src={iconSources[icon]}
      alt={`${icon} icon`}
      draggable={false}
    />
  );
};

export default SidebarIcon;
