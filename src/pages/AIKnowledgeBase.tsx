
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Trash2 } from "lucide-react";
import DataSourceCards from "@/components/ai-knowledge/DataSourceCards";
import KnowledgeList from "@/components/ai-knowledge/KnowledgeList";
import AIChat from "@/components/ai-knowledge/AIChat";
import KnowledgeDetailDialog from "@/components/ai-knowledge/KnowledgeDetailDialog";
import FileUploadDialog from "@/components/ai-knowledge/FileUploadDialog";
import SourceConfigDialog from "@/components/ai-knowledge/SourceConfigDialog";

const AIKnowledgeBase = () => {
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* 页面标题和描述 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">我的品牌</h1>
          <p className="text-gray-600">
            管理公司与产品相关知识，通过AI分析提取产品标签，为精准营销提供支持
          </p>
        </div>

        {/* 双栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧主要内容区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 顶部工具栏 */}
            <Card className="p-4">
              <div className="flex gap-2 justify-end">
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
            </Card>

            {/* 数据源管理卡片 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">数据源管理</h2>
              <DataSourceCards
                onUploadFile={() => setShowFileUpload(true)}
                onConfig={() => setShowConfig(true)}
              />
            </div>

            {/* 知识库内容列表 */}
            <div>
              <KnowledgeList
                searchQuery=""
                onSelectItem={(item) => {
                  setSelectedKnowledge(item);
                  setShowDetail(true);
                }}
              />
            </div>
          </div>

          {/* 右侧AI聊天助手 */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm border h-[calc(100vh-8rem)]">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    AI业务员助手
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">智能分析与知识管理</p>
                </div>
                <div className="h-[calc(100%-4rem)]">
                  <AIChat onAddEntry={() => {
                    console.log("添加知识库条目");
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 弹窗组件 */}
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
