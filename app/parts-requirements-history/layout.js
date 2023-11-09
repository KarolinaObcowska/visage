import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full p-4 py-6 md:py-8 md:px-16 bg-base-100 ">{children}</div>
    </div>
  )
}

export default Layout
