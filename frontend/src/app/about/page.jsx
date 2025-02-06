import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import Particles from '@/components/magicui/particles'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import team from '@/assets/Team'
import BoxReveal from '../../components/BoxReval'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Logout from '@/components/Logout'

const page = () => {


  return (
    <div>
      <BoxReveal boxColor='#7201d5'>


        <NavigationBar />

        <div className="flex flex-col justify-center items-center my-10 mx-32">
          <div className="text-3xl font-medium">
            <p>About Us</p>
          </div>
          <div className="mt-3">
            <p>
              Welcome to Maintainer, your top-tier car detailing service. We offer comprehensive exterior and interior cleaning services, as well as paint restoration, to keep your car looking
              brand new.
            </p>
          </div>
        </div>

        <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
          <div className="mx-32 relative">
            <Particles className="absolute inset-0" quantity={200} ease={80} color="#E33665" refresh />
            <div className="flex items-center justify-between ">
              <div>
                <Image src='/about.jpg' width={600} height={600} className="rounded" />
              </div>
              <div className=" w-1/2">
                <div>
                  <p>About Us</p>
                </div>
                <div className='text-3xl'>
                  <p>Unmatched Maintaining Expertise</p>
                </div>
                <div className="my-3">
                  <label>Expert attention to detail</label>
                  <Progress value={80} className="w-full" />
                </div>
                <div className="my-3">
                  <label>State-of-the-art equipment</label>
                  <Progress value={93} className="w-full" />
                </div>
                <div className="my-3">
                  <label>Tailored services</label>
                  <Progress value={85} className="w-full" />
                </div>
                <div className="my-3">
                  <label>Exceptional customer service</label>
                  <Progress value={96} className="w-full" />
                </div>
              </div>
            </div>


            <div className="flex items-center  justify-center mt-10">
              <div className="w-1/2">
                <p className="font-semibold text-xl">Our Vision</p>
                <p>
                  Our vision is to become the leading provider of premium car
                  detailing services in the region, delivering unparalleled results
                  and customer satisfaction.
                </p>
                <div className='mt-2'>
                  <Button className="bg-myAccent" variant='ghost'>Learn More</Button>
                </div>
              </div>
              <div >
                <div className="flex flex-col justify-between">
                  <div className="font-semibold text-xl mb-2 mt-4">
                    Our Mission
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-2">
                    <div className="w-40">
                      <div>
                        <Image src='/rise (1).png' width={25} height={25} />
                      </div>
                      <div>
                        <p>To provide
                          unmatched car
                          detailing services to
                          our valued clients</p>
                      </div>
                    </div>
                    <div className="w-40">
                      <div>
                        <Image src='/pie-chart.png' width={25} height={25} />
                      </div>
                      <div>
                        <p>To exceed
                          expectations with
                          every vehicle we
                          detail</p>
                      </div>
                    </div>
                    <div className="w-40">
                      <div>
                        <Image src='/red-flag.png' width={25} height={25} />
                      </div>
                      <div>
                        <p>To continually
                          invest in the latest
                          technology and
                          techniques to
                          deliver superior
                          results</p>
                      </div>
                    </div>
                    <div className="w-40">
                      <div>
                        <Image src='/monitor.png' width={25} height={25} />
                      </div>
                      <div>
                        <p>To prioritize
                          customer
                          satisfaction and
                          experience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full ">

          <div className="mx-32 my-40 flex flex-col justify-evenly items-start ">

            <div className="flex items-center justify-center  w-full">

              <div className="w-1/2 ">
                <div className="my-7">
                  <div className="font-semibold">
                    <span className="text-myAccent">|</span>
                    <span>Our core values</span>
                  </div>
                  <div className="text-4xl font-semibold mt-3">
                    <p>Uncompromising quality and attention
                      to detail
                      <span className='text-myAccent'> detail </span></p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="p-2 bg-black text-white w-fit my-3">
                      <p>1/ Customer satisfaction</p>
                    </div>
                    <div>
                      <p>
                        At Maintainer, we’re here to meet and exceed your expectations. We listen closely to your needs and
                        concerns, and we strive to provide service that will leave you completely satisfied.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="p-2 bg-black text-white w-fit my-3">
                      <p >2/ Expertise and professionalism</p>
                    </div>
                    <div>
                      <p>
                        Our team has the knowledge and experience necessary to deliver the highest quality of service. We
                        take pride in our attention to detail and our commitment to professionalism.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="p-2 bg-black text-white w-fit my-3">
                      <p>3/ Environmentally friendly practices</p>
                    </div>
                    <div>
                      <p>
                        We believe in doing our part to protect the environment. We use eco-friendly cleaning products and
                        techniques to minimize our impact on the planet.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="p-2 bg-black text-white w-fit my-3">
                      <p>4/ Affordable pricing</p>
                    </div>
                    <div>
                      <p>
                        We believe that everyone deserves access to high-quality car detailing services. That’s why we offer
                        competitive pricing without compromising on quality or service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 flex items-center justify-center">
                <Image src='/att.jpg' width={600} height={700} className="rounded h-[500px] w-[500px]" />
              </div>
            </div>
          </div>
        </div>


        <div className="h-screen bg-black text-white flex flex-col items-center  relative">
          <Particles className="absolute inset-0" quantity={200} ease={80} color="#E33665" refresh />
          <div className="mx-32 ">
            <div className="flex flex-col items-center justify-center mt-32 mb-20">
              <div>
                <span className="text-myAccent">|</span> <span>Our Team</span>
              </div>
              <div className="text-3xl font-medium">
                <p>Passionate car enthusiasts dedicated to perfection</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {
                team.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center justify-center">
                      <div className="w-1/2">
                        <Image src={item.image} width={100} height={100} className="h-[200px] w-[200px]" />
                      </div>
                      <div className="w-1/2">
                        <div className="text-2xl font-medium">
                          <p>{item.name}</p>
                        </div>
                        <div className="text-xl font-medium">
                          <p>{item.role}</p>
                        </div>
                        <div className="  ">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>


      </BoxReveal>
    </div>
  )
}

export default page