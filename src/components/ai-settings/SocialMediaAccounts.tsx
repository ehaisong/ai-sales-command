
import React from "react";
import SocialMediaAccountCard from "@/components/ui/SocialMediaAccountCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const platforms = [
  {
    name: "LinkedIn",
    key: "linkedin",
    logo: "linkedin",
    desc: "绑定LinkedIn账号，智能发布行业动态",
  },
  {
    name: "Meta",
    key: "meta",
    logo: "settings", // Use "settings" as placeholder for Meta (Facebook)
    desc: "绑定Meta(Facebook)账号，与客户互动",
  },
  {
    name: "X",
    key: "twitter",
    logo: "twitter",
    desc: "绑定X(Twitter)账号，实时发布动态",
  },
  {
    name: "Instagram",
    key: "instagram",
    logo: "instagram",
    desc: "绑定Instagram账号，提升品牌形象",
  },
] as const;

type PlatformLogoType = "linkedin" | "instagram" | "twitter" | "settings";

const SocialMediaAccounts: React.FC = () => {
  // 模拟绑定状态。实际应从后端获取并传递
  const bindStatus: Record<(typeof platforms)[number]["key"], boolean> = {
    linkedin: false,
    meta: false,
    twitter: false,
    instagram: false,
  };

  const handleAddPlatform = () => {
    toast({ description: "敬请期待更多平台的支持！" });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {platforms.map((p) => (
        <SocialMediaAccountCard
          key={p.key}
          name={p.name}
          logo={p.logo as PlatformLogoType}
          desc={p.desc}
          isBound={bindStatus[p.key]}
        />
      ))}
      {/* 添加平台按钮卡片 */}
      <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-dashed border-primary/40 justify-center min-h-[88px]">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-primary"
          onClick={handleAddPlatform}
        >
          <Plus className="w-5 h-5" />
          添加平台账号
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaAccounts;
