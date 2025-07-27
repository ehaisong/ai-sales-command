import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DataSourceCards from "@/components/ai-knowledge/DataSourceCards";
import KnowledgeList from "@/components/ai-knowledge/KnowledgeList";
import AIChat from "@/components/ai-knowledge/AIChat";
import KnowledgeDetailDialog from "@/components/ai-knowledge/KnowledgeDetailDialog";
import FileUploadDialog from "@/components/ai-knowledge/FileUploadDialog";
import SourceConfigDialog from "@/components/ai-knowledge/SourceConfigDialog";

const AIKnowledgeBase = () => {
  const navigate = useNavigate();
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="page-container">
      <div className="max-w-full mx-auto">
        {/* Page Header */}
        <div className="page-header">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="page-title">AI知识库</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/brand/profile')}
              className="flex items-center gap-2 monday-button"
            >
              <Edit className="w-4 h-4" />
              编辑品牌
            </Button>
          </div>
          <p className="page-subtitle">
            管理公司与产品相关知识，通过AI分析提取产品标签，为精准营销提供支持
          </p>
        </div>

        {/* 双栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧主要内容区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 数据源管理卡片 */}
            <div>
              <DataSourceCards onUploadFile={() => setShowFileUpload(true)} onConfig={() => setShowConfig(true)} />
            </div>

            {/* 知识库内容列表 */}
            <div>
              <KnowledgeList searchQuery="" onSelectItem={item => {
              setSelectedKnowledge(item);
              setShowDetail(true);
            }} />
            </div>
          </div>

          {/* 右侧AI聊天助手 */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="monday-card-medium">
                <div className="p-4 border-b border-border">
                  <h3 className="card-title flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    AI助手
                  </h3>
                  <p className="card-subtitle">智能分析与知识管理</p>
                </div>
                <AIChat onAddEntry={() => {
                  console.log("添加知识库条目");
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 弹窗组件 */}
      <KnowledgeDetailDialog open={showDetail} knowledge={selectedKnowledge} onClose={() => setShowDetail(false)} />
      <FileUploadDialog open={showFileUpload} onClose={() => setShowFileUpload(false)} />
      <SourceConfigDialog open={showConfig} onClose={() => setShowConfig(false)} />
    </div>
  );
};

export default AIKnowledgeBase;
