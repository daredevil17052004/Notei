"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from './ui/input'
import Link from 'next/link'

// Define the handleSubmit function

const RegistrationForm = () => {
    const router = useRouter();


    async function handleSubmit(e, router) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);

            const name = formData.get('name');
            const email = formData.get('email')
            const password = formData.get('password')

            const res = await axios.post('/api/register', { name, email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log('THE RESULT IS HERE',res.status)

            if (res.status == 201) {
                router.push('/login')
            }

        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e, router)}>
                <div className="my-3">
                    <div className="mb-1">
                        <label htmlFor='name'>Name</label>
                    </div>
                    <div>
                        <Input placeholder="Ex. Joe Alan" type="text" name='name' id="name" />
                    </div>
                </div>
                <div className="my-3">
                    <div className="mb-1">
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div>
                        <Input placeholder="Ex. abc@gmail.com" type="email" name='email' id="email" />
                    </div>
                </div>
                <div className="my-3">
                    <div className="mb-1">
                        <label htmlFor='password'>Password</label>
                    </div>
                    <div>
                        <Input placeholder="Ex. ********" type='password' name='password' id='password' />
                    </div>
                </div>
                <div className="my-3">
                    <Button
                        className="w-full bg-myAccent text-white"
                        variant="ghost"
                        type="submit"
                    >
                        Get Started
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm;
