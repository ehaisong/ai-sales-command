
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Download, Upload } from 'lucide-react';
import CustomerFilters from './CustomerFilters';
import { CustomerFilters as FilterType } from '@/types/customer';

interface CustomerToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

const CustomerToolbar: React.FC<CustomerToolbarProps> = ({
  searchValue,
  onSearchChange,
  filters,
  onFiltersChange,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索客户..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-80 border-gray-300"
          />
        </div>
        <CustomerFilters 
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          导入
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          导出
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          新增客户
        </Button>
      </div>
    </div>
  );
};

export default CustomerToolbar;
