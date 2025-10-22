import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVseries from './pages/TVseries';
import Bookmarks from './pages/Bookmarks';
import Signup from './pages/Signup';  // 👈 importuojam signup puslapį

export default function App() {
  return (
    <Router>
      <div className='app-layout'>
        {/* kairėje pusėje sidebar */}
        <Sidebar />
        <main className='main-content'>
          <Routes>
            {/* 👇 Signup bus pagrindinis puslapis */}
            <Route path='/' element={<Signup />} />

            {/* 👇 kiti tavo puslapiai */}
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/Movies' element={<Movies />} />
            <Route path='/TVseries' element={<TVseries />} />
            <Route path='/Bookmarks' element={<Bookmarks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
