'use server';

import React from 'react';
import newprofilepic from '@/public/newprofilepic.jpg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {  Plane } from 'lucide-react';



export async function Footer2 (){
  return (
    <div className="footer-container relative bg-myNude   items-center justify-center  pt-32 flex flex-col  ">
        
            <div className='flex flex-col justify-center items-center gap-28 md:flex-row md:justify-evenly '>
                <div className= ' border-0  bg-transparent pt-14 flex-col gap-3 justify-center items-center w-72 h-full '>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={newprofilepic}
                            alt="Avatar"
                            className="w-28 h-28 rounded-full object-cover"
                            style={{ objectPosition: '85% 15%' }}
                            />
                    </div>
                    <div className=' p-8  flex flex-col gap-3 items-start'>
                        <p className='text-slate-800 font-bold text-lg'>Louise Castillo</p>
                        <p className='text-slate-800 '>At age 26, I quit my job to travel the world alone. I spent six fantastic months in Southeast
                                Asia and turned my travel blog into a full-time business.
                                14 years later, I&apos;m still traveling -- 88 countries and 7 continents -- and now living in Prague!</p>
                        <Button  variant='outline' className='bg-transparent dark text-slate-800'>Read more.</Button>
                    </div>
                </div>
                <div className='newsletter px-10'>
                    <div className='flex flex-col items-center  justify-center gap-0    '>
                        <h3 className=' text-slate-800 font-bold' >Join My Newsletter</h3>
                            <p className='text-slate-800 mb-6   '>I&apos;ll send you quick reads about various travel tips!</p>
                        <div className='flex flex-col items-start gap-4'>
                            <Input  className='w-72 dark text-slate-800 ' type='text' placeholder='email@email.com'></Input>
                            <Button variant='outline' className=' dark w-20 bg-transparent  '  >Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center relative">
                <div className=' bottom-8 justify-center w-full flex gap-2 items-center mt-36 mb-4'>
                    <p className='text-slate-800 text-xs !my-0'>Next trip: New Mexico</p>
                </div>
                    <div className="w-12 h-6 bottom-4 absolute text-slate-800 rounded-full flex items-center justify-center  animate-takeoffFlyLand">
                        <Plane color='white'  />
                    </div>


            </div>
    </div>

        
  )
}
