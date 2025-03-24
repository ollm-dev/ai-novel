import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { NovelCard } from "@/components/NovelCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const allNovels = [
  {
    id: "1",
    title: "暗影的拥抱",
    description: "一部关于一名侦探在调查连环杀手案件时发现超自然能力的悬疑惊悚小说。",
    genre: "悬疑",
    wordCount: 24560,
    lastUpdated: "2023-11-15",
  },
  {
    id: "2",
    title: "星辰之外",
    description: "一部太空歌剧，讲述一位不情愿的船长和她的多元化船员在殖民星系中航行政治紧张局势的旅程。",
    genre: "科幻",
    wordCount: 32150,
    lastUpdated: "2023-10-28",
  },
  {
    id: "3",
    title: "远古低语",
    description: "在一个魔法被精英少数人控制的世界里，一位年轻的学者发现了可能永远改变权力平衡的古代文本。",
    genre: "奇幻",
    wordCount: 18730,
    lastUpdated: "2023-11-02",
  },
  {
    id: "4",
    title: "最后的夏天",
    description: "一个关于一群朋友在上大学前度过最后一个夏天的成长故事。",
    genre: "现代",
    wordCount: 15200,
    lastUpdated: "2023-09-18",
  },
  {
    id: "5",
    title: "明日回声",
    description: "一个后启示录的故事，人类在灾难性事件后重建，却面临来自自己创造物的新威胁。",
    genre: "科幻",
    wordCount: 28900,
    lastUpdated: "2023-11-10",
  },
  {
    id: "6",
    title: "交织的心",
    description: "一段跨越数十年的爱情故事，跟随两个灵魂在生活的不同阶段不断相遇。",
    genre: "爱情",
    wordCount: 21350,
    lastUpdated: "2023-10-05",
  },
];

const Library = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  
  const filteredNovels = allNovels.filter(novel => {
    const matchesSearch = novel.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         novel.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = genreFilter === "all" || novel.genre === genreFilter;
    
    return matchesSearch && matchesGenre;
  });
  
  const genres = ["all", ...new Set(allNovels.map(novel => novel.genre))];
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      <main className="flex-1 pt-16">
        <div className="container py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-serif font-semibold mb-2">您的书库</h1>
            <p className="text-muted-foreground">浏览和管理您的小说集合</p>
          </header>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="按标题或描述搜索..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 self-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">筛选</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="genre-filter">类型</Label>
                      <Select value={genreFilter} onValueChange={setGenreFilter}>
                        <SelectTrigger id="genre-filter">
                          <SelectValue placeholder="选择类型" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map(genre => (
                            <SelectItem key={genre} value={genre}>
                              {genre === "all" ? "所有类型" : genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sort-by">排序方式</Label>
                      <Select defaultValue="recent">
                        <SelectTrigger id="sort-by">
                          <SelectValue placeholder="排序方式" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">最近更新</SelectItem>
                          <SelectItem value="title">标题 A-Z</SelectItem>
                          <SelectItem value="wordcount">字数</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {filteredNovels.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNovels.map(novel => (
                  <NovelCard key={novel.id} {...novel} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNovels.map(novel => (
                  <div key={novel.id} className="flex items-center gap-4 p-3 bg-card border rounded-lg">
                    <div className="w-12 h-12 flex-shrink-0 rounded-md bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center">
                      <span className="font-serif text-lg font-medium text-primary">
                        {novel.title.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{novel.title}</h3>
                      <div className="flex flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-1">
                        <span>{novel.genre}</span>
                        <span>{novel.wordCount.toLocaleString()} 字</span>
                        <span>更新于: {novel.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/novel/${novel.id}`}>阅读</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/editor?id=${novel.id}`}>编辑</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground space-y-4">
              <Search className="h-12 w-12 opacity-20" />
              <h3 className="text-xl font-medium">未找到小说</h3>
              <p>请调整搜索条件或筛选器</p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  清除搜索
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Library;
