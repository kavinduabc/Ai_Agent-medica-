import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/DoctorsAgentList'
import NewSession from './_components/NewSession'

function Workspace() {
  return (
    <div>
      <div className='flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>My Dashboard</h2>
      <NewSession />
      </div>
      <HistoryList />

      <DoctorsAgentList />
    </div>
  )
}

export default Workspace