import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'


const App = () => {

  return (
    <div className='bg-white text-black dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<ChatBox/>} />
          <Route path='/credits' element={<Credits/>} />
          <Route path='/community' element={<Community/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
