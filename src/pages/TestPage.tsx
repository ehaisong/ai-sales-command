
import React from 'react';
import TodoList from '@/components/todo/TodoList';

const TestPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">测试模块</h1>
        <p className="text-gray-600 mt-2">这里是测试功能页面</p>
      </div>
      
      <div className="space-y-6">
        <TodoList />
      </div>
    </div>
  );
};

export default TestPage;
