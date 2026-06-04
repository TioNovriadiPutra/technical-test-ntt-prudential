import type { Icon } from "iconsax-reactjs";
import { Link, type To } from "react-router";

type Props = {
  dest: To;
  icon: Icon;
  label: string;
  isActive: boolean;
};

const SidebarButton = ({ dest, icon, label, isActive }: Props) => {
  const Icon = icon;

  return (
    <Link
      to={dest}
      className={`flex px-3 py-2.5 gap-3 rounded-lg ${isActive ? "text-neutral-900" : "text-neutral-600"} hover:text-neutral-900 ${isActive ? "bg-neutral-200" : "bg-neutral-50"} hover:bg-neutral-200 duration-300 transition-colors`}
    >
      <Icon size={18} strokeWidth={1.25} />

      <p className="text-sm font-medium">{label}</p>
    </Link>
  );
};

export default SidebarButton;
