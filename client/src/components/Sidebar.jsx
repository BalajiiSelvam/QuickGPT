import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { chats, setSelectedChat, theme, setTheme, user } = useAppContext()
  const [search, setSearch] = useState('')

  return (
    <div
      className='flex flex-col h-screen min-w-[18rem] p-5
      dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30
      border-r border-gray-300 dark:border-[#80609F]/20
      backdrop-blur-3xl transition-all duration-500
      max-md:absolute max-md:top-0 max-md:left-0 max-md:z-10'
    >
      {/* Logo */}
      <img
        src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
        alt="Logo"
        className='w-full max-w-[12rem] flex-shrink-0'
      />

      {/* New Chat Button */}
      <button
        className='flex justify-center items-center w-full py-2 mt-10 text-white
        bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer
        hover:opacity-90 transition duration-200 flex-shrink-0'
      >
        <span className='mr-2 text-xl'>+</span> New Chat
      </button>

      {/* Search Conversations */}
      <div
        className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20
        rounded-md'
      >
        <img
          src={assets.search_icon}
          alt="Search"
          className='w-4 not-dark:invert'
        />
        <input
          type='text'
          placeholder='Search Conversations'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='text-xs placeholder:text-gray-400 outline-none bg-transparent flex-1'
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className='mt-4 text-gray-800 dark:text-[#B1A6C0]'>Recent Chats</p>}

      <div className='flex-1 overflow-y-auto mt-3 text-sm space-y-3'>
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300
              dark:border-[#80609F]/20 rounded-md cursor-pointer flex justify-between items-start
              group hover:bg-gray-100 dark:hover:bg-[#57317C]/20 transition'
            >
              <div className='flex-1'>
                <p className='truncate w-full'>
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                  {chat.updatedAt}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                alt="Delete"
                className='hidden group-hover:block w-4 mt-2 cursor-pointer not-dark:invert'
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Sidebar
