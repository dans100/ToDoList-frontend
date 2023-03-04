import React from 'react';
import { TodoList } from '../components/TodoList/TodoList';
import { Footer } from '../components/Layout/Footer';

export const TodoListView = () => {
  return (
    <>
      <TodoList />
      <Footer />
    </>
  );
};
