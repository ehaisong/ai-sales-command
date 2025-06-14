
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Hash, Filter, Plus } from "lucide-react";

// 模拟标签数据
const tags = [
  { name: "智能家居", count: 15, trend: "up" },
  { name: "AI技术", count: 12, trend: "up" },
  { name: "新品发布", count: 8, trend: "up" },
  { name: "A100", count: 6, trend: "stable" },
  { name: "智能音箱", count: 9, trend: "up" },
  { name: "公司介绍", count: 5, trend: "stable" },
  { name: "B200", count: 4, trend: "up" },
  { name: "智能门锁", count: 7, trend: "stable" },
  { name: "产品说明", count: 3, trend: "down" },
  { name: "发展历程", count: 2, trend: "stable" },
  { name: "企业文化", count: 3, trend: "stable" },
  { name: "技术规格", count: 4, trend: "up" },
];

const TagCloud = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const handleTagClick = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const displayTags = showAll ? tags : tags.slice(0, 8);
  const hiddenCount = tags.length - 8;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      default:
        return null;
    }
  };

  const getTagSize = (count: number) => {
    if (count >= 10) return "text-lg px-4 py-2";
    if (count >= 6) return "text-base px-3 py-2";
    return "text-sm px-3 py-1";
  };

  const getTagColor = (count: number, isSelected: boolean) => {
    if (isSelected) return "bg-primary text-primary-foreground";
    if (count >= 10) return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    if (count >= 6) return "bg-green-100 text-green-800 hover:bg-green-200";
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">产品标签云</h2>
          <Badge variant="secondary" className="text-xs">
            {tags.length} 个标签
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {selectedTags.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedTags([])}
            >
              <Filter className="w-4 h-4 mr-1" />
              清除筛选 ({selectedTags.length})
            </Button>
          )}
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            添加标签
          </Button>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="mb-4 p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">当前筛选标签:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        {displayTags.map((tag) => {
          const isSelected = selectedTags.includes(tag.name);
          return (
            <Badge
              key={tag.name}
              className={`cursor-pointer transition-all duration-200 ${getTagSize(tag.count)} ${getTagColor(tag.count, isSelected)}`}
              onClick={() => handleTagClick(tag.name)}
            >
              <div className="flex items-center gap-1">
                <span>{tag.name}</span>
                <span className="text-xs opacity-75">({tag.count})</span>
                {getTrendIcon(tag.trend)}
              </div>
            </Badge>
          );
        })}
      </div>

      {!showAll && hiddenCount > 0 && (
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(true)}
            className="text-primary hover:text-primary/80"
          >
            显示更多标签 (+{hiddenCount})
          </Button>
        </div>
      )}

      {showAll && (
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(false)}
            className="text-primary hover:text-primary/80"
          >
            收起标签
          </Button>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>标签越大表示使用频率越高</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span>上升趋势</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
              <span>下降趋势</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TagCloud;
