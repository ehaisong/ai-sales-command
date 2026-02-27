
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
import BrandManagementPage from "@/pages/BrandManagementPage";
import BrandStrategyGenerationPage from "@/pages/BrandStrategyGenerationPage";
import InfluencerPage from "@/pages/InfluencerPage";
import AdsAssistantPage from "@/pages/AdsAssistantPage";
import CompetitorMonitoringPage from "@/pages/CompetitorMonitoringPage";
import CustomsAnalysisPage from "@/pages/CustomsAnalysisPage";
import LoginPage from "@/pages/LoginPage";
import CreditsRechargePage from "@/pages/CreditsRechargePage";
import CreditsManagementPage from "@/pages/CreditsManagementPage";

import EnterpriseCRM from "@/pages/EnterpriseCRM";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F8FA' }}>
        <TopNavbar />
        <div className="min-h-full">{children}</div>
      </main>
    </div>
  </SidebarProvider>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* Auth pages - no sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/credits/recharge" element={<CreditsRechargePage />} />

        {/* Main app with sidebar */}
        <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/marketing/conversations" element={<AppLayout><UnifiedConversationPage /></AppLayout>} />
        <Route path="/marketing/email" element={<AppLayout><EmailPage /></AppLayout>} />
        <Route path="/marketing/email/compose" element={<AppLayout><EmailComposePage /></AppLayout>} />
        <Route path="/marketing/whatsapp" element={<AppLayout><div className="p-6">WhatsApp页面开发中...</div></AppLayout>} />
        <Route path="/customers" element={<AppLayout><CustomerManagement /></AppLayout>} />
        <Route path="/enterprise-crm" element={<AppLayout><EnterpriseCRM /></AppLayout>} />
        <Route path="/ai-agent/knowledge" element={<AppLayout><AIKnowledgeBase /></AppLayout>} />
        <Route path="/ai-agent/settings" element={<AppLayout><AISettings /></AppLayout>} />
        <Route path="/brand/social-media" element={<AppLayout><SocialMediaManagement /></AppLayout>} />
        <Route path="/brand/seo" element={<AppLayout><AutoSEOPage /></AppLayout>} />
        <Route path="/brand/traffic" element={<AppLayout><TrafficHeatingPage /></AppLayout>} />
        <Route path="/brand/profile" element={<AppLayout><BrandProfilePage /></AppLayout>} />
        <Route path="/brand-management" element={<AppLayout><BrandManagementPage /></AppLayout>} />
        <Route path="/brand-strategy-generation" element={<AppLayout><BrandStrategyGenerationPage /></AppLayout>} />
        <Route path="/tools/trends" element={<AppLayout><TrendAnalysisPage /></AppLayout>} />
        <Route path="/tools/landing" element={<AppLayout><div className="p-6">落地页页面开发中...</div></AppLayout>} />
        <Route path="/tools/influencer" element={<AppLayout><InfluencerPage /></AppLayout>} />
        <Route path="/tools/ads" element={<AppLayout><AdsAssistantPage /></AppLayout>} />
        <Route path="/tools/competitor" element={<AppLayout><CompetitorMonitoringPage /></AppLayout>} />
        <Route path="/tools/traffic-boost" element={<AppLayout><TrafficHeatingPage /></AppLayout>} />
        <Route path="/tools/customs-analysis" element={<AppLayout><CustomsAnalysisPage /></AppLayout>} />
        <Route path="/credits" element={<AppLayout><CreditsManagementPage /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
