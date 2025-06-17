
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Trash, FileText, Globe, Newspaper, Eye, Edit, MoreHorizontal, Calendar, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTagStyle } from "@/config/tagConfig";

const sourceConfig = {
  news: {
    icon: Newspaper,
    label: "新闻",
    color: "bg-green-100 text-green-700",
    badgeClassName: "border-green-700 text-green-700",
    bgColor: "bg-green-50",
  },
  website: {
    icon: Globe,
    label: "官网",
    color: "bg-blue-100 text-blue-700",
    badgeClassName: "border-blue-700 text-blue-700",
    bgColor: "bg-blue-50",
  },
  file: {
    icon: FileText,
    label: "文件",
    color: "bg-purple-100 text-purple-700",
    badgeClassName: "border-purple-700 text-purple-700",
    bgColor: "bg-purple-50",
  },
};

type SortField = 'title' | 'updatedAt' | 'viewCount' | 'confidence';
type SortDirection = 'asc' | 'desc';

type Props = {
  data: any[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  onItemClick: (item: any) => void;
};

const KnowledgeTable = ({ data, selectedItems, onSelectItem, onSelectAll, onItemClick }: Props) => {
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'updatedAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const allSelected = data.length > 0 && selectedItems.length === data.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < data.length;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 text-monday-blue border-gray-300 rounded focus:ring-monday-blue"
              />
            </TableHead>
            <TableHead className="w-12">类型</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('title')}
                className="h-auto p-0 font-medium text-left justify-start"
              >
                标题
                {getSortIcon('title')}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">标签</TableHead>
            <TableHead className="w-32">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('updatedAt')}
                className="h-auto p-0 font-medium text-left justify-start"
              >
                更新时间
                {getSortIcon('updatedAt')}
              </Button>
            </TableHead>
            <TableHead className="w-24 hidden sm:table-cell">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('viewCount')}
                className="h-auto p-0 font-medium text-left justify-start"
              >
                查看次数
                {getSortIcon('viewCount')}
              </Button>
            </TableHead>
            <TableHead className="w-24 hidden sm:table-cell">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('confidence')}
                className="h-auto p-0 font-medium text-left justify-start"
              >
                置信度
                {getSortIcon('confidence')}
              </Button>
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => {
            const sourceInfo = sourceConfig[item.source as keyof typeof sourceConfig];
            const IconComponent = sourceInfo.icon;
            
            return (
              <TableRow
                key={item.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedItems.includes(item.id) ? 'bg-monday-blue/5' : ''
                }`}
                onClick={() => onItemClick(item)}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectItem(item.id);
                    }}
                    className="w-4 h-4 text-monday-blue border-gray-300 rounded focus:ring-monday-blue"
                  />
                </TableCell>
                <TableCell>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sourceInfo.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 line-clamp-2 leading-tight">
                      {item.title}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                    <Badge variant="outline" className={`text-xs ${sourceInfo.badgeClassName}`}>
                      #{sourceInfo.label}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag: string) => {
                      const { color } = getTagStyle(tag);
                      return (
                        <Badge key={tag} variant="secondary" className={`text-xs ${color}`}>
                          {tag}
                        </Badge>
                      );
                    })}
                    {item.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {item.updatedAt}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-3 h-3" />
                    {item.viewCount}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className={`text-sm font-medium ${
                    item.confidence >= 90 ? 'text-green-600' : 
                    item.confidence >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.confidence}%
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        编辑内容
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="w-4 h-4 mr-2" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default KnowledgeTable;
