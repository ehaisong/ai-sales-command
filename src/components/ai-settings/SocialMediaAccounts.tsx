import React, { useState } from "react";
import SocialMediaAccountCard from "@/components/ui/SocialMediaAccountCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import BindAccountDialog from "./BindAccountDialog";

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
    logo: "meta",
    desc: "绑定Meta(Facebook)账号，与客户互动",
  },
  {
    name: "X",
    key: "twitter",
    logo: "x",
    desc: "绑定X(Twitter)账号，实时发布动态",
  },
  {
    name: "Instagram",
    key: "instagram",
    logo: "instagram",
    desc: "绑定Instagram账号，提升品牌形象",
  },
] as const;

type PlatformType = (typeof platforms)[number];

type PlatformLogoType = "linkedin" | "instagram" | "x" | "meta";

const SocialMediaAccounts: React.FC = () => {
  // 模拟绑定状态。实际应从后端获取并传递
  const [bindStatus, setBindStatus] = useState<Record<PlatformType["key"], boolean>>({
    linkedin: false,
    meta: false,
    twitter: false,
    instagram: false,
  });

  // 控制弹窗状态
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<PlatformType | null>(null);

  const handleAddPlatform = () => {
    toast({ description: "敬请期待更多平台的支持！" });
  };

  // 绑定按钮点击
  const handleBindClick = (platform: PlatformType) => {
    setCurrentPlatform(platform);
    setDialogOpen(true);
  };

  // 保存账号信息（这里只弹toast/模拟绑定，实际逻辑需要接入后端）
  const handleDialogSave = (platform: PlatformType, account: string) => {
    setBindStatus((prev) => ({ ...prev, [platform.key]: true }));
    setDialogOpen(false);
    toast({ title: `已绑定${platform.name}`, description: `账号：${account}` });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {platforms.map((p) => (
          <SocialMediaAccountCard
            key={p.key}
            name={p.name}
            logo={p.logo as PlatformLogoType}
            desc={p.desc}
            isBound={bindStatus[p.key]}
            onBind={() => handleBindClick(p)}
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
      <BindAccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        platform={currentPlatform}
        onSave={handleDialogSave}
      />
    </>
  );
};

export default SocialMediaAccounts;
