import Image from "next/image";
import { Bounce } from "@/components/ui/animations";
import tofino from '@/public/tofino.png'
import korea from '@/public/korea.jpg'
import moherCliffs from '@/public/mohercliffs.jpg'
import ireland from '@/public/ireland1.jpg'
import sunset from '@/public/sunset.jpg'
import { ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";





export default function Home() {
  return (
    <div className="w-full !pt-0   flex flex-col relative justify-center items-center gap-20 ">
     {/* <div 
        className="hero-image !pt-0 !px-0 h-[100vh]   w-full   bg-cover  bg-center lg:h-[100vh] bigscreen:h-[100vh]"
        style={{ backgroundImage: `url('/korea.jpg')` }}>
      </div> */}
      <Image
        src={korea}
        alt="hero image"
        className="w-full pt-0 -mt-28 object-cover h-[100vh] object-[calc(100%+170px)_center] sm:object-[calc(100%+120px)_center] lg:object-[calc(100%)_center] bigscreen:object-[calc(100%)_center]"
      />
      <Bounce  delay={.2  } duration={4}>
          <h2 className="text-center !mt-12 !py-0 !leading-3">Featured Posts</h2>
         <div className="vertical-cards-container relative gap-3 justify-center items-center mt-10  w-full flex flex-shrink flex-1 flex-wrap flex-col  lg:flex-row" >
              <div className="vertical-card  my-2 w-[22rem] h-[38rem] relative hover-effect cursor-pointer">
                <Image src={sunset} alt="placeholder photo" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>

                  <div className=" inset-0 z-5 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
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
                <Image src={tofino} alt="placeholder photo" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>
                  <div className=" inset-0 z-5 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
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
                <Image src={ireland} alt="placeholder photo" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>

                  <div className=" inset-0 z-5 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
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
                <Image src={moherCliffs} alt="placeholder photo" className=" object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>

                  <div className=" inset-0 z-5 absolute justify-end flex flex-col pl-4 pb-4 gap-3" >
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
