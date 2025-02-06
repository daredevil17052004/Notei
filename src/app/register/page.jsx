"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoginButtons from "@/components/LoginButtons";
import Link from "next/link";
import axios from "axios";

const page = () => {
    const images = [
        '/black.jpg',
    ];

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

            console.log('THE RESULT IS HERE', res.status)

            if (res.status == 201) {
                router.push('/login')
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <ImagesSlider className="h-screen" images={images}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -80,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center items-center"
            >
                <motion.div className=" text-center  py-4">
                    <div className=" border h-[540px] w-[380px] p-10 bg-gradient-to-b from-transparent to-neutral-900 shadow-2xl shadow-black text-white rounded bg-blur-image">
                        <div>
                            <p className="text-xl">Register with Us</p>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e, router)}>
                            <div className="my-3 flex flex-col items-start justify-center w-full">
                                <div className="mb-1">
                                    <label htmlFor='name'>Name</label>
                                </div>
                                <div className="w-full">
                                    <Input placeholder="Ex. Joe Alan" type="text" name='name' id="name" className="w-full border-transparent rounded py-3 text-white pl-2 bg-transparent/50" />
                                </div>
                            </div>
                            <div className="my-3 flex flex-col items-start justify-center w-full">
                                <div className="mb-1">
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <div className="w-full">
                                    <Input placeholder="Ex. abc@gmail.com" type="email" name='email' id="email" className="w-full border-transparent rounded py-3 text-white pl-2 bg-transparent/50" />
                                </div>
                            </div>
                            <div className="my-3 flex flex-col items-start justify-center w-full">
                                <div className="mb-1">
                                    <label htmlFor='password'>Password</label>
                                </div>
                                <div className="w-full">
                                    <Input placeholder="Ex. ********" type='password' name='password' id='password' className="w-full border-transparent rounded py-3 text-white pl-2 bg-transparent/50" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <Button
                                    className="w-full bg-myAccent text-white"
                                    variant="ghost"
                                    type="submit"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </form>

                        <div className="pt-2">
                            <LoginButtons></LoginButtons>
                        </div>
                        <div className='flex flex-col items-start mt-3'>
                            <p>Have a Account?</p>
                            <Link href='/login' className="text-myAccent hover:underline hover:underline-offset-8 transition duration-700">Login</Link>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </ImagesSlider>
    );


}

export default page
