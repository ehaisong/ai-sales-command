
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Plus, X } from "lucide-react";
import { SEOKeyword } from "@/types/seo";

const mockKeywords: SEOKeyword[] = [
  {
    id: "1",
    keyword: "外贸服装批发",
    searchVolume: 12000,
    competition: "medium",
    difficulty: 65,
    currentRank: 15,
    targetRank: 3,
    relatedKeywords: ["服装批发", "外贸服装", "批发市场"],
    createdAt: "2025-06-15"
  },
  {
    id: "2",
    keyword: "跨境电商平台",
    searchVolume: 8500,
    competition: "high",
    difficulty: 78,
    currentRank: 25,
    targetRank: 5,
    relatedKeywords: ["跨境电商", "电商平台", "海外销售"],
    createdAt: "2025-06-15"
  },
  {
    id: "3",
    keyword: "国际贸易代理",
    searchVolume: 5200,
    competition: "low",
    difficulty: 42,
    currentRank: 8,
    targetRank: 1,
    relatedKeywords: ["贸易代理", "进出口代理", "外贸代理"],
    createdAt: "2025-06-15"
  },
  {
    id: "4",
    keyword: "服装出口",
    searchVolume: 3200,
    competition: "medium",
    difficulty: 55,
    currentRank: 12,
    targetRank: 5,
    relatedKeywords: ["服装出口", "纺织品出口"],
    createdAt: "2025-06-15"
  },
  {
    id: "5",
    keyword: "批发市场",
    searchVolume: 6800,
    competition: "low",
    difficulty: 38,
    currentRank: 6,
    targetRank: 2,
    relatedKeywords: ["批发市场", "商品批发"],
    createdAt: "2025-06-15"
  }
];

const KeywordAnalysisCard = () => {
  const [keywords, setKeywords] = useState<SEOKeyword[]>(mockKeywords);
  const [newKeyword, setNewKeyword] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const handleDeleteKeyword = (keywordId: string) => {
    setKeywords(prev => prev.filter(keyword => keyword.id !== keywordId));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      const newKeywordObj: SEOKeyword = {
        id: Date.now().toString(),
        keyword: newKeyword.trim(),
        searchVolume: 0,
        competition: "medium",
        difficulty: 50,
        targetRank: 1,
        relatedKeywords: [],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setKeywords(prev => [...prev, newKeywordObj]);
      setNewKeyword("");
      setShowAddInput(false);
    }
  };

  const getKeywordSize = (searchVolume: number) => {
    if (searchVolume >= 10000) return "text-lg px-4 py-2";
    if (searchVolume >= 5000) return "text-base px-3 py-2";
    return "text-sm px-3 py-1";
  };

  const getKeywordColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            关键词
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setShowAddInput(true)}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            添加关键词
          </Button>
        </div>
        
        {showAddInput && (
          <div className="flex items-center gap-2 mt-3">
            <Input
              placeholder="输入新关键词..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleAddKeyword}>
              确认
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAddInput(false);
                setNewKeyword("");
              }}
            >
              取消
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword) => (
            <Badge
              key={keyword.id}
              className={`relative group cursor-pointer transition-all duration-200 ${getKeywordSize(keyword.searchVolume)} ${getKeywordColor(keyword.competition)}`}
            >
              <span className="mr-2">{keyword.keyword}</span>
              <button
                onClick={() => handleDeleteKeyword(keyword.id)}
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500 hover:text-white rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        {keywords.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>暂无关键词，点击上方按钮添加关键词</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>共 {keywords.length} 个关键词</span>
            <span>关键词大小表示搜索量高低，颜色表示竞争程度</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysisCard;
