'use server';

import React from 'react';
import {Card, CardHeader, CardContent, CardFooter, CardTitle} from '../components/ui/card';
import footerimage from '../public/footer.jpg'
import newprofilepic from '@/public/newprofilepic.jpg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import {Label} from '../components/ui/label'
import Image from 'next/image';
import { Avatar, AvatarImage } from './ui/avatar';



export async function Footer2 (){
  return (
    <div className="footer-container relative bg-black  items-center justify-center  py-32  ">
        
            <div className='flex flex-col justify-center items-center gap-28 md:flex-row md:justify-evenly '>
                <Card className='dark bg-transparent pt-14 flex-col gap-3 justify-center items-center w-96 h-full '>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={newprofilepic}
                            alt="Avatar"
                            className="w-28 h-28 rounded-full object-cover"
                            style={{ objectPosition: '85% 15%' }}
                            />
                    </div>
                    <div className='bg-transparent p-8  flex flex-col gap-3 items-start'>
                        <p className='text-white font-bold text-lg'>Louise Castillo</p>
                        <p className='text-white '>At age 26, I quit my job to travel the world alone. I spent six fantastic months in Southeast
                                Asia and turned my travel blog into a full-time business.
                                14 years later, I'm still traveling -- 88 countries and 7 continents -- and now living in Prague!</p>
                        <Button variant='outline' className='dark text-white'>Read more.</Button>
                    </div>
                </Card>
                <div className='newsletter'>
                    <div className='flex flex-col items-center  justify-center gap-4'>
                        <h3 className='mb-0 text-white font-bold' >Join My Newsletter</h3>
                            <p className='text-white'>I'll send you quick reads about various travel tips!</p>
                        <div className='flex flex-col items-start gap-4'>
                            <Input  className='w-72 text-white dark' type='text' placeholder='email@email.com'></Input>
                            <Button className='bg-transparent w-20 dark text-white' variant='outline' >Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
                
    </div>

        
  )
}
