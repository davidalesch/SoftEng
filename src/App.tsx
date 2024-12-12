import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { User, Send, Home, Wallet, Settings, LogOut, Check, Menu, Banknote, Info } from "lucide-react";
import { useToast } from "./components/ui/hooks/use-toast";

const NavigationSidebar = ({ isMobile = false, onClose }) => {
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Send, label: "Transfer Funds", path: "/transfer-funds" },
    { icon: Wallet, label: "Account Top-Up", path: "/account-top-up" },
    { icon: Banknote, label: "Exchange rates", path: "/exchange-rates" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={`${isMobile ? '' : 'bg-gray-50 w-64 border-r p-4 h-screen'}`}>
      {!isMobile && (
        <div className="mb-8">
          <div className="animate-fade-in-down hover:scale-110 transition-transform duration-300 font-bold text-4xl">PeerPay</div>
        </div>
      )}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

const Header = ({ user, onSignOut }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = window.location.pathname;
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Convert path to display name
  const getPageName = () => {
    const path = location.split('/')[1];
    if (!path) return 'Home';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center">
      {/* Mobile Menu Toggle */}
      <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
        <SheetTrigger asChild>
        <Button variant="ghost" className="mr-4 md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
        <NavigationSidebar 
          isMobile={true} 
          onClose={() => setIsNavOpen(false)} 
        />
        </SheetContent>
      </Sheet>
      
      <div className="font-bold text-2xl">
        {getPageName().replace(/-/g, ' ')}
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        onClick={() => navigate('/customer-support')}
      >
        Support
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
            <span onClick={() => navigate('/manage-account')}>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Check className="mr-2 h-4 w-4" />
            <span onClick={() => navigate('/verify-account')}>Verify My Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => {
          navigate('/');
          toast({
          title: "You have logged out",
          duration: 2000,
          });
        }}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
};

const App = () => {
  const user = {
    name: "Example User",
    email: "example.user@email.com",
    avatarUrl: "/path/to/avatar.jpg",
  };

  const handleSignOut = () => {
    console.log("Signing out");
  };

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <NavigationSidebar onClose={undefined} />
      </div>
      <div className="flex-1 flex flex-col">
        <Header user={user} onSignOut={handleSignOut} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;