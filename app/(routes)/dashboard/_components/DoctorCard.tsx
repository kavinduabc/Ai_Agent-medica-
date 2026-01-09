'use client';

import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

export type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  reason?: string;
  image?: string;
  agentPrompt?: string;
};

type Props = {
  doctorAgent: DoctorAgent;
};

function DoctorCard({ doctorAgent }: Props) {
  // Provide fallback image if not available
  const imageUrl = doctorAgent.image || '/placeholder-doctor.png';
  
  return (
    <div className="p-4 border rounded-xl hover:shadow-md transition bg-white">
      {imageUrl && imageUrl !== '/placeholder-doctor.png' ? (
        <Image
          src={imageUrl}
          alt={doctorAgent.specialist}
          width={200}
          height={200}
          className="w-full h-62.5 object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-62.5 bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      <h3 className="mt-3 font-semibold text-center">
        {doctorAgent.specialist}
      </h3>
      <p className="text-sm text-gray-500 text-center mt-1">
        {doctorAgent.description || doctorAgent.reason || 'Medical specialist'}
      </p>
      <Button className="w-full mt-2">Start Consultation <IconArrowRight /></Button>
    </div>
  );
}

export default DoctorCard;
