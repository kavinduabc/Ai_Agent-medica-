import React from 'react'
import Image from 'next/image'
import { DoctorAgent } from './DoctorCard'

type props = {
    doctorAgent : DoctorAgent
}

const SuggestedDoctorC = ({ doctorAgent }: props) => {
  const imageUrl = doctorAgent.image || '/placeholder-doctor.png';
  
  return (
    <div className='flex flex-col items-center justify-between'>
      {imageUrl && imageUrl !== '/placeholder-doctor.png' ? (
        <Image
          src={imageUrl}
          alt={doctorAgent.specialist}
          width={200}
          height={200}
          className="w-17.5 h-17.5 object-cover rounded-full"
        />
      ) : (
        <div className="w-17.5 h-17.5 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Img</span>
        </div>
      )}
      <h2 className="text-lg font-semibold text-center mt-2">{doctorAgent.specialist}</h2>
      <p className='text-sm text-gray-600 text-center line-clamp-2'>{doctorAgent.description || doctorAgent.reason || 'Medical specialist'}</p>
    </div>
  )
}

export default SuggestedDoctorC