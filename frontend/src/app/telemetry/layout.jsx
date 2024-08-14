'use client';

import TelemetryNavbar from "./_components/Navbar";
import { MachinesStoreProvider } from "../_stores/MachinesStore/MachinesStoreProvider";


export default function TelemetryLayout({
    children
  }) {
    return (
        <MachinesStoreProvider>
            <div>
              <TelemetryNavbar />
              {children}
            </div>
        </MachinesStoreProvider>
    )
  }