
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerList from '@/components/customer/CustomerList';
import CustomerSearchBar from '@/components/customer/CustomerSearchBar';
import CustomerFilters from '@/components/customer/CustomerFilters';
import CustomerAIAssistant from '@/components/customer/CustomerAIAssistant';
import CustomerAnalytics from '@/components/customer/CustomerAnalytics';
import { Customer, CustomerFilters as FilterType } from '@/types/customer';
import { mockCustomers } from '@/components/customer/mockData';

const CustomerManagement = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<'individual' | 'company'>('individual');
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    type: 'all',
    dataSource: [],
    scoreRange: [0, 100],
    tags: [],
    status: []
  });

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      // Apply search filter
      if (filters.search && !customer.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !customer.company?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Apply tab filter
      if (activeTab === 'individual' && customer.type !== 'individual') return false;
      if (activeTab === 'company' && customer.type !== 'company') return false;
      
      // Apply data source filter
      if (filters.dataSource.length > 0 && !filters.dataSource.includes(customer.dataSource)) {
        return false;
      }
      
      // Apply score range filter
      if (customer.customerScore < filters.scoreRange[0] || customer.customerScore > filters.scoreRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [mockCustomers, filters, activeTab]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">客户管理</h1>
          <p className="text-muted-foreground">
            通过智能过滤器和预算洞察跨平台寻找和跟踪客户
          </p>
        </div>
      </div>

      {/* Analytics Overview */}
      <CustomerAnalytics customers={mockCustomers} />

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8">
          {/* Toolbar */}
          <div className="bg-white border border-gray-200 rounded-lg mb-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CustomerSearchBar 
                  value={filters.search}
                  onChange={(search) => setFilters({ ...filters, search })}
                />
                <CustomerFilters 
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'individual' | 'company')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual">个人客户</TabsTrigger>
                  <TabsTrigger value="company">企业客户</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Customer List with integrated toolbar */}
          <CustomerList 
            customers={filteredCustomers}
            onSelectCustomer={setSelectedCustomer}
            selectedCustomer={selectedCustomer}
          />
        </div>

        {/* AI Assistant Panel */}
        <div className="col-span-4">
          <CustomerAIAssistant customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
