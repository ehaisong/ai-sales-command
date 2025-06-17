import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Grid, List, Trash, RefreshCw, Download, Upload } from "lucide-react";
type ViewMode = 'table' | 'card';
type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedCount: number;
  totalCount: number;
  activeTab: string;
  onRefresh?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onDeleteSelected?: () => void;
};
const KnowledgeToolbar = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  selectedCount,
  totalCount,
  activeTab,
  onRefresh,
  onExport,
  onImport,
  onDeleteSelected
}: Props) => {
  return <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* 左侧搜索和统计 */}
        <div className="flex-1 space-y-3 sm:space-y-0 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="搜索知识库内容..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="pl-10" />
          </div>
          
        </div>

        {/* 右侧操作按钮 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* 视图切换 */}
          <div className="flex items-center border rounded-lg">
            <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm" onClick={() => onViewModeChange('table')} className="rounded-r-none border-r">
              <List className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'card' ? 'default' : 'ghost'} size="sm" onClick={() => onViewModeChange('card')} className="rounded-l-none">
              <Grid className="w-4 h-4" />
            </Button>
          </div>

          {/* 批量操作 */}
          {selectedCount > 0 && <Button size="sm" variant="destructive" onClick={onDeleteSelected}>
              <Trash className="w-4 h-4 mr-2" />
              删除 ({selectedCount})
            </Button>}

          {/* 工具按钮 */}
          <div className="flex items-center gap-1">
            {onRefresh && <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>}
            {onExport && <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="w-4 h-4" />
              </Button>}
            {onImport && <Button variant="outline" size="sm" onClick={onImport}>
                <Upload className="w-4 h-4" />
              </Button>}
          </div>
        </div>
      </div>
    </div>;
};
export default KnowledgeToolbar;