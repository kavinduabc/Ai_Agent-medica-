'use client';

import React from 'react';
import { AIDoctor } from '@/shared/list';
import DoctorCard from './DoctorCard';

const DoctorsAgentList = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-5">
        Specialist Doctors Agent
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {AIDoctor.map((doctor) => (
          <DoctorCard key={doctor.id} doctorAgent={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorsAgentList;
