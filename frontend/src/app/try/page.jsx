
import React from 'react'
import NavigationBar from '@/components/NavigationBar'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { auth } from '@/auth'
import ColourfulText from '@/components/ui/colourful-text'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const page = async () => {

    const session = await auth()

    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];
    // const handleChange = function (e) {
    //     console.log(e.target.value);
    //   };

    //   const onSubmit = function (e) {
    //     e.preventDefault();
    //     console.log("submitted");
    //   };

    return (

        <div className='bg-myBackground h-screen w-full text-white '>
            <StarsBackground className="" />
            <NavigationBar />

            <div className='px-16 h-[80vh] '>

                <div className='pt-20'>
                    <div>
                        <p className="text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pt-8 ">Hey, <span> </span>
                            <ColourfulText text={session?.user?.name || "name"} />
                        </p>
                    </div>
                    <div className='pt-3'>
                        <p className="text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">Smart Notes, Simplified Insights<ColourfulText text="." /></p>
                    </div>
                </div>


                <div className='flex items-center justify-between pt-40'>

                    <div className=''>
                        <div>
                            <p className='text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 '>Let's get started</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center px-4 ">
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                        // onChange={handleChange}
                        // onSubmit={onSubmit}
                        />
                    </div>

                    <div className='relative'>
                        <Link href='/'>
                            <Button>Submit the Link.</Button>
                        </Link>
                    </div>
                </div>



                {/* <div className=' h-[30vh] flex flex-col justify-evenly items-start'>
                    <div>
                        <p className='text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 '>Tired of writing down <span className='text-[#b980ea]'>notes after notes</span>?</p>
                    </div>

                    <div>
                        <p className='text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 '>Think someone could help you with the <span className='text-[#b980ea]'>tedious overwork</span></p>
                    </div>


                    <div>
                        <p className='text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 '>Solution : <span className='text-[#b980ea]'>BhaiBot</span></p>
                    </div>

                    <div>
                        <p className='text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 '>Start with providing us the meeting link and BhaiBot will note the Convo for you.</p>
                    </div>

                </div> */}


            </div>

            <div className="text-white flex items-center justify-between mx-20">
                <div className="flex items-center justify-between  w-72">
                    <div>
                        <div>
                            <p className="text-xl">4.9+</p>
                        </div>

                        <div>
                            <p>Stars rating</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className="text-xl">20k+</p>
                        </div>
                        <div>
                            <p>Satisfied Customers</p>
                        </div>
                    </div>
                </div>

                <div className="text-white flex flex-col items-start justify-center w-52 ">
                    <div>
                        <p>Follow us on:</p>
                    </div>
                    <div className="flex items-center justify-between w-40  ">
                        <div>
                            <Image src="/youtube.png" height={50} width={20} alt="yout" />
                        </div>
                        <div>
                            <Image src="/facebook.png" height={50} width={20} alt="yout" />
                        </div>
                        <div>
                            <Image src="/linkedin.png" height={50} width={20} alt="yout" />
                        </div>
                        <div>
                            <Image src="/instagram.png" height={50} width={20} alt="yout" />
                        </div>
                        <div>
                            <Image src="/github.png" height={50} width={20} alt="yout" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page