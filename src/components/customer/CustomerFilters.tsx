
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { CustomerFilters as FilterType } from '@/types/customer';

interface CustomerFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({ filters, onFiltersChange }) => {
  const dataSources = ['LinkedIn', 'Google', 'Meta', 'Manual', 'Import'];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          筛选
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <Label htmlFor="dataSource">数据来源</Label>
            <Select
              value={filters.dataSource[0] || ''}
              onValueChange={(value) => 
                onFiltersChange({ 
                  ...filters, 
                  dataSource: value ? [value] : [] 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="选择数据来源" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">全部</SelectItem>
                {dataSources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>客户评分范围</Label>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.scoreRange[0]}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    scoreRange: [parseInt(e.target.value), filters.scoreRange[1]]
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">
                {filters.scoreRange[0]} - {filters.scoreRange[1]}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onFiltersChange({
                search: '',
                type: 'all',
                dataSource: [],
                scoreRange: [0, 100],
                tags: [],
                status: []
              })
            }
            className="w-full"
          >
            重置筛选
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerFilters;
