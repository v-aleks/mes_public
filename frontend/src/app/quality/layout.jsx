'use client';

import QualityNavbar from "./_components/Navbar";

export default function QualityLayout ({children}) {
    return (
      <div>
        <QualityNavbar />
        {children}
      </div>
    )
  }