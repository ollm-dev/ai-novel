import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NovelCard } from "@/components/NovelCard";
import { BookOpen, Edit, Feather, LayoutGrid, List, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const recentNovels = [
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
];

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      <div className="flex-1 pt-16">
        <div className="container py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-serif font-semibold mb-2">控制台</h1>
            <p className="text-muted-foreground">管理您的小说和写作项目</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">小说总数</CardTitle>
                <CardDescription>您的写作集合</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">8</div>
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">已写字数</CardTitle>
                <CardDescription>所有小说总计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">75,440</div>
                  <Feather className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">AI生成次数</CardTitle>
                <CardDescription>本月</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">42</div>
                  <Edit className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="recents" className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="recents">最近</TabsTrigger>
                <TabsTrigger value="all">全部小说</TabsTrigger>
                <TabsTrigger value="drafts">草稿</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
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
                <Button asChild>
                  <Link to="/editor">
                    <Plus className="h-4 w-4 mr-2" />
                    新建小说
                  </Link>
                </Button>
              </div>
            </div>
            
            <TabsContent value="recents">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentNovels.map(novel => (
                    <NovelCard key={novel.id} {...novel} />
                  ))}
                  <Card className="flex flex-col items-center justify-center h-full min-h-[260px] border-dashed">
                    <Button variant="ghost" size="lg" asChild className="flex flex-col gap-2 h-auto py-8">
                      <Link to="/editor">
                        <Plus className="h-8 w-8" />
                        <span className="text-lg">创建新小说</span>
                      </Link>
                    </Button>
                  </Card>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentNovels.map(novel => (
                    <div key={novel.id} className="flex items-center gap-4 p-3 bg-card border rounded-lg">
                      <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{novel.title}</h3>
                        <div className="flex text-xs text-muted-foreground gap-4">
                          <span>{novel.genre}</span>
                          <span>{novel.wordCount.toLocaleString()} 字</span>
                          <span>更新于: {novel.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/novel/${novel.id}`}>阅读</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/editor?id=${novel.id}`}>编辑</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center p-4 border border-dashed rounded-lg">
                    <Button variant="ghost" asChild>
                      <Link to="/editor">
                        <Plus className="h-4 w-4 mr-2" />
                        创建新小说
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                在这里查看您所有的小说
              </div>
            </TabsContent>
            
            <TabsContent value="drafts">
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                您的未发布草稿将显示在这里
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
