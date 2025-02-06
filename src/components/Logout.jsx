import React from 'react'
import { doLogout } from '@/app/actions'
import { Button } from './ui/button'

const Logout = () => {
  return (  
    <form action={doLogout}>
        <Button variant='ghost' className="bg-myAccent">
            Logout
        </Button>
    </form>
  )
}

export default Logout