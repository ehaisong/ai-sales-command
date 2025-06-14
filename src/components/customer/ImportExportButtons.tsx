import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Upload, FileSpreadsheet, FileText } from 'lucide-react';
import ImportFileDialog from "./ImportFileDialog";

const ImportExportButtons: React.FC = () => {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importType, setImportType] = useState<"csv" | "excel">("csv");

  const handleImportClick = (type: "csv" | "excel") => {
    setImportType(type);
    setImportDialogOpen(true);
  };

  const handleExport = (type: string) => {
    console.log(`导出为 ${type} 文件`);
    // 实际实现中这里会处理文件导出逻辑
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            导入
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleImportClick('csv')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            导入 CSV 文件
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleImportClick('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            导入 Excel 文件
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 导入弹窗 */}
      <ImportFileDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        importType={importType}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleExport('csv')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            导出为 CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            导出为 Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('pdf')}>
            <FileText className="h-4 w-4 mr-2" />
            导出为 PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ImportExportButtons;
