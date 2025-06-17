
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, User, ChevronDown, ChevronRight } from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerTableProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onSelectCustomer,
  selectedCustomer,
}) => {
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['individual', 'company']));

  const groupedCustomers = React.useMemo(() => {
    const groups = {
      individual: customers.filter(c => c.type === 'individual'),
      company: customers.filter(c => c.type === 'company'),
    };
    return groups;
  }, [customers]);

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      client: 'bg-green-100 text-green-800',
      prospect: 'bg-orange-100 text-orange-800',
      active: 'bg-blue-100 text-blue-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderCustomerRow = (customer: Customer) => (
    <tr
      key={customer.id}
      className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
        selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''
      }`}
      onClick={() => onSelectCustomer(customer)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {customer.type === 'company' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{customer.name}</div>
            {customer.company && <div className="text-xs text-gray-500">{customer.company}</div>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm text-gray-900">{customer.contactPerson || '-'}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm text-gray-900">{customer.email}</div>
        {customer.phone && <div className="text-xs text-gray-500">{customer.phone}</div>}
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline" className="text-xs">
          {customer.dataSource}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getScoreColor(customer.customerScore)}`} />
          <span className="text-sm font-medium">{customer.customerScore}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {customer.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {customer.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{customer.tags.length - 2}
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600">{customer.updatedDate}</span>
      </td>
    </tr>
  );

  const renderGroup = (groupKey: string, groupName: string, customers: Customer[]) => {
    const isExpanded = expandedGroups.has(groupKey);
    
    return (
      <React.Fragment key={groupKey}>
        <tr className="bg-gray-50 border-y border-gray-200">
          <td colSpan={7} className="px-4 py-2">
            <button
              onClick={() => toggleGroup(groupKey)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span>{groupName}</span>
              <span className="text-gray-500">({customers.length})</span>
            </button>
          </td>
        </tr>
        {isExpanded && customers.map(renderCustomerRow)}
      </React.Fragment>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              客户
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              联系人
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              联系方式
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              来源
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              评分
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              标签
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              更新时间
            </th>
          </tr>
        </thead>
        <tbody>
          {renderGroup('individual', '个人客户', groupedCustomers.individual)}
          {renderGroup('company', '企业客户', groupedCustomers.company)}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
