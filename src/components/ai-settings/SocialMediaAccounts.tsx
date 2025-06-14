
import React from "react";
import SocialMediaAccountCard from "@/components/ui/SocialMediaAccountCard";

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
    </div>
  );
};

export default SocialMediaAccounts;
