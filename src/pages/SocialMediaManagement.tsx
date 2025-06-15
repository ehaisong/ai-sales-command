
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import SocialMediaTabs from "@/components/social-media/SocialMediaTabs";
import SocialPostList from "@/components/social-media/SocialPostList";
import SocialMediaAIChat from "@/components/social-media/SocialMediaAIChat";

const SocialMediaManagement = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">社交媒体管理</h1>
          <p className="text-gray-600">
            管理AI业务员的社交媒体发文历史，指导内容创作策略
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：账号管理和发文历史 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">平台账号</h2>
              <SocialMediaTabs 
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
              />
            </Card>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">发文历史</h2>
              <SocialPostList platform={selectedPlatform} />
            </Card>
          </div>
          
          {/* 右侧：AI对话助手 - 固定位置 */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <SocialMediaAIChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaManagement;
