import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css';
import { Home, CreatePost } from './Pages';

function App() {
  

  return (
    <BrowserRouter className="bg-[#002B5B]">
      <header className='w-[full] h-[70px] flex items-center justify-between shadow-lg bg-[#1A5F7A]'>
        <Link to="/">
          <div className='text-lg  ml-9 '>
            <h1 className='text-[#57C5B6] font-bold text-2xl'>
            Jpeg.Ai</h1>
          </div>
        </Link>
        <Link to="/create-post" className='p-1 px-4 bg-[#57C5B6] rounded-md mr-9 text-[#1A5F7A]
        hover:bg-green-200 hover:scale-[1.03] hover:text-[#002B5B] duration-200 ease-in-out uppercase
        font-bold
        '>Create</Link>
      </header>
      <main className='w-full h-[1000px] bg-[#002B5B]'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create-post' element={<CreatePost/>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
