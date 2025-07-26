
import React from "react";
import { Card } from "@/components/ui/card";
import PersonaSettings from "@/components/ai-settings/PersonaSettings";
import SocialMediaAccounts from "@/components/ai-settings/SocialMediaAccounts";
import PhotoLibrary from "@/components/ai-settings/PhotoLibrary";

const AISettings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI助手设置</h1>
          <p className="text-gray-600">
            打造专属数字形象，绑定社交媒体账号，开启AI助手社交智能。
          </p>
        </div>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">数字形象</h2>
          <PersonaSettings />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">社交媒体账号绑定</h2>
          <SocialMediaAccounts />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">照片库</h2>
          <PhotoLibrary />
        </Card>
      </div>
    </div>
  );
};

export default AISettings;
