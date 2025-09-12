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

const vehicleTypeIcons = {
  submarine: "/vehicle-type-icons/submarine.svg",
  destroyer: "/vehicle-type-icons/destroyer.svg",
  cruiser: "/vehicle-type-icons/cruiser.svg",
  battleship: "/vehicle-type-icons/battleship.svg",
  aircarrier: "/vehicle-type-icons/aircarrier.svg",
};

const nationFlags = {
  commonwealth: "/nation-flags/commonwealth.svg",
  europe: "/nation-flags/europe.svg",
  france: "/nation-flags/france.svg",
  germany: "/nation-flags/germany.svg",
  italy: "/nation-flags/italy.svg",
  japan: "/nation-flags/japan.svg",
  netherlands: "/nation-flags/netherlands.svg",
  pan_america: "/nation-flags/pan_america.svg",
  pan_asia: "/nation-flags/pan_asia.svg",
  spain: "/nation-flags/spain.svg",
  uk: "/nation-flags/uk.svg",
  usa: "/nation-flags/usa.svg",
  ussr: "/nation-flags/ussr.svg",
};

export const iconSources = {
  ...sidebarIcons,
  ...defaultIcons,
  ...vehicleTypeIcons,
  ...nationFlags,
};
