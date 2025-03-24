import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarHeader 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpenText,
  Brain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Save,
  Settings,
  Wand2,
  User2,
  RefreshCw,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface EditorSidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function EditorSidebar({ collapsed = false, onCollapsedChange }: EditorSidebarProps) {
  const [localCollapsed, setLocalCollapsed] = useState(collapsed);
  const [generating, setGenerating] = useState(false);
  
  const toggleCollapsed = () => {
    const newState = !localCollapsed;
    setLocalCollapsed(newState);
    if (onCollapsedChange) onCollapsedChange(newState);
  };
  
  const handleGenerate = () => {
    setGenerating(true);
    toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 3000);
      }),
      {
        loading: "正在生成内容...",
        success: "成功生成内容",
        error: "生成内容失败",
      }
    );
    setTimeout(() => setGenerating(false), 3000);
  };

  const handleSave = () => {
    toast.success("小说草稿保存成功");
  };

  return (
    <Sidebar variant="static" collapsible="none" className="border-r">
      <SidebarHeader className="flex justify-between items-center px-4 py-2 h-14">
        <h2 className={`font-medium text-lg transition-opacity duration-200 ${localCollapsed ? "opacity-0" : "opacity-100"}`}>
          小说设置
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleCollapsed}
          aria-label={localCollapsed ? "展开侧边栏" : "收起侧边栏"}
        >
          {localCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </SidebarHeader>
      <SidebarContent className={`${localCollapsed ? "hidden" : "block"}`}>
        <Tabs defaultValue="write">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="write">
              <BookOpenText className="h-4 w-4 mr-2" />
              写作
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Sparkles className="h-4 w-4 mr-2" />
              AI
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              设置
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">标题</Label>
              <Input id="title" placeholder="输入小说标题" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea 
                id="description" 
                placeholder="写一段简短的小说描述" 
                className="resize-none h-20" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">类型</Label>
              <Input id="genre" placeholder="例如：奇幻、科幻、悬疑" />
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-3 bg-secondary/50 space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  AI 辅助
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="prompt">AI 提示</Label>
                  <Textarea 
                    id="prompt" 
                    placeholder="描述您希望AI生成的内容..." 
                    className="resize-none h-24" 
                  />
                </div>
                <Button 
                  onClick={handleGenerate} 
                  className="w-full" 
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      生成
                    </>
                  )}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">AI 角色</h3>
                <div className="border rounded-lg p-2 flex items-center gap-2">
                  <User2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">主角</p>
                    <p className="text-xs text-muted-foreground">30岁的侦探</p>
                  </div>
                  <Button variant="ghost" size="sm">编辑</Button>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  添加角色
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">编辑器设置</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="spellcheck" className="flex items-center gap-2 cursor-pointer">
                    <span>拼写检查</span>
                  </Label>
                  <Switch id="spellcheck" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="autosave" className="flex items-center gap-2 cursor-pointer">
                    <span>自动保存</span>
                  </Label>
                  <Switch id="autosave" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="focusmode" className="flex items-center gap-2 cursor-pointer">
                    <span>专注模式</span>
                  </Label>
                  <Switch id="focusmode" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="fontsize">字体大小</Label>
                <Input id="fontsize" type="number" defaultValue="16" min="12" max="24" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lineheight">行高</Label>
                <Input id="lineheight" type="number" defaultValue="1.6" min="1" max="3" step="0.1" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SidebarContent>
      <SidebarFooter className={`px-3 py-2 ${localCollapsed ? "hidden" : "block"}`}>
        <Button variant="outline" className="w-full">
          <Sparkles className="h-4 w-4 mr-2" />
          生成完整章节
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
