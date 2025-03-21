
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
import NicheSelectionPopup from "@/components/quote/NicheSelectionPopup";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
  badgeText?: string;
  requiresNiche?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  collapsed,
  badgeText,
  requiresNiche
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
          {requiresNiche && (
            <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
              Niche
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
  const { logout, user, setUserNiche } = useUser();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);
  const [nichePopupOpen, setNichePopupOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

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

  const handleNavigation = (path: string, requiresNiche: boolean = false) => {
    if (requiresNiche && !user?.niche && user?.role === "provider") {
      setPendingNavigation(path);
      setNichePopupOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleNicheSelect = (niche: NicheType) => {
    setUserNiche(niche);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  // Organize nav items into categories
  const mainNavItems = [
    { 
      icon: getNicheIcon(user?.niche), 
      label: user?.niche 
        ? `${user.niche.charAt(0).toUpperCase() + user.niche.slice(1)} Dashboard` 
        : "Dashboard", 
      path: getNicheDashboardPath(user?.niche),
      requiresNiche: false
    }
  ];

  // Create base feature items
  let featureNavItems = [
    { 
      icon: Calculator, 
      label: "ROI Calculator", 
      path: "/calculator",
      requiresNiche: true
    },
    { 
      icon: FileText, 
      label: user?.role === "homeowner" ? "Quote Requests" : "Quote Estimator", 
      path: "/quote",
      requiresNiche: user?.role === "provider"
    },
    { 
      icon: Mail, 
      label: "Send Quote", 
      path: "/send",
      requiresNiche: user?.role === "provider"
    }
  ];
  
  // Add KPI Tracker only for providers
  if (user?.role === "provider") {
    featureNavItems.push({ 
      icon: TrendingUp, 
      label: "KPI Tracker", 
      path: "/kpi-tracker",
      requiresNiche: true
    });
  }

  const accountNavItems = [
    { 
      icon: User, 
      label: "My Account", 
      path: "/account",
      requiresNiche: false
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/settings",
      requiresNiche: false
    }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <NicheSelectionPopup
        open={nichePopupOpen}
        onOpenChange={setNichePopupOpen}
        onSelectNiche={handleNicheSelect}
      />
      
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
                  onClick={() => handleNavigation(item.path, item.requiresNiche)}
                  collapsed={collapsed}
                  requiresNiche={item.requiresNiche}
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
                  onClick={() => handleNavigation(item.path, item.requiresNiche)}
                  collapsed={collapsed}
                  requiresNiche={item.requiresNiche}
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
                  onClick={() => handleNavigation(item.path, item.requiresNiche)}
                  collapsed={collapsed}
                  requiresNiche={item.requiresNiche}
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
    </>
  );
};

export default Sidebar;
