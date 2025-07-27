
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import Dashboard from "@/pages/Dashboard";
import EmailPage from "@/pages/EmailPage";
import UnifiedConversationPage from "@/pages/UnifiedConversationPage";
import EmailComposePage from "@/pages/EmailComposePage";
import CustomerManagement from "@/pages/CustomerManagement";
import NotFound from "@/pages/NotFound";
import AIKnowledgeBase from "@/pages/AIKnowledgeBase";
import AISettings from "@/pages/AISettings";
import SocialMediaManagement from "@/pages/SocialMediaManagement";
import AutoSEOPage from "@/pages/AutoSEOPage";
import TrafficHeatingPage from "@/pages/TrafficHeatingPage";
import TrendAnalysisPage from "@/pages/TrendAnalysisPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import BrandProfilePage from "@/pages/BrandProfilePage";
import InfluencerPage from "@/pages/InfluencerPage";
import AdsAssistantPage from "@/pages/AdsAssistantPage";
import CompetitorMonitoringPage from "@/pages/CompetitorMonitoringPage";
import CustomsAnalysisPage from "@/pages/CustomsAnalysisPage";

import EnterpriseCRM from "@/pages/EnterpriseCRM";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col" style={{ backgroundColor: '#F7F8FA' }}>
            <TopNavbar />
            <div className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* 营销对话 */}
                  <Route path="/marketing/conversations" element={<UnifiedConversationPage />} />
                  <Route path="/marketing/email" element={<EmailPage />} />
                  <Route path="/marketing/email/compose" element={<EmailComposePage />} />
                  <Route path="/marketing/whatsapp" element={<div className="p-6">WhatsApp页面开发中...</div>} />
                  
                  {/* 客户管理 */}
                  <Route path="/customers" element={<CustomerManagement />} />
                  
                  {/* Enterprise CRM */}
                  <Route path="/enterprise-crm" element={<EnterpriseCRM />} />
                  
                  {/* AI助手 */}
                  <Route path="/ai-agent/knowledge" element={<AIKnowledgeBase />} />
                  <Route path="/ai-agent/settings" element={<AISettings />} />
                  
                  {/* 品牌建设 */}
                  <Route path="/brand/social-media" element={<SocialMediaManagement />} />
                  <Route path="/brand/seo" element={<AutoSEOPage />} />
                  <Route path="/brand/traffic" element={<TrafficHeatingPage />} />
                  <Route path="/brand/profile" element={<BrandProfilePage />} />
                  
                  {/* 营销工具 */}
                  <Route path="/tools/trends" element={<TrendAnalysisPage />} />
                  <Route path="/tools/landing" element={<div className="p-6">落地页页面开发中...</div>} />
                  <Route path="/tools/influencer" element={<InfluencerPage />} />
                  <Route path="/tools/ads" element={<AdsAssistantPage />} />
                  <Route path="/tools/competitor" element={<CompetitorMonitoringPage />} />
                  <Route path="/tools/traffic-boost" element={<TrafficHeatingPage />} />
                  <Route path="/tools/customs-analysis" element={<CustomsAnalysisPage />} />
                  
                  {/* 个人资料 */}
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  
                  {/* 设置 */}
                  <Route path="/settings" element={<SettingsPage />} />
                  
                  {/* 404页面 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
        </div>
      </SidebarProvider>
    </BrowserRouter>
    </TooltipProvider>
);

export default App;
