import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVseries from './pages/TVseries';
import Bookmarks from './pages/Bookmarks';

export default function App(){
  return(
    <Router>
      <div className='app-layout'>
        <Sidebar/>
        <main className='main-content'>
          <Routes>
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/Movies' element={<Movies />} />
            <Route path='/TVseries' element={<TVseries />} />
            <Route path='/Bookmarks'element={<Bookmarks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

