
import React from "react";
import AppHeader from "./_components/AppHeader";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="px-10 md:px-20 lg:px-40 py-10">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
