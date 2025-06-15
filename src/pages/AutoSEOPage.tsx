import React from "react";
import { Card } from "@/components/ui/card";
import KeywordAnalysisCard from "@/components/auto-seo/KeywordAnalysisCard";
import LandingPageGrid from "@/components/auto-seo/LandingPageGrid";
import SEOAIAssistant from "@/components/auto-seo/SEOAIAssistant";

const AutoSEOPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">自动建站霸屏</h1>
          <p className="text-gray-600">
            AI自动分析品牌关键词，生成优化着陆页，提升搜索引擎排名
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 左侧：关键词分析和着陆页管理 */}
          <div className="lg:col-span-2 space-y-6">
            <KeywordAnalysisCard />
            <LandingPageGrid />
          </div>
          
          {/* 右侧：AI SEO助手 */}
          <div className="lg:col-span-1 h-full">
            <SEOAIAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSEOPage;
