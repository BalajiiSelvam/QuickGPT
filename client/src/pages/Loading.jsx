import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Loading = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Redirect after 8 seconds
    const timeout = setTimeout(() => {
      navigate('/')
    }, 8000)
    return () => clearTimeout(timeout)
  }, [navigate])

  useEffect(() => {
    // Detect system theme
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(darkQuery.matches ? 'dark' : 'light')

    const listener = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    darkQuery.addEventListener('change', listener)
    return () => darkQuery.removeEventListener('change', listener)
  }, [])

  // Set dot color based on theme
  const dotColor = theme === 'dark' ? 'bg-white' : 'bg-black'

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden'>
      
      {/* Logo based on theme */}
      <img
        src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
        alt="App Logo"
        className='w-40 sm:w-52 z-10 drop-shadow-xl'
      />

      {/* Bouncing dots loading */}
      <div className='flex gap-2 mt-8 z-10'>
        <span className={`w-3 h-3 ${dotColor} rounded-full animate-bounce delay-0`}></span>
        <span className={`w-3 h-3 ${dotColor} rounded-full animate-bounce delay-150`}></span>
        <span className={`w-3 h-3 ${dotColor} rounded-full animate-bounce delay-300`}></span>
      </div>

      {/* Bouncing animation styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          .delay-0 { animation-delay: 0s; }
          .delay-150 { animation-delay: 0.15s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>
    </div>
  )
}

export default Loading
