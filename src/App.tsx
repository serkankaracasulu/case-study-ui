import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './main/Header';
import Footer from './main/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
