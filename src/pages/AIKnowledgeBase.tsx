
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, Download, Trash2 } from "lucide-react";
import DataSourceCards from "@/components/ai-knowledge/DataSourceCards";
import KnowledgeList from "@/components/ai-knowledge/KnowledgeList";
import TagCloud from "@/components/ai-knowledge/TagCloud";
import AIChat from "@/components/ai-knowledge/AIChat";
import KnowledgeDetailDialog from "@/components/ai-knowledge/KnowledgeDetailDialog";
import FileUploadDialog from "@/components/ai-knowledge/FileUploadDialog";
import SourceConfigDialog from "@/components/ai-knowledge/SourceConfigDialog";

const AIKnowledgeBase = () => {
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* 页面标题和描述 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">品牌知识库</h1>
              <p className="text-gray-600">
                管理公司与产品相关知识，通过AI分析提取产品标签，为精准营销提供支持
              </p>
            </div>
            <Button 
              onClick={() => setShowAIChat(true)}
              className="bg-primary hover:bg-primary/90"
            >
              打开AI助手
            </Button>
          </div>
        </div>

        {/* 全宽内容区域 */}
        <div className="space-y-6">
          {/* 顶部工具栏 */}
          <Card className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索知识库内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  批量删除
                </Button>
              </div>
            </div>
          </Card>

          {/* 数据源管理卡片 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">数据源管理</h2>
            <DataSourceCards
              onUploadFile={() => setShowFileUpload(true)}
              onConfig={() => setShowConfig(true)}
            />
          </div>

          {/* 产品标签云 */}
          <div>
            <TagCloud />
          </div>

          {/* 知识库内容列表 */}
          <div>
            <KnowledgeList
              searchQuery={searchQuery}
              onSelectItem={(item) => {
                setSelectedKnowledge(item);
                setShowDetail(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* AI聊天助手弹窗 */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI业务员助手</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIChat(false)}
              >
                ✕
              </Button>
            </div>
            <div className="h-[600px]">
              <AIChat onAddEntry={() => {
                console.log("添加知识库条目");
              }} />
            </div>
          </div>
        </div>
      )}

      {/* 其他弹窗组件 */}
      <KnowledgeDetailDialog
        open={showDetail}
        knowledge={selectedKnowledge}
        onClose={() => setShowDetail(false)}
      />
      <FileUploadDialog
        open={showFileUpload}
        onClose={() => setShowFileUpload(false)}
      />
      <SourceConfigDialog
        open={showConfig}
        onClose={() => setShowConfig(false)}
      />
    </div>
  );
};

export default AIKnowledgeBase;
