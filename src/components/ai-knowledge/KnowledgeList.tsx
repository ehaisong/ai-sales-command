
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash, FileText, Globe, Newspaper } from "lucide-react";

// Mock data
const mockKnowledge = [
  {
    id: 1,
    title: "公司年度新品发布会圆满成功",
    summary: "本次发布会展示了多款创新产品，吸引众多行业目光...",
    source: "news",
    tags: ["新品", "发布会", "创新"],
    updatedAt: "2024-06-01",
  },
  {
    id: 2,
    title: "网站About页面内容",
    summary: "公司成立于2012年，专注于智能家居领域......",
    source: "website",
    tags: ["公司介绍", "历史"],
    updatedAt: "2024-05-30",
  },
  {
    id: 3,
    title: "上传文档：产品说明书",
    summary: "这是A100型产品的最新使用说明书，包括技术参数......",
    source: "file",
    tags: ["A100", "说明书"],
    updatedAt: "2024-05-20",
  },
];

const sourceMap: Record<string, { icon: React.ReactNode; label: string }> = {
  news: { icon: <Newspaper className="w-4 h-4 mr-1" />, label: "新闻" },
  website: { icon: <Globe className="w-4 h-4 mr-1" />, label: "官网" },
  file: { icon: <FileText className="w-4 h-4 mr-1" />, label: "文件" },
};

type Props = {
  onSelectItem: (item: any) => void;
};

const KnowledgeList = ({ onSelectItem }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">知识库内容</div>
        <Button size="sm" variant="outline">
          批量删除
        </Button>
      </div>
      <div className="space-y-2">
        {mockKnowledge.map((item) => (
          <Card
            className="flex items-center px-3 py-2 gap-2 hover:bg-accent/40 cursor-pointer"
            key={item.id}
            onClick={() => onSelectItem(item)}
          >
            <div className="flex items-center">
              {sourceMap[item.source]?.icon}
              <span className="text-xs text-muted-foreground">
                {sourceMap[item.source]?.label}
              </span>
            </div>
            <div className="flex-1 ml-4">
              <div className="font-semibold">{item.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">
                {item.summary}
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end ml-4">
              <div className="text-xs text-gray-400">{item.updatedAt}</div>
              <Button
                size="icon"
                variant="ghost"
                className="mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: handle delete
                }}
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeList;
