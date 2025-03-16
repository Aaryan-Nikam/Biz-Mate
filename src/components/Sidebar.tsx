
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  Settings,
  LogOut,
  User,
  Mail
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  collapsed
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-12 mb-1",
        isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "hover:bg-secondary"
      )}
      onClick={onClick}
    >
      <Icon size={20} className={cn("flex-shrink-0", collapsed ? "mr-0" : "mr-2")} />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useUser();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Calculator, label: "ROI Calculator", path: "/calculator" },
    { icon: BarChart3, label: "My Quotes", path: "/quote" },
    { icon: Mail, label: "Send Quote", path: "/send" },
    { icon: User, label: "My Account", path: "/account" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "h-screen fixed top-0 left-0 z-40 flex flex-col bg-white border-r border-border transition-all duration-300 ease-in-out pt-16",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 px-3 py-4">
        <div className="mb-6 flex items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full p-1 hover:bg-secondary"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => logout()}
          >
            <LogOut size={20} className={cn("flex-shrink-0", collapsed ? "mr-0" : "mr-2")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
