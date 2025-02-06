import React from 'react'
import AIInterface from '@/components/ai-interface'
import { StarsBackground } from '@/components/ui/stars-background'

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-myBackground text-white" >
      <StarsBackground/>
      <h1 className="text-4xl font-bold mb-8" >AI Voice Interface</h1>
      <AIInterface />
    </main>
  )
}

export default page