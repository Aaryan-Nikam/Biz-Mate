
import React, { useState, useEffect } from "react";
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
  Mail,
  Sun,
  Wind,
  HomeIcon,
  FileText,
  TrendingUp
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { NicheType } from "@/components/NicheSelection";
import { Badge } from "@/components/ui/badge";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
  badgeText?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  collapsed,
  badgeText
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
      {!collapsed && (
        <div className="flex flex-1 items-center justify-between">
          <span>{label}</span>
          {badgeText && (
            <Badge variant="outline" className="text-xs">
              {badgeText}
            </Badge>
          )}
        </div>
      )}
    </Button>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useUser();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);

  // Update collapsed state when mobile status changes
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const getNicheIcon = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return Sun;
      case "hvac":
        return Wind;
      case "remodeling":
        return HomeIcon;
      default:
        return Home;
    }
  };

  const getNicheDashboardPath = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return "/solar-dashboard";
      case "hvac":
        return "/hvac-dashboard";
      case "remodeling":
        return "/remodeling-dashboard";
      default:
        return "/dashboard";
    }
  };

  // Organize nav items into categories
  const mainNavItems = [
    { 
      icon: getNicheIcon(user?.niche), 
      label: user?.niche 
        ? `${user.niche.charAt(0).toUpperCase() + user.niche.slice(1)} Dashboard` 
        : "Dashboard", 
      path: getNicheDashboardPath(user?.niche)
    }
  ];

  const featureNavItems = [
    { 
      icon: Calculator, 
      label: "ROI Calculator", 
      path: "/calculator" 
    },
    { 
      icon: FileText, 
      label: "Quote Estimator", 
      path: "/quote" 
    },
    { 
      icon: Mail, 
      label: "Send Quote", 
      path: "/send" 
    }
  ];

  const accountNavItems = [
    { 
      icon: User, 
      label: "My Account", 
      path: "/account" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/settings" 
    }
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

        {!collapsed && user?.niche && (
          <div className="mb-4 px-3">
            <Badge variant="outline" className="mb-2">
              {user.niche === "solar" && "Solar Dashboard"}
              {user.niche === "hvac" && "HVAC Dashboard"}
              {user.niche === "remodeling" && "Remodeling Dashboard"}
            </Badge>
          </div>
        )}

        <nav className="space-y-4">
          {/* Main Navigation */}
          <div>
            {!collapsed && <div className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Main</div>}
            {mainNavItems.map((item) => (
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
          </div>

          {/* Features Navigation */}
          <div>
            {!collapsed && <div className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Features</div>}
            {featureNavItems.map((item) => (
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
          </div>

          {/* Account Navigation */}
          <div>
            {!collapsed && <div className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Account</div>}
            {accountNavItems.map((item) => (
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
          </div>
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
