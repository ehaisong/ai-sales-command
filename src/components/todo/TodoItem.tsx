
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <span 
        className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
