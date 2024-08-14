'use client';

import ProductionNavbar from "./_components/Navbar";

export default function ProductionLayout ({children}) {
    return (
      <div>
        <ProductionNavbar/>
        {children}
      </div>
    )
  }