
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowUp, ArrowDown, Trash2, Building2, User } from 'lucide-react';
import { Customer } from '@/types/customer';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import SwitchConfirmDialog from './SwitchConfirmDialog';
import ImportExportButtons from './ImportExportButtons';
import { getTagStyle } from '@/config/tagConfig';

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
  { key: null, label: '状态' },
  { key: 'name', label: '客户', sortable: true },
  { key: null, label: '标签' },
  { key: 'contactPerson', label: '联系人', sortable: true },
  { key: 'email', label: '联系方式', sortable: true },
  { key: 'dataSource', label: '数据来源', sortable: true },
  { key: 'customerScore', label: '评分', sortable: true },
  { key: 'updatedDate', label: '更新日期', sortable: true },
  { key: null, label: '操作' },
];

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onSelectCustomer,
  selectedCustomer,
}) => {
  const [localCustomers, setLocalCustomers] = useState<Customer[]>(customers);
  const [sortField, setSortField] = useState<SortField>('updatedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    customer: Customer | null;
  }>({ isOpen: false, customer: null });
  const [switchDialog, setSwitchDialog] = useState<{
    isOpen: boolean;
    customer: Customer | null;
    isActivating: boolean;
  }>({ isOpen: false, customer: null, isActivating: false });

  // Update local customers when prop changes
  React.useEffect(() => {
    setLocalCustomers(customers);
  }, [customers]);

  // Group customers by type
  const groupedCustomers = useMemo(() => {
    const sorted = [...localCustomers].sort((a, b) => {
      const field = sortField;
      let aValue: any = a[field];
      let bValue: any = b[field];
      
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';
      
      if (field === 'customerScore') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (field === 'updatedDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
        bValue = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const groups = sorted.reduce((acc, customer) => {
      const groupKey = customer.type === 'individual' ? '个人客户' : '企业客户';
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(customer);
      return acc;
    }, {} as Record<string, Customer[]>);

    return groups;
  }, [localCustomers, sortField, sortOrder]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDataSourceStyle = (dataSource: string) => {
    const styles: Record<string, string> = {
      LinkedIn: 'bg-blue-600 text-white',
      Google: 'bg-blue-500 text-white',
      Meta: 'bg-blue-700 text-white',
      Manual: 'bg-gray-600 text-white',
      Import: 'bg-purple-600 text-white'
    };
    return styles[dataSource] || 'bg-gray-500 text-white';
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ArrowUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  const handleToggleActive = (customer: Customer) => {
    setSwitchDialog({
      isOpen: true,
      customer,
      isActivating: !customer.isActive
    });
  };

  const handleSwitchConfirm = () => {
    if (switchDialog.customer) {
      // Update the local customer list
      setLocalCustomers(prevCustomers => 
        prevCustomers.map(customer => 
          customer.id === switchDialog.customer!.id 
            ? { ...customer, isActive: switchDialog.isActivating }
            : customer
        )
      );
      
      console.log(`Toggle active status for customer ${switchDialog.customer.name}: ${switchDialog.isActivating}`);
      setSwitchDialog({ isOpen: false, customer: null, isActivating: false });
    }
  };

  const handleDeleteClick = (customer: Customer) => {
    setDeleteDialog({ isOpen: true, customer });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.customer) {
      // Remove customer from local list
      setLocalCustomers(prevCustomers => 
        prevCustomers.filter(customer => customer.id !== deleteDialog.customer!.id)
      );
      
      console.log(`Delete customer: ${deleteDialog.customer.name}`);
      setDeleteDialog({ isOpen: false, customer: null });
    }
  };

  const handleRowClick = (customer: Customer) => {
    // Only allow selection if customer is active
    if (customer.isActive) {
      onSelectCustomer(customer);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Toolbar with Import/Export */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">客户列表</h3>
          <Badge variant="outline" className="text-sm transition-all duration-200 hover:bg-monday-blue/10">
            总计: {localCustomers.length} 位客户
          </Badge>
        </div>
        <ImportExportButtons />
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((col, idx) =>
                col.sortable ? (
                  <TableHead
                    key={col.label}
                    className="cursor-pointer select-none font-medium text-gray-700 transition-colors duration-200 hover:text-monday-blue"
                    onClick={() => handleSort(col.key as SortField)}
                  >
                    <span className="inline-flex items-center">
                      {col.label}
                      {renderSortIcon(col.key as SortField)}
                    </span>
                  </TableHead>
                ) : (
                  <TableHead key={col.label} className="font-medium text-gray-700">{col.label}</TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupedCustomers).map(([groupName, groupCustomers]) => (
              <React.Fragment key={groupName}>
                {/* Group Header */}
                <TableRow className="bg-gray-100 hover:bg-gray-100 animate-fade-in">
                  <TableCell colSpan={columns.length} className="font-semibold text-gray-800 py-3">
                    <div className="flex items-center space-x-2">
                      {groupName === '企业客户' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      <span>{groupName} ({groupCustomers.length})</span>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Group Customers */}
                {groupCustomers.map((customer, index) => {
                  const tagStyle = getTagStyle(customer.tags[0] || '');
                  
                  return (
                    <TableRow
                      key={customer.id}
                      className={`transition-all duration-300 animate-fade-in ${
                        customer.isActive 
                          ? 'cursor-pointer hover:bg-monday-blue/5 hover:shadow-sm' 
                          : 'cursor-not-allowed'
                      } ${
                        selectedCustomer?.id === customer.id && customer.isActive ? 'bg-monday-blue/10 shadow-md' : ''
                      } ${
                        !customer.isActive ? 'opacity-50 bg-gray-50' : ''
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleRowClick(customer)}
                    >
                      {/* Status Switch */}
                      <TableCell>
                        <Switch
                          checked={customer.isActive}
                          onCheckedChange={() => handleToggleActive(customer)}
                          onClick={(e) => e.stopPropagation()}
                          className={`transition-all duration-300 ${
                            customer.isActive 
                              ? 'data-[state=checked]:bg-green-500 shadow-green-200 shadow-md' 
                              : 'data-[state=unchecked]:bg-red-200'
                          }`}
                        />
                      </TableCell>
                      
                      {/* Customer Name */}
                      <TableCell>
                        <div className={`font-medium transition-colors duration-200 ${
                          !customer.isActive ? 'text-gray-400' : 'text-gray-900'
                        }`}>
                          {customer.name}
                        </div>
                        {customer.company && (
                          <div className={`text-sm transition-colors duration-200 ${
                            !customer.isActive ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {customer.company}
                          </div>
                        )}
                      </TableCell>
                      
                      {/* Tags */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map((tag, index) => {
                            const tagStyle = getTagStyle(tag);
                            
                            return (
                              <div 
                                key={index}
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs border transition-all duration-200 hover:scale-105 ${
                                  tagStyle.color
                                } ${
                                  !customer.isActive ? 'opacity-50' : ''
                                }`}
                              >
                                <span>{tag}</span>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                      
                      {/* Contact Person */}
                      <TableCell className={`transition-colors duration-200 ${
                        !customer.isActive ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {customer.contactPerson}
                      </TableCell>
                      
                      {/* Contact Information */}
                      <TableCell>
                        <div className="text-sm">
                          <div className={`transition-colors duration-200 ${
                            !customer.isActive ? 'text-gray-400' : 'text-gray-900'
                          }`}>
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className={`transition-colors duration-200 ${
                              !customer.isActive ? 'text-gray-300' : 'text-gray-500'
                            }`}>
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      {/* Data Source */}
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                          getDataSourceStyle(customer.dataSource)
                        } ${
                          !customer.isActive ? 'opacity-60' : ''
                        }`}>
                          {customer.dataSource}
                        </div>
                      </TableCell>
                      
                      {/* Score */}
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            getScoreColor(customer.customerScore)
                          } ${
                            !customer.isActive ? 'opacity-50' : ''
                          }`} />
                          <span className={`font-medium transition-colors duration-200 ${
                            !customer.isActive ? 'text-gray-400' : 'text-gray-900'
                          }`}>
                            {customer.customerScore}
                          </span>
                        </div>
                      </TableCell>
                      
                      {/* Updated Date */}
                      <TableCell className={`transition-colors duration-200 ${
                        !customer.isActive ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {customer.updatedDate}
                      </TableCell>
                      
                      {/* Actions */}
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(customer);
                          }}
                          disabled={!customer.isActive}
                          className={`text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-105 ${
                            !customer.isActive ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, customer: null })}
        onConfirm={handleDeleteConfirm}
        customer={deleteDialog.customer}
      />

      <SwitchConfirmDialog
        isOpen={switchDialog.isOpen}
        onClose={() => setSwitchDialog({ isOpen: false, customer: null, isActivating: false })}
        onConfirm={handleSwitchConfirm}
        customer={switchDialog.customer}
        isActivating={switchDialog.isActivating}
      />
    </div>
  );
};

export default CustomerList;
