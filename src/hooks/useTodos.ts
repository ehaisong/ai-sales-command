
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Todo } from '@/types/todo';
import { useToast } from '@/hooks/use-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch todos from Supabase
  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTodos: Todo[] = data.map(todo => ({
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
        createdAt: new Date(todo.created_at)
      }));

      setTodos(formattedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast({
        title: "错误",
        description: "获取待办事项失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (text: string) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text, completed: false }])
        .select()
        .single();

      if (error) throw error;

      const newTodo: Todo = {
        id: data.id,
        text: data.text,
        completed: data.completed,
        createdAt: new Date(data.created_at)
      };

      setTodos(prev => [newTodo, ...prev]);
      
      toast({
        title: "成功",
        description: "待办事项已添加",
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      toast({
        title: "错误",
        description: "添加待办事项失败",
        variant: "destructive",
      });
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);

      if (error) throw error;

      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      toast({
        title: "错误",
        description: "更新待办事项失败",
        variant: "destructive",
      });
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTodos(prev => prev.filter(t => t.id !== id));
      
      toast({
        title: "成功",
        description: "待办事项已删除",
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast({
        title: "错误",
        description: "删除待办事项失败",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchTodos();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('todos')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'todos' },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchTodos(); // Re-fetch todos when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
