const iconSources = {
  featured: "/sidebar-icons/featured.svg",
  ship: "/sidebar-icons/ship.svg",
  commander: "/sidebar-icons/commander.svg",
  crate: "/sidebar-icons/crate.svg",
  instruments: "/sidebar-icons/instruments.svg",
  knot: "/sidebar-icons/knot.svg",
  ten_years: "/sidebar-icons/10-years.svg",
};

export type SidebarIconType = keyof typeof iconSources;

interface SidebarIconProps {
  icon?: SidebarIconType;
}

const SidebarIcon = ({ icon = "featured" }: SidebarIconProps) => {
  return <img src={iconSources[icon]} />;
};

export default SidebarIcon;
