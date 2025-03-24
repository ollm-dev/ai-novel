import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Undo, Redo, BookOpen, Save } from "lucide-react";
import { toast } from "sonner";

interface EditorComponentProps {
  initialContent?: string;
  isCollapsed?: boolean;
}

export function EditorComponent({ initialContent = "", isCollapsed = false }: EditorComponentProps) {
  const [content, setContent] = useState(initialContent);
  const [isTyping, setIsTyping] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Calculate word count
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    
    // Auto save functionality
    const timer = setTimeout(() => {
      if (isTyping) {
        toast.success("草稿已自动保存", {
          position: "bottom-right",
          duration: 2000,
        });
        setIsTyping(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [content, isTyping]);
  
  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setContent(target.innerText);
    setIsTyping(true);
  };
  
  const handleSave = () => {
    toast.success("小说保存成功");
  };
  
  const generateText = () => {
    const generatedText = "清晨的阳光在鹅卵石街道上投下长长的阴影，艾玛穿过宁静的村庄。她能感觉到古老书籍在她的包里的重量，每走一步，它的秘密都压在她的背上。村民们还没有从家里出来，给了她一个难得的独处时刻来思考下一步行动。";
    
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    if (range && editorRef.current) {
      const textNode = document.createTextNode(generatedText);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      setContent(editorRef.current.innerText);
      toast.success("已添加AI生成的文本");
      setIsTyping(true);
    }
  };
  
  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${isCollapsed ? "ml-0" : "ml-0 md:ml-64"}`}>
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-16 z-10">
        <div className="container flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="撤销">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="重做">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {wordCount} 字
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={generateText}>
              <Sparkles className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">生成</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">保存</span>
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">预览</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 min-h-[70vh] shadow-sm">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleContentChange}
              className="outline-none font-serif text-lg leading-relaxed min-h-full"
              dangerouslySetInnerHTML={{ __html: initialContent }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
