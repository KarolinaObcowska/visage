import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full">{children}</div>
    </div>
  )
}

export default Layout
