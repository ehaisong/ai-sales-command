
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  Plus, 
  Archive, 
  Trash2, 
  Star, 
  Tag,
  RefreshCw,
  SortAsc,
  Calendar,
  Download,
  Upload
} from 'lucide-react';
import { EmailFilter } from '@/types/email';

interface EmailToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: EmailFilter;
  onFiltersChange: (filters: EmailFilter) => void;
  selectedCount: number;
  onBulkAction: (action: string) => void;
  onRefresh: () => void;
  onCompose: () => void;
}

const EmailToolbar: React.FC<EmailToolbarProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  selectedCount,
  onBulkAction,
  onRefresh,
  onCompose
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* Top Row - Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button onClick={onCompose} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            写邮件
          </Button>
          
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>

          {selectedCount > 0 && (
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l">
              <Badge variant="secondary">
                已选择 {selectedCount} 封邮件
              </Badge>
              
              <Button variant="outline" size="sm" onClick={() => onBulkAction('archive')}>
                <Archive className="h-4 w-4 mr-1" />
                归档
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onBulkAction('star')}>
                <Star className="h-4 w-4 mr-1" />
                标星
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onBulkAction('delete')}>
                <Trash2 className="h-4 w-4 mr-1" />
                删除
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            导入
          </Button>
        </div>
      </div>

      {/* Bottom Row - Search and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索发件人、主题或内容..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select
          value={filters.category}
          onValueChange={(value: any) => onFiltersChange({ ...filters, category: value })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="manual">人工发送</SelectItem>
            <SelectItem value="ai">AI发送</SelectItem>
            <SelectItem value="template">模板邮件</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select
          value={filters.priority || 'all'}
          onValueChange={(value: any) => onFiltersChange({ 
            ...filters, 
            priority: value === 'all' ? undefined : value 
          })}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="优先级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="high">高</SelectItem>
            <SelectItem value="medium">中</SelectItem>
            <SelectItem value="low">低</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value: any) => onFiltersChange({ 
            ...filters, 
            status: value === 'all' ? undefined : value 
          })}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="draft">草稿</SelectItem>
            <SelectItem value="sent">已发送</SelectItem>
            <SelectItem value="delivered">已送达</SelectItem>
            <SelectItem value="opened">已查看</SelectItem>
            <SelectItem value="replied">已回复</SelectItem>
            <SelectItem value="bounced">失败</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              更多筛选
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              按日期筛选
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="h-4 w-4 mr-2" />
              按标签筛选
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={filters.isRead === false}>
              仅显示未读
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={filters.isRead === true}>
              仅显示已读
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              排序
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>按时间（最新）</DropdownMenuItem>
            <DropdownMenuItem>按时间（最旧）</DropdownMenuItem>
            <DropdownMenuItem>按发件人</DropdownMenuItem>
            <DropdownMenuItem>按主题</DropdownMenuItem>
            <DropdownMenuItem>按优先级</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EmailToolbar;
