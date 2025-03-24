import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { EditorSidebar } from "@/components/EditorSidebar";
import { EditorComponent } from "@/components/EditorComponent";
import { SidebarProvider } from "@/components/ui/sidebar";

const defaultContent = `# 第一章：起点

清晨的阳光在鹅卵石街道上投下长长的阴影，艾玛穿过宁静的村庄。她能感觉到古老书籍在她的包里的重量，每走一步，它的秘密都压在她的背上。

村民们还没有从家里出来，给了她一个难得的独处时刻来思考下一步行动。布莱克伍德教授的警告在她脑海中回响："一旦你开始阅读，就没有回头路了。"

她在一棵古老橡树下找到了一个僻静的长椅，小心地从包里取出了那本皮质封面的书。封面上浮雕的复杂符号在晨光中似乎闪烁着光芒，几乎像是活的一样。

艾玛用手指沿着书脊滑动，感受到从内部散发出的微妙温暖。深吸一口气，她翻开了第一页。`;

const Editor = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <MainNav />
      
      <SidebarProvider>
        <div className="flex flex-1 pt-16 w-full">
          <EditorSidebar 
            collapsed={sidebarCollapsed} 
            onCollapsedChange={setSidebarCollapsed} 
          />
          <EditorComponent 
            initialContent={defaultContent} 
            isCollapsed={sidebarCollapsed} 
          />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Editor;
