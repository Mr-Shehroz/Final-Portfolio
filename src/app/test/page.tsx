import Canva1 from '@/components/canva1'
import React from 'react'

export default function Home() {
    return (
      <>
        <Canva1 /> {/* Fixed canvas */}
        <div style={{ height: '400vh', background: 'transparent' }}>
          {/* Dummy scrollable space */}
        </div>
      </>
    );
  }