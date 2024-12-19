import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AppleCardsCarouselDemo } from "@/components/AppleCarousel";
import TofinoPic from '../../public/tofinopic.jpg'
import profilepic from '@/public/newprofilepic.jpg'
import { Bounce, BounceFade, FadeIn } from "@/components/ui/animations";
import {BentoGridDemo} from '@/components/BentoGridDemo'
import tofino from '@/public/tofino.png'
import moherCliffs from '@/public/mohercliffs.jpg'
import ireland from '@/public/ireland1.jpg'
import sunset from '@/public/sunset.jpg'
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";





export default function Home() {
  return (
    <div className="w-full  flex flex-col relative justify-center items-center gap-20 ">
     <div 
        className="hero-image   h-[46rem]  w-full   -mt-14 bg-cover  bg-center"
        style={{ backgroundImage: `url('/tofinopic.jpg')` }}>
        <div className="pt-48  relative flex flex-col items-center justify-center h-full w-full text-center text-white px-4">

            <BounceFade duration={1.3}>
              <h1 className="text-4xl sm:text-6xl font-bold mb-4  text-white">
                Hi, I'm Louise.
              </h1>
            </BounceFade >
            <div>
              <FadeIn duration={1.2} delay={0.4} >
                <p className="text-lg sm:text-xl max-w-2xl">
                Nurse by day, traveler by heart. Follow my journey as I explore the world and share my adventures!
                </p>
              </FadeIn>
            </div>
        </div>
      </div>
      <Bounce  delay={.2  } duration={4}>
          <h2 className="text-center !mt-12 !py-0 !leading-3">Featured Posts</h2>
         <div className="vertical-cards-container relative gap-3 justify-center items-center mt-10  w-full flex flex-shrink flex-1 flex-wrap flex-col  lg:flex-row" >
              <div className="vertical-card  my-2 w-[22rem] h-[38rem] relative hover-effect cursor-pointer">
                <Image src={sunset} alt="" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>

                  <div className=" inset-0 z-20 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
                    <div>
                      <Badge variant='secondary' className=" text-xs" >Travel Guide</Badge>
                    </div>
                    <div className="flex gap-3 justify-start items-center">
                      <p className="text-white font-bold">Final Day in Ireland </p><ExternalLink   className="text-white size-4"/>
                    </div>
                  </div>
                  <div className="bg-black opacity-0 flex flex-col justify-end  bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 inset-0 absolute transition-opacity duration-300">
                  </div>
              </div>

              <div className="vertical-card  my-2 w-[22rem] h-[38rem] relative hover-effect cursor-pointer ">
                <Image src={tofino} alt="" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>
                  <div className=" inset-0 z-20 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
                    <div>
                      <Badge variant='secondary' className=" text-xs" >Travel Guide</Badge>
                    </div>
                    <div className="flex gap-3 justify-start items-center">
                      <p className="text-white font-bold">Camping in Tofino</p><ExternalLink   className="text-white size-4"/>
                    </div>
                  </div>
                  <div className="bg-black opacity-0 flex flex-col justify-end  bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 inset-0 absolute transition-opacity duration-300">
                  </div>
              </div>
              <div className="vertical-card  my-2 w-[22rem] h-[38rem] relative hover-effect cursor-pointer">
                <Image src={ireland} alt="" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>

                  <div className=" inset-0 z-20 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
                    <div>
                      <Badge variant='secondary' className=" text-xs" >Travel Guide</Badge>
                    </div>
                    <div className="flex gap-3 justify-start items-center">
                      <p className="text-white font-bold">Ireland Pt.1 </p><ExternalLink   className="text-white size-4"/>
                    </div>
                  </div>
                  <div className="bg-black opacity-0 flex flex-col justify-end  bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 inset-0 absolute transition-opacity duration-300">
                  </div>
              </div>
              <div className="vertical-card  my-2 w-[22rem] h-[38rem] relative hover-effect cursor-pointer">
                <Image src={moherCliffs} alt="" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>

                  <div className=" inset-0 z-20 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
                    <div>
                      <Badge variant='secondary' className=" text-xs" >Travel Guide</Badge>
                    </div>
                    <div className="flex gap-3 justify-start items-center">
                      <p className="text-white font-bold">The Majestic Cliffs of Moher</p><ExternalLink   className="text-white size-4"/>
                    </div>
                  </div>
                  <div className="bg-black opacity-0 flex flex-col justify-end  bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 inset-0 absolute transition-opacity duration-300">
                  </div>
              </div>
         </div>
      </Bounce>
      
      

    </div>
  );
}
