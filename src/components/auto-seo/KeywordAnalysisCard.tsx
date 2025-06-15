
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Target, Plus } from "lucide-react";
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
    createdAt: "2024-01-15"
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
    createdAt: "2024-01-15"
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
    createdAt: "2024-01-15"
  }
];

const KeywordAnalysisCard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600';
    if (difficulty < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          关键词分析
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索或添加关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockKeywords.map((keyword) => (
            <div key={keyword.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{keyword.keyword}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      搜索量: {keyword.searchVolume.toLocaleString()}
                    </span>
                    <span>当前排名: #{keyword.currentRank}</span>
                    <span>目标排名: #{keyword.targetRank}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getCompetitionColor(keyword.competition)}>
                    {keyword.competition === 'low' ? '低竞争' : 
                     keyword.competition === 'medium' ? '中竞争' : '高竞争'}
                  </Badge>
                  <span className={`text-sm font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                    难度: {keyword.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {keyword.relatedKeywords.map((related, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {related}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysisCard;
