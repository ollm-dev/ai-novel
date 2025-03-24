import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { 
  BookText, 
  LibraryBig, 
  Home,
  Menu
} from "lucide-react";
import { useState } from "react";

export function MainNav() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    {
      name: "首页",
      path: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: "编辑器",
      path: "/editor",
      icon: <BookText className="h-4 w-4 mr-2" />,
    },
    {
      name: "书库",
      path: "/library",
      icon: <LibraryBig className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-medium">小说AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              to={route.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                location.pathname === route.path 
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild className="hidden md:flex">
            <Link to="/dashboard">控制台</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="container py-4 border-t">
            <nav className="flex flex-col gap-2">
              {routes.map((route) => (
                <Link 
                  key={route.path} 
                  to={route.path}
                  className={cn(
                    "flex items-center text-sm font-medium p-2 rounded-md transition-colors",
                    location.pathname === route.path 
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {route.icon}
                  {route.name}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  控制台
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
