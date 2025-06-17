
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Loader2 } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">加载中...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>待办事项</span>
          <span className="text-sm text-gray-500">
            ({completedCount}/{totalCount})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor="new-todo" className="sr-only">
              新增待办事项
            </Label>
            <Input
              id="new-todo"
              type="text"
              placeholder="输入新的待办事项..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button onClick={handleAddTodo} disabled={!newTodo.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              暂无待办事项，添加一个开始吧！
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
