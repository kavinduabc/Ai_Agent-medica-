'use client';

import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type Props = {
  doctorAgent: DoctorAgent;
};

function DoctorCard({ doctorAgent }: Props) {
  return (
    <div className="p-4 border rounded-xl hover:shadow-md transition bg-white">
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={200}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h3 className="mt-3 font-semibold text-center">
        {doctorAgent.specialist}
      </h3>
      <p className="text-sm text-gray-500 text-center mt-1">
        {doctorAgent.description}
      </p>
      <Button className="w-full mt-2">Start Consultation <IconArrowRight /></Button>
    </div>
  );
}

export default DoctorCard;
