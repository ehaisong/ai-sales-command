
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LandingPageCard from "./LandingPageCard";
import { Globe } from "lucide-react";
import { LandingPage } from "@/types/seo";

const mockLandingPages: LandingPage[] = [
  {
    id: "1",
    title: "外贸服装批发 - 专业一站式服务",
    url: "https://example.com/clothing-wholesale",
    previewImage: "/placeholder.svg",
    targetKeywords: ["外贸服装批发", "服装批发", "外贸服装"],
    seoScore: 85,
    rankings: {
      google: 12,
      baidu: 8,
      bing: 15
    },
    analytics: {
      dailyViews: 245,
      weeklyViews: 1680,
      monthlyViews: 7320,
      bounceRate: 32,
      avgSessionTime: 180
    },
    status: "published",
    loadSpeed: 1200,
    mobileOptimized: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "跨境电商平台解决方案",
    url: "https://example.com/ecommerce-platform",
    previewImage: "/placeholder.svg",
    targetKeywords: ["跨境电商平台", "跨境电商", "电商平台"],
    seoScore: 92,
    rankings: {
      google: 6,
      baidu: 12,
      bing: 9
    },
    analytics: {
      dailyViews: 380,
      weeklyViews: 2660,
      monthlyViews: 11400,
      bounceRate: 28,
      avgSessionTime: 220
    },
    status: "published",
    loadSpeed: 980,
    mobileOptimized: true,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-14"
  },
  {
    id: "3",
    title: "国际贸易代理服务",
    url: "https://example.com/trade-agency",
    previewImage: "/placeholder.svg",
    targetKeywords: ["国际贸易代理", "贸易代理", "外贸代理"],
    seoScore: 78,
    rankings: {
      google: 8,
      baidu: 5,
      bing: 11
    },
    analytics: {
      dailyViews: 156,
      weeklyViews: 1092,
      monthlyViews: 4680,
      bounceRate: 35,
      avgSessionTime: 165
    },
    status: "optimizing",
    loadSpeed: 1450,
    mobileOptimized: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-15"
  }
];

const LandingPageGrid = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          着陆页管理
        </CardTitle>
        <p className="text-sm text-gray-600">
          AI自动生成并优化的着陆页，实时监控排名和流量表现
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockLandingPages.map((page) => (
            <LandingPageCard key={page.id} page={page} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPageGrid;
