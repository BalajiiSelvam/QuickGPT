import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const texts = [
  "Ask me anything 💬",
  "Get instant answers ⚡",
  "Chat smarter 🤖",
  "Learn faster 🚀"
]

const ChatBox = () => {
  const { selectedChat, theme } = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const [displayText, setDisplayText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  // Typing Effect
  useEffect(() => {
    const currentText = texts[index % texts.length]
    const speed = isDeleting ? 60 : 120

    const timer = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting
          ? currentText.substring(0, prev.length - 1)
          : currentText.substring(0, prev.length + 1)
      )

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setIndex(prev => prev + 1)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30
    max-md:mt-14 2xl:pr-40'>
      {/* Chat Messages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className='w-full max-w-56 sm:max-w-68'
            />
            <p className='mt-5 text-3xl sm:text-4xl text-center text-gray-400 dark:text-white font-semibold'>
              {displayText}
              <span className='border-r-2 border-gray-400 animate-pulse ml-1'></span>
            </p>
          </div>
        )}
      </div>

      {/* Prompt Input Box */}
      <form>

      </form>
    </div>
  )
}

export default ChatBox
