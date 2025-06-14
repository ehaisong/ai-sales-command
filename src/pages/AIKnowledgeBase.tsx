
import React, { useState } from "react";
import DataSourceCards from "@/components/ai-knowledge/DataSourceCards";
import KnowledgeList from "@/components/ai-knowledge/KnowledgeList";
import TagCloud from "@/components/ai-knowledge/TagCloud";
import AIChat from "@/components/ai-knowledge/AIChat";
import KnowledgeDetailDialog from "@/components/ai-knowledge/KnowledgeDetailDialog";
import FileUploadDialog from "@/components/ai-knowledge/FileUploadDialog";
import SourceConfigDialog from "@/components/ai-knowledge/SourceConfigDialog";

const AIKnowledgeBase = () => {
  // This state will be replaced by real data fetching in future
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-4 gap-4">
      {/* Left - Knowledge Management */}
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        {/* Data Sources */}
        <DataSourceCards
          onUploadFile={() => setShowFileUpload(true)}
          onConfig={() => setShowConfig(true)}
        />

        {/* Tag Cloud */}
        <TagCloud />

        {/* Knowledge List */}
        <KnowledgeList
          onSelectItem={(item) => {
            setSelectedKnowledge(item);
            setShowDetail(true);
          }}
        />
      </div>

      {/* Right - AI Chat */}
      <div className="w-full md:w-1/4 flex flex-col">
        <AIChat onAddEntry={() => {}} />
      </div>

      {/* Dialogs */}
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
