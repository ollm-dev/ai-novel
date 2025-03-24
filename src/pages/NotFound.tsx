import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 错误: 用户尝试访问不存在的路由:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <div className="text-[10rem] font-serif font-bold leading-none opacity-10">404</div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-serif font-bold">页面未找到</h1>
            <p className="text-muted-foreground mt-2">
              我们找不到您要查找的页面。
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          路径 <code className="bg-secondary px-1 py-0.5 rounded text-sm">{location.pathname}</code> 不存在或可能已被移动。
        </p>
        
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            返回首页
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
