import React from 'react'
import {Carousel, AppleCard} from '../components/ui/apple-cards-carousel';
import { useUser } from '../components/UserContext';
import TofinoPic from '../assets/tofinopic.jpg';
import { BentoGridDemo , ProfileBento} from '../components/BentoGrid';
import {Bounce, BounceFade, FadeIn} from '../components/ui/animations.tsx';
import profilepic from '../assets/newprofilepic.jpg';
import {Card, CardTitle, CardHeader, CardContent, CardDescription } from '../components/ui/card.tsx';
import { Button, buttonVariants } from '../components/ui/button.tsx';


const Homepage = () => {
  const {user} = useUser();
  console.log('user is ', user);
  const cards = data.map((card, index) => (
    <AppleCard key={card.src} card={card} index={index} />
  ));
 



  return (
    
    <div className=' w-full h-full mb-3  flex flex-col'>

      <div 
        className="hero-image  relative h-screen rounded-2xl w-[100] -mx-8  -mt-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${TofinoPic})` }}>
        {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
        <div className="pt-48  relative z-5 flex flex-col items-center justify-center h-full text-center text-white px-4">

        {/* motion-opacity-in-[0%]  motion-blur-in-[5px] motion-duration-[0.35s]  motion-translate-y-in-[25%] motion-duration-[0.93s]/translate  */}
          <BounceFade>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 ">
              Hi, I'm Louise.
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl">
            Nurse by day, traveler by heart. Follow my journey as I explore the world and share my adventures!
            </p>
          </BounceFade>
        </div>
      </div>

      {/* 
      <div className='w-screen '>
        <img src={TofinoPic} alt="picture-in-tofino" />
        <div >
          <h1 className='motion-preset-fade' >Hi, I'm Louise</h1>
        </div>
      </div> */}
        <div className='flex flex-col mt-28 mb-20 w-full items-center justify-start '>
            <div className='w-full flex pl-40  text-left mb-10' >
              <Bounce>
                <h2 className=' ' >Recent Blogs</h2>
              </Bounce>
            </div>
          <FadeIn>
            <BentoGridDemo className='w-full  ' />
            <Button variant='default' className='ml-4 mt-8' >See All Blogs</Button>
          </FadeIn>
        </div>
      <div className="w-full h-[90] py-20 ">
        <Bounce>
          <h2 className="w-full pl-40">
          Destination Guides.
          </h2>
        </Bounce>
        <FadeIn>
          <Carousel items={cards} />
        </FadeIn>
      </div>
            <h2 className='mb-20 pl-40'>A Little About Me</h2>
     <div className='get-to-know-me-section side-card-profile flex  items-start justify-center  w-full gap-10 ' >
        <div className='main-bio flex flex-col items-center justify-center mx-0 w-[20%]'>
          <BounceFade>
          </BounceFade>
            <FadeIn className='items-center w-full flex flex-col'>
              <Card className='w-full items-center flex flex-col  rounded-3xl  h-[10%]  hover:scale-105 hover:translate-y-[-10px] transition-all duration-300 ease-out'>
                  <img src={profilepic} alt="" className='  object-cover rounded-t-3xl rounded-b-none ' />
                  <div className=" bottom-0 left-0   ">
          
                      <CardHeader>
                          <CardTitle>Hsdfsdfdsllo!</CardTitle>
                      </CardHeader>
                          <CardContent>At age 26, I quit my job to travel the world alone. I spent six fantastic months in Southeast Asia and turned my travel blog into a full-time business. 14 years later, I'm still traveling -- 88 countries and 7 continents -- and now living in Prague!</CardContent>
                  </div>
              </Card>
            </FadeIn>
        </div>
        <div className='right-side w-auto items-center justify-stretch  h-full flex flex-col gap-8  -mx-8 border-9'>
          <div className='column flex'>
            <Card className=' w-80 my-0 mx-8 h-80 rounded-3xl' >
              <h2>Hello</h2>
            </Card>
            <Card className=' w-80 my-0 mx-8 h-80 rounded-3xl' >
              <h2>Hello</h2>
            </Card>
          </div>
          <Card className=' w-[44rem] my-0 mx-0 h-80 rounded-3xl' >
            <h2>Hello</h2>
          </Card>
        </div>
        
      </div>
        
  </div>
  )
}
export default Homepage;



const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
 
const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
 
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];