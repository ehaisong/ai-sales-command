
import React from 'react';
import { Customer } from '@/types/customer';

interface CustomerListTransitionProps {
  customers: Customer[];
  isTransitioning: boolean;
  transitionDirection: 'left' | 'right';
  children: React.ReactNode;
}

const CustomerListTransition: React.FC<CustomerListTransitionProps> = ({
  customers,
  isTransitioning,
  transitionDirection,
  children
}) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isTransitioning
            ? transitionDirection === 'right'
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
      >
        {children}
      </div>
      
      {/* Loading overlay during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex items-center space-x-2 text-monday-blue">
            <div className="w-2 h-2 bg-monday-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-monday-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-monday-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <span className="ml-2 text-sm font-medium">切换中...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerListTransition;
