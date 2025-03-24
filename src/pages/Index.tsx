import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpenText, Feather, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      <div className="relative flex-1 flex flex-col">
        {/* Background effects */}
        <div className="absolute inset-0 bg-noise pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "1s" }}></div>
        
        {/* Hero section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16">
          <div className="space-y-6 max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="text-gradient">创作精美小说</span> 借助先进AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              使用我们高级的AI小说生成器创作引人入胜的故事。只需几个提示，即可将您的想法转化为精美编写的叙事。
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/editor">
                  <Feather className="mr-2 h-5 w-5" />
                  开始写作
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">
                  <BookOpenText className="mr-2 h-5 w-5" />
                  探索功能
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-20 bg-accent/50">
          <div className="container px-4 space-y-16">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                高级功能
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                为创意作家精心打造
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                我们的高级AI工具帮助您更好、更快、更美地写作。
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">AI驱动写作</h3>
                <p className="text-muted-foreground">通过我们先进的AI模型生成优美的散文、真实的对话和引人入胜的情节发展。</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Feather className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">优雅编辑器</h3>
                <p className="text-muted-foreground">在专为专注和创造力设计的美观、无干扰的环境中写作。</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <BookOpenText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">小说组织</h3>
                <p className="text-muted-foreground">在一个无缝界面中管理您的章节、角色档案和故事情节。</p>
              </div>
            </div>
            
            <div className="text-center pt-8">
              <Button asChild className="group">
                <Link to="/dashboard">
                  查看全部功能
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-card py-10 border-t">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-medium">小说AI</span>
              </div>
              
              <div className="flex gap-8">
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  关于
                </Link>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  价格
                </Link>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  博客
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  联系
                </Link>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © 2023 小说AI。保留所有权利。
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
