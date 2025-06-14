
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// 允许的箭头图标
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Eye, Trash2, Building2, User } from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

type SortField =
  | 'name'
  | 'company'
  | 'contactPerson'
  | 'email'
  | 'phone'
  | 'dataSource'
  | 'customerScore'
  | 'updatedDate';

const columns: { key: SortField | null; label: string, sortable?: boolean }[] = [
  { key: 'name', label: '客户', sortable: true },
  { key: null, label: '标签' }, // 不排序
  { key: 'contactPerson', label: '联系人', sortable: true },
  { key: 'email', label: '联系方式', sortable: true },
  { key: 'dataSource', label: '数据来源', sortable: true },
  { key: 'customerScore', label: '评分', sortable: true },
  { key: 'updatedDate', label: '更新日期', sortable: true },
  { key: null, label: '操作' }, // 不排序
];

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onSelectCustomer,
  selectedCustomer,
}) => {
  // 排序字段与顺序
  const [sortField, setSortField] = useState<SortField>('updatedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 排序处理
  const sortedCustomers = useMemo(() => {
    const field = sortField;
    const order = sortOrder;
    const arr = [...customers];
    arr.sort((a, b) => {
      let aValue: any = a[field];
      let bValue: any = b[field];
      // 处理undefined
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';
      // 字段特殊处理
      if (field === 'customerScore') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (field === 'updatedDate') {
        // 日期降序
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        // 统一文本比较（忽略大小写）
        aValue = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
        bValue = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
      }
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [customers, sortField, sortOrder]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      client: 'default',
      prospect: 'secondary',
      active: 'outline',
      inactive: 'destructive'
    };
    return variants[status] || 'outline';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      client: '签约客户',
      prospect: '潜在客户',
      active: '活跃',
      inactive: '不活跃'
    };
    return texts[status] || status;
  };

  // 点击表头排序
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // 判断当前排序方向
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ArrowUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) =>
              col.sortable ? (
                <TableHead
                  key={col.label}
                  className="cursor-pointer select-none underline decoration-primary/60 underline-offset-4"
                  onClick={() => handleSort(col.key as SortField)}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {renderSortIcon(col.key as SortField)}
                  </span>
                </TableHead>
              ) : (
                <TableHead key={col.label}>{col.label}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              className={`cursor-pointer hover:bg-muted/50 ${selectedCustomer?.id === customer.id ? 'bg-muted' : ''}`}
              onClick={() => onSelectCustomer(customer)}
            >
              {/* 客户 */}
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {customer.type === 'company' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    {customer.company && <div className="text-sm text-muted-foreground">{customer.company}</div>}
                    <Badge variant={getStatusBadge(customer.status)} className="text-xs mt-1">
                      {getStatusText(customer.status)}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              {/* 标签 */}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {customer.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              {/* 联系人 */}
              <TableCell>{customer.contactPerson}</TableCell>
              {/* 联系方式（邮箱+电话） */}
              <TableCell>
                <div className="text-sm">
                  <div>{customer.email}</div>
                  {customer.phone && <div className="text-muted-foreground">{customer.phone}</div>}
                </div>
              </TableCell>
              {/* 数据来源 */}
              <TableCell>
                <Badge variant="outline">{customer.dataSource}</Badge>
              </TableCell>
              {/* 评分 */}
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(customer.customerScore)}`} />
                  <span className="font-medium">{customer.customerScore}</span>
                </div>
              </TableCell>
              {/* 更新时间 */}
              <TableCell>{customer.updatedDate}</TableCell>
              {/* 操作 */}
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCustomer(customer);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
