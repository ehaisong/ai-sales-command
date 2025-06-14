
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Upload, FileSpreadsheet, FileText } from 'lucide-react';

const ImportExportButtons: React.FC = () => {
  const handleImport = (type: string) => {
    console.log(`导入 ${type} 文件`);
    // 实际实现中这里会处理文件导入逻辑
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
          <DropdownMenuItem onClick={() => handleImport('csv')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            导入 CSV 文件
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleImport('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            导入 Excel 文件
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
