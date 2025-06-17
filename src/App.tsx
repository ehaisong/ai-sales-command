
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import Dashboard from "@/pages/Dashboard";
import EmailPage from "@/pages/EmailPage";
import EmailComposePage from "@/pages/EmailComposePage";
import CustomerManagement from "@/pages/CustomerManagement";
import NotFound from "@/pages/NotFound";
import AIKnowledgeBase from "@/pages/AIKnowledgeBase";
import AISettings from "@/pages/AISettings";
import SocialMediaManagement from "@/pages/SocialMediaManagement";
import AutoSEOPage from "@/pages/AutoSEOPage";
import TrafficHeatingPage from "@/pages/TrafficHeatingPage";
import ProfilePage from "@/pages/ProfilePage";
import BrandProfilePage from "@/pages/BrandProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex w-full">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
              <TopNavbar />
              <div className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* 营销对话 */}
                  <Route path="/marketing/email" element={<EmailPage />} />
                  <Route path="/marketing/email/compose" element={<EmailComposePage />} />
                  <Route path="/marketing/whatsapp" element={<div className="p-6">WhatsApp页面开发中...</div>} />
                  
                  {/* 客户管理 */}
                  <Route path="/customers" element={<CustomerManagement />} />
                  
                  {/* AI业务员 */}
                  <Route path="/ai-agent/knowledge" element={<AIKnowledgeBase />} />
                  <Route path="/ai-agent/settings" element={<AISettings />} />
                  
                  {/* 品牌建设 */}
                  <Route path="/brand/social-media" element={<SocialMediaManagement />} />
                  <Route path="/brand/seo" element={<AutoSEOPage />} />
                  <Route path="/brand/traffic" element={<TrafficHeatingPage />} />
                  <Route path="/brand/profile" element={<BrandProfilePage />} />
                  
                  {/* 营销工具 */}
                  <Route path="/tools/trends" element={<div className="p-6">爆款趋势页面开发中...</div>} />
                  <Route path="/tools/landing" element={<div className="p-6">落地页页面开发中...</div>} />
                  <Route path="/tools/influencer" element={<div className="p-6">网红页面开发中...</div>} />
                  <Route path="/tools/ads" element={<div className="p-6">广告助手页面开发中...</div>} />
                  <Route path="/tools/competitor" element={<div className="p-6">竞品监控页面开发中...</div>} />
                  <Route path="/tools/traffic-boost" element={<TrafficHeatingPage />} />
                  
                  {/* 个人资料 */}
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  {/* 测试模块 */}
                  <Route path="/test" element={<div className="p-6">测试模块页面开发中...</div>} />
                  
                  {/* 设置 */}
                  <Route path="/settings" element={<div className="p-6">设置页面开发中...</div>} />
                  
                  {/* 404页面 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </SidebarProvider>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
