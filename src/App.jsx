import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainOne from './components/Main/MainOne';
import Layout from './components/Layout/Layout';
import Projects from './components/Projects/Projects';
import AboutSection from './components/About/About';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainOne/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/about" element={<AboutSection/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
