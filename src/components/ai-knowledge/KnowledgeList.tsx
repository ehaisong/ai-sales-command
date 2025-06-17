
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import KnowledgeTable from "./KnowledgeTable";
import KnowledgeCardView from "./KnowledgeCardView";
import KnowledgeToolbar from "./KnowledgeToolbar";

// 模拟数据
const mockKnowledge = [
  {
    id: 1,
    title: "公司年度新品发布会圆满成功 - AI智能家居系列产品正式发布",
    summary: "本次发布会展示了包括智能音箱、智能门锁、智能照明系统在内的多款创新产品，吸引了众多行业专家和媒体的关注，预计将在智能家居市场掀起新的浪潮...",
    source: "news",
    tags: ["新品发布", "智能家居", "AI技术", "创新"],
    updatedAt: "2024-06-01",
    viewCount: 156,
    confidence: 92,
  },
  {
    id: 2,
    title: "关于我们 - 公司发展历程与企业文化",
    summary: "我们公司成立于2012年，专注于智能家居领域的技术研发与产品创新。经过十多年的发展，已成为行业领先的智能家居解决方案提供商，服务全球超过100万家庭...",
    source: "website",
    tags: ["公司介绍", "发展历程", "企业文化", "智能家居"],
    updatedAt: "2024-05-30",
    viewCount: 89,
    confidence: 88,
  },
  {
    id: 3,
    title: "A100智能音箱产品说明书及技术规格",
    summary: "A100智能音箱是我们最新推出的旗舰产品，搭载先进的语音识别技术和AI助手功能。支持多种音乐平台，具备智能家居控制中心功能，是现代家庭的理想选择...",
    source: "file",
    tags: ["A100", "智能音箱", "产品说明", "技术规格"],
    updatedAt: "2024-05-20",
    viewCount: 234,
    confidence: 95,
  },
  {
    id: 4,
    title: "智能门锁B200系列安装与使用指南",
    summary: "B200系列智能门锁采用指纹识别、密码输入、刷卡开锁等多种开锁方式，支持远程监控和临时密码功能。本指南详细介绍了产品的安装步骤和使用方法...",
    source: "file",
    tags: ["B200", "智能门锁", "安装指南", "多重认证"],
    updatedAt: "2024-05-18",
    viewCount: 178,
    confidence: 91,
  },
];

type Props = {
  searchQuery: string;
  onSelectItem: (item: any) => void;
};

const KnowledgeList = ({ searchQuery, onSelectItem }: Props) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // 根据标签页和搜索词过滤数据
  const filteredKnowledge = useMemo(() => {
    let filtered = mockKnowledge;

    // 根据标签页过滤
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.source === activeTab);
    }

    // 根据搜索词过滤
    const query = localSearchQuery || searchQuery;
    if (query) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    return filtered;
  }, [activeTab, localSearchQuery, searchQuery]);

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredKnowledge.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    console.log("删除选中项:", selectedItems);
    setSelectedItems([]);
  };

  // 获取各类型的数量
  const getTabCounts = () => {
    const counts = {
      all: mockKnowledge.length,
      news: mockKnowledge.filter(item => item.source === 'news').length,
      website: mockKnowledge.filter(item => item.source === 'website').length,
      file: mockKnowledge.filter(item => item.source === 'file').length,
    };
    return counts;
  };

  const tabCounts = getTabCounts();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">知识库内容</h2>
          <p className="text-sm text-gray-500 mt-1">
            智能管理您的品牌知识资产
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all" className="flex items-center gap-2">
            全部
            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {tabCounts.all}
            </span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            新闻资讯
            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {tabCounts.news}
            </span>
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center gap-2">
            官网内容
            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {tabCounts.website}
            </span>
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            文档文件
            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {tabCounts.file}
            </span>
          </TabsTrigger>
        </TabsList>

        <KnowledgeToolbar
          searchQuery={localSearchQuery}
          onSearchChange={setLocalSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedCount={selectedItems.length}
          totalCount={filteredKnowledge.length}
          activeTab={activeTab}
          onDeleteSelected={selectedItems.length > 0 ? handleDeleteSelected : undefined}
        />

        <TabsContent value="all" className="space-y-4">
          {viewMode === 'table' ? (
            <KnowledgeTable
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onItemClick={onSelectItem}
            />
          ) : (
            <KnowledgeCardView
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onItemClick={onSelectItem}
            />
          )}
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          {viewMode === 'table' ? (
            <KnowledgeTable
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onItemClick={onSelectItem}
            />
          ) : (
            <KnowledgeCardView
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onItemClick={onSelectItem}
            />
          )}
        </TabsContent>

        <TabsContent value="website" className="space-y-4">
          {viewMode === 'table' ? (
            <KnowledgeTable
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onItemClick={onSelectItem}
            />
          ) : (
            <KnowledgeCardView
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onItemClick={onSelectItem}
            />
          )}
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          {viewMode === 'table' ? (
            <KnowledgeTable
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onItemClick={onSelectItem}
            />
          ) : (
            <KnowledgeCardView
              data={filteredKnowledge}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onItemClick={onSelectItem}
            />
          )}
        </TabsContent>

        {filteredKnowledge.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FileText className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关内容</h3>
              <p className="text-gray-500">
                {localSearchQuery || searchQuery ? `没有找到包含 "${localSearchQuery || searchQuery}" 的内容` : '知识库为空，请先添加内容'}
              </p>
            </div>
          </Card>
        )}
      </Tabs>
    </div>
  );
};

export default KnowledgeList;
