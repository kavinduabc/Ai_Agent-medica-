'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import NewSession from './NewSession';

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);

  return (
    <div className="mt-10">
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center">
          
          <Image
            src="/medical-assistance.png"
            alt="No consultations"
            width={180}
            height={180}
            className="opacity-80"
          />

          <h2 className="text-2xl font-semibold text-gray-800">
            No Recent Consultations
          </h2>

          <p className="text-gray-500 max-w-md">
            It looks like you haven’t had any consultations yet.  
            Start a new consultation to get medical assistance.
          </p>

          <NewSession />
        </div>
      ) : (
        <div>
          {/* History list UI goes here */}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
