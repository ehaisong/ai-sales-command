
import React, { useState, useMemo, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerList from '@/components/customer/CustomerList';
import CustomerListTransition from '@/components/customer/CustomerListTransition';
import CustomerSearchBar from '@/components/customer/CustomerSearchBar';
import CustomerFilters from '@/components/customer/CustomerFilters';
import CustomerAIAssistant from '@/components/customer/CustomerAIAssistant';
import CustomerAnalytics from '@/components/customer/CustomerAnalytics';
import { Customer, CustomerFilters as FilterType } from '@/types/customer';
import { mockCustomers } from '@/components/customer/mockData';

const CustomerManagement = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<'individual' | 'company'>('individual');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
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

  const handleTabChange = useCallback((newTab: 'individual' | 'company') => {
    if (newTab === activeTab) return;
    
    setIsTransitioning(true);
    setTransitionDirection(newTab === 'company' ? 'right' : 'left');
    
    // Clear selected customer during transition
    setSelectedCustomer(null);
    
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 250);
  }, [activeTab]);

  return (
    <div className="p-6 space-y-6 transition-all duration-300 bg-monday-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-monday-gray-900">客户管理</h1>
          <p className="text-monday-gray-600 mt-1">
            通过智能过滤器和预算洞察跨平台寻找和跟踪客户
          </p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CustomerAnalytics customers={mockCustomers} />
      </div>

      <div className="grid grid-cols-12 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {/* Main Content */}
        <div className="col-span-8">
          {/* Toolbar */}
          <div className="monday-card mb-4 p-4 transition-all duration-200 hover:shadow-monday">
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
              <Tabs 
                value={activeTab} 
                onValueChange={handleTabChange}
                className="transition-all duration-500"
              >
                <TabsList className="grid w-full grid-cols-2 transition-all duration-500 bg-monday-gray-100">
                  <TabsTrigger 
                    value="individual" 
                    className={`transition-all duration-500 data-[state=active]:bg-white data-[state=active]:text-monday-blue data-[state=active]:shadow-monday/20 ${
                      isTransitioning ? 'pointer-events-none opacity-70' : ''
                    }`}
                    disabled={isTransitioning}
                  >
                    个人客户
                  </TabsTrigger>
                  <TabsTrigger 
                    value="company" 
                    className={`transition-all duration-500 data-[state=active]:bg-white data-[state=active]:text-monday-blue data-[state=active]:shadow-monday/20 ${
                      isTransitioning ? 'pointer-events-none opacity-70' : ''
                    }`}
                    disabled={isTransitioning}
                  >
                    企业客户
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Customer List with Transition */}
          <CustomerListTransition
            customers={filteredCustomers}
            isTransitioning={isTransitioning}
            transitionDirection={transitionDirection}
          >
            <CustomerList 
              customers={filteredCustomers}
              onSelectCustomer={setSelectedCustomer}
              selectedCustomer={selectedCustomer}
            />
          </CustomerListTransition>
        </div>

        {/* AI Assistant Panel */}
        <div className="col-span-4 transition-all duration-300">
          <CustomerAIAssistant customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
