"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from './ui/button'
import { doSocialLogin } from '@/app/actions'
import { doCredentialLogin } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoginButtons from './LoginButtons'
import Link from 'next/link'

const Login = () => {

    const router = useRouter();
    const [error, setError] = useState('')

    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget)
            console.log('FormData:', Object.fromEntries(formData));
            const response = await doCredentialLogin(formData)
            if (response == "http://localhost:3000/login"){
                router.push('/')
            }else{
                throw new Error("Check your credentails")
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className=" border h-[450px] w-[380px] p-10 bg-gradient-to-b from-transparent to-neutral-900 shadow-2xl shadow-black text-white rounded bg-blur-image">

            <div>
                <p className="text-xl">Login to your acoount    </p>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e)} className="z-10 flex flex-col items-start justify-evenly  h-[200px]">

                <div className="flex flex-col items-start justify-center w-full">
                    <label htmlFor="email" className="py-3">Email</label>
                    <input type="email" name='email' id="email"  className="w-full h-8 rounded py-3 text-white pl-2 bg-transparent/50" placeholder='Enter Email'/>
                </div>
                <div className="flex flex-col items-start justify-center w-full pb-5">
                    <label htmlFor="password" className="py-3">Password</label>
                    <input type="password" name='password' id="password" className="w-full h-8 rounded text-white pl-2 bg-transparent/50" placeholder='Enter password '/>
                </div>

                <Button type='submit' className="w-full bg-myAccent" variant='ghost' >Credential login</Button>

            </form>

            <div className="pt-6">
            <LoginButtons />
            </div>

            <div className='flex flex-col items-start mt-3'>
                <p>Don't have an Account?</p>
                <Link href='/register' className="text-myAccent hover:underline hover:underline-offset-8 transition duration-700">Register</Link>
            </div>
        </div>
    )
}

export default Login