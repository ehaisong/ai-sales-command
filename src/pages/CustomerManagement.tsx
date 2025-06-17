
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CustomerTable from '@/components/customer/CustomerTable';
import CustomerToolbar from '@/components/customer/CustomerToolbar';
import CustomerAIAssistant from '@/components/customer/CustomerAIAssistant';
import CustomerAnalytics from '@/components/customer/CustomerAnalytics';
import { Customer, CustomerFilters as FilterType } from '@/types/customer';
import { mockCustomers } from '@/components/customer/mockData';

const CustomerManagement = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
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
          !customer.company?.toLowerCase().includes(filters.search.toLowerCase()) &&
          !customer.email?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
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
  }, [mockCustomers, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">客户管理</h1>
            <p className="text-sm text-gray-600 mt-1">
              管理和跟踪您的客户关系
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="px-6 py-4">
        <CustomerAnalytics customers={mockCustomers} />
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            <Card className="shadow-sm">
              <CustomerToolbar
                searchValue={filters.search}
                onSearchChange={(search) => setFilters({ ...filters, search })}
                filters={filters}
                onFiltersChange={setFilters}
              />
              <CardContent className="p-0">
                <CustomerTable
                  customers={filteredCustomers}
                  onSelectCustomer={setSelectedCustomer}
                  selectedCustomer={selectedCustomer}
                />
              </CardContent>
            </Card>
          </div>

          {/* AI Assistant Panel */}
          <div className="col-span-4">
            <CustomerAIAssistant customer={selectedCustomer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
