import Image from "next/image";
import NavigationBar from "@/components/NavigationBar";
import { Spotlight } from "@/components/ui/spotlight";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Cover } from "@/components/ui/cover";
import Link from "next/link";

const BorderedFont = ({ text, borderColor = "white", className = "" }) => {
  return (
    <span
      className={`
        relative 
        inline-block
        font-bold 
        text-4xl md:text-6xl lg:text-7xl
        ${className}
      `}
    >
      <span
        className="absolute inset-0"
        style={{
          WebkitTextStroke: `2px ${borderColor}`,
          WebkitTextFillColor: "transparent",
          textStroke: `2px ${borderColor}`,
          color: "transparent",
        }}
      >
        {text}
      </span>
      <span className="relative invisible">{text}</span>
    </span>
  )
}

export default function Home() {


  return (

    <main className="w-full bg-myBackground h-screen">
      <Spotlight />
      <ShootingStars />
      <StarsBackground className=""/>

      <NavigationBar />
      <div className="tzext-white h-[80vh]  flex flex-col justify-center items-center " >
        <div className="h-[50rem] w-full   relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 flex flex-col items-center justify-center">
               <span className="pb-2"> Make it Easy with <br /></span>
                {/* <span className="text-myAccent/80">Bhai Bot</span> */}
                <BorderedFont text="Note-i" borderColor="#7201d5" className=""/>
              </p>
            </div>
            <div className="w-[700px] ">
              <p className="text-xl text-center">Harness the power of AI to optimise and understand the communications more easily</p>
            </div>

            <div className="mt-4">
              <Link href="/try">
              <Cover className="w-40 flex justify-center items-center text-white hover:cursor-pointer">
                Try the Bot
              </Cover>
              </Link>
            </div>
          </div>
        </div>
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
              <Image src="/youtube.png" height={50} width={20} alt="yout"/>
            </div>
            <div>
              <Image src="/facebook.png" height={50} width={20} alt="yout"/>
            </div>
            <div>
              <Image src="/linkedin.png" height={50} width={20} alt="yout"/>
            </div>
            <div>
              <Image src="/instagram.png" height={50} width={20} alt="yout"/>
            </div>
            <div>
              <Image src="/github.png" height={50} width={20} alt="yout"/>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
