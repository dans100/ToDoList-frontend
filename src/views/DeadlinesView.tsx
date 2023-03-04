import React from 'react';
import { Header } from '../components/Layout/Header';
import { Deadlines } from '../components/Deadlines/Deadlines';
import { Footer } from '../components/Layout/Footer';

export const DeadlinesView = () => {
  return (
    <>
      <Header />
      <Deadlines />
      <Footer />
    </>
  );
};
