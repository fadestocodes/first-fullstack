import React from 'react';
import {Card, CardHeader, CardContent, CardTitle} from '../components/ui/card';
import footerimage from '../assets/footerimage.jpg'
import { Input } from './ui/input'
import { Button } from './ui/button';
import {Label} from './ui/label'

const Footer = () => {
  return (
        <div className='footerContainer mt-32 mb-3 px-3   h-96 w-full'>
            <Card className='footer  w-full mb-0 h-full  rounded-2xl  bg-cover bg-center text-white justify-end flex flex-col items-center gap-20  '  style={{backgroundImage: `url(${footerimage})`}}   >

                <div className='flex items-center justify-center gap-32'>
                    <div className='flex flex-col items-start justify-center '>
                        <p className='font-bold '>Latest Posts</p>
                        <p className='leading-3' >A Honemyoon in Italy</p>
                        <p>A Honemyoon in Italy</p> 
                    </div>
                    <div className='flex flex-col'>
                    <p className='font-bold '>Latest Posts</p>
                        <p className='leading-3' >A Honemyoon in Italy</p>
                        <p>A Honemyoon in Italy</p> 
                    </div>
                    <div className='flex flex-col items-center center justify-center gap-4'>
                        <h3 className='mb-0' >Join My Newsletter</h3>
                        <p>I'll send you quick reads about various travel tips!</p>
                
                        <Input  className='w-[70%]' type='text' placeholder='email@email.com'></Input>
                        <Button className='bg-transparent w-20' variant='outline' >Submit</Button>
                    </div>
                </div>
                    <div className='bottom-section  opacity-70 '>
                        <p>All rights reserved</p>
                    </div>
            </Card>
        </div>
  )
}

export default Footer