'use client';

import LabNavbar from "./_components/Navbar";

export default function LabLayout({
    children
  }) {
    return (
      <div>
        <LabNavbar />
        {children}
      </div>
    )
  }