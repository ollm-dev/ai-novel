import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NovelCardProps {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  genre: string;
  wordCount: number;
  lastUpdated: string;
  className?: string;
}

export function NovelCard({
  id,
  title,
  description,
  coverImage,
  genre,
  wordCount,
  lastUpdated,
  className,
}: NovelCardProps) {
  const defaultCover = "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary), 0.2))";
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <div 
        className="aspect-[5/2] bg-cover bg-center relative"
        style={{ 
          backgroundImage: coverImage ? `url(${coverImage})` : defaultCover 
        }}
      >
        <div className="absolute top-2 right-2">
          <Badge>{genre}</Badge>
        </div>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="font-serif text-xl truncate">{title}</CardTitle>
        <div className="flex text-xs text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{wordCount.toLocaleString()} 字</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={lastUpdated}>{lastUpdated}</time>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/novel/${id}`}>阅读</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/editor?id=${id}`}>
            <Edit2 className="h-3.5 w-3.5 mr-2" />
            编辑
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
