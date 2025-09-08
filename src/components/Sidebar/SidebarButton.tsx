import SidebarIcon, { type SidebarIconType } from "./SidebarIcon";

interface SidebarButtonProps {
  icon: SidebarIconType;
  label: string;
  type: "primary" | "secondary";
}

const SidebarButton = ({
  icon,
  label,
  type = "secondary",
}: SidebarButtonProps) => {
  return (
    <div>
      <div>
        <SidebarIcon icon={icon} />
        <p>{label}</p>
      </div>
    </div>
  );
};

export default SidebarButton;
