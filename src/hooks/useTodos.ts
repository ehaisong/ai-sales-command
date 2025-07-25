import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'demo_todos';

// Initial demo data
const initialTodos: Todo[] = [
  {
    id: '1',
    text: '完成产品演示',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    text: '准备客户展示材料',
    completed: true,
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: '3',
    text: '更新项目文档',
    completed: false,
    createdAt: new Date(Date.now() - 172800000),
  },
];

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load todos from localStorage
  const loadTodos = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedTodos = JSON.parse(stored);
        // Convert date strings back to Date objects
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(todosWithDates);
      } else {
        // Initialize with demo data
        setTodos(initialTodos);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos(initialTodos);
    } finally {
      setLoading(false);
    }
  };

  // Save todos to localStorage
  const saveTodos = (newTodos: Todo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
      toast({
        title: "错误",
        description: "保存失败，请重试",
        variant: "destructive",
      });
    }
  };

  const addTodo = async (text: string) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };

    const newTodos = [newTodo, ...todos];
    saveTodos(newTodos);

    toast({
      title: "成功",
      description: "待办事项已添加",
    });
  };

  const toggleTodo = async (id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);

    toast({
      title: "成功",
      description: "待办事项状态已更新",
    });
  };

  const deleteTodo = async (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    saveTodos(newTodos);

    toast({
      title: "成功",
      description: "待办事项已删除",
    });
  };

  // Reset todos to initial demo data
  const resetTodos = () => {
    saveTodos(initialTodos);
    toast({
      title: "成功",
      description: "数据已重置为演示状态",
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    resetTodos,
  };
};