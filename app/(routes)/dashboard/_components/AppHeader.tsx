import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {

  const menuOptions = [ 
    {
      id: 1,
      label: 'Home',
      link: '/dashboard/home'
    },
    {
      id: 2,
      label: 'History',
      link: '/dashboard/history'
    },
    {
      id: 3,
      label: 'Pricing',
      link: '/dashboard/pricing'
    },
    {
      id: 4,
      label: 'Profile',
      link: '/dashboard/profile'
    },
  ]
  return (
    <div className='flex items-center justify-between p-4 shadow-2xl px-10 md:px-20 lg:px-40'>
       <Image src="/logo.svg" alt="Logo" width={120} height={60} />
        <div className='hidden md:flex  gap-12 items-center'>
       {menuOptions.map((option,index) => (
         <div key={index}>
          <h2 className='hover:font-bold cursor-pointer'>{option.label}</h2>

         </div>
       ))}
      </div>
      
      <UserButton />
    </div>
  )
}

export default AppHeader