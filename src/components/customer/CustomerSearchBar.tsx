
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CustomerSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomerSearchBar: React.FC<CustomerSearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="搜索客户姓名或公司..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-64"
      />
    </div>
  );
};

export default CustomerSearchBar;
