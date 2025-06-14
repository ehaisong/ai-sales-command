
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, Trash2, Building2, User } from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  onSelectCustomer, 
  selectedCustomer 
}) => {
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

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>客户</TableHead>
            <TableHead>标签</TableHead>
            <TableHead>联系人</TableHead>
            <TableHead>联系方式</TableHead>
            <TableHead>数据来源</TableHead>
            <TableHead>评分</TableHead>
            <TableHead>更新日期</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow 
              key={customer.id}
              className={`cursor-pointer hover:bg-muted/50 ${
                selectedCustomer?.id === customer.id ? 'bg-muted' : ''
              }`}
              onClick={() => onSelectCustomer(customer)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {customer.type === 'company' ? (
                        <Building2 className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    {customer.company && (
                      <div className="text-sm text-muted-foreground">{customer.company}</div>
                    )}
                    <Badge variant={getStatusBadge(customer.status)} className="text-xs mt-1">
                      {getStatusText(customer.status)}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {customer.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{customer.contactPerson}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{customer.email}</div>
                  {customer.phone && (
                    <div className="text-muted-foreground">{customer.phone}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{customer.dataSource}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(customer.customerScore)}`} />
                  <span className="font-medium">{customer.customerScore}</span>
                </div>
              </TableCell>
              <TableCell>{customer.updatedDate}</TableCell>
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
