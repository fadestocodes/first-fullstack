'use client'

import React, { useState } from 'react'
import {Toggle} from '@/components/ui/toggle'
import {PlacesAutocomplete} from '@/components/PlacesAutocomplete'
import Masonry from "react-masonry-css";
import biggie from '@/public/biggie.jpg'
import japanColorful from '@/public/japan-colorful.jpg'
import japanStreet from '@/public/japan-street.jpg'
import japanGarden from '@/public/japan-garden.jpg'
import street from '@/public/street.jpg'
import ireland1 from '@/public/ireland1.jpg'
import sunset from '@/public/sunset.jpg'
import moherCliffs from '@/public/mohercliffs.jpg'
import tofino from '@/public/tofino.png'
import tofinopic from '@/public/tofinopic.jpg'
import Image from 'next/image'
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import CommentsDrawer from '@/components/CommentsDrawer';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { RectangleHorizontal, RectangleVertical } from 'lucide-react';



const PostcardsPage = () => {

    const pictures = [japanColorful, japanGarden, japanStreet, biggie, street, ireland1, sunset, moherCliffs, tofino, tofinopic];
    const breakpointColumnsObj = {
        default: 5,
        1280: 4,
        1100: 3,
        768: 2,
       
    };

    const [viewDetails, setViewDetails] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedToggle, setSelectedToggle] = useState('vertical');
    

    const seeDetails = (index) => {
        setViewDetails(true);
        const postcard = pictures[index];
        setSelectedImage(postcard);

    }

    const closeDrawer  =() => {
        setViewDetails(false);
        setSelectedImage(null);
    }

    const openDrawer = (index) => {
        setSelectedImage(pictures[index]);
        setViewDetails(true)
    }

  return (
    <div className="p-8 bigscreen:px-80 flex flex-col gap-8">
            <div>
                <h1>Postcards</h1>
                <h4>Digital postcards from the community</h4>
            </div>
            <div className='w-auto'>
                <PlacesAutocomplete className=''/>
            </div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-3 w-auto"
                columnClassName="pl-3 bg-clip-padding"
            >
                {pictures.map((picture, index) => (
                    <div key={index} className="mb-6 cursor-pointer hover-effect  relative rounded-md" onClick={()=>openDrawer(index)} >
                        <Image
                            src={picture}
                            alt='digital postcards from users'
                            className="rounded-md hover-effect cursor-pointer overflow-hidden "
                            layout="responsive"
                            objectFit="cover"
                        />
                         <div
                            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"
                            ></div>
                        <p className="text-left mt-0 absolute bottom-3 left-3 text-white p-2">👋 from Tokyo, Japan 🇯🇵</p>

                    </div>
                ))}
            </Masonry>
                {/* { viewDetails && (
                    <div  className='detailed-view z-40 bg-black bg-opacity-50 inset-0 fixed flex flex-col justify-center items-center' >
                        <div className='rounded-md border-0 shadow-none w-[90%] flex flex-col justify-center items-center cursor-pointer' onClick={()=>setViewDetails(false)}>
                        <Image
                    src={selectedImage}
                    className="rounded-md m-0 "
                    objectFit='cover'
                />
                        <Button  variant='outline'>See comments</Button>
                        </div>
                        <CommentsDrawer></CommentsDrawer>
                    </div>
                ) } */}

                { viewDetails && (
                    <Drawer open={viewDetails}  onOpenChange={closeDrawer} className='' >
                        {/* <DrawerTrigger>See comments</DrawerTrigger> */}
                        <DrawerContent className='h-[95vh] '>
                        <DrawerHeader className='overflow-scroll  gap-4  '>
                            <div className="mx-auto my-2 h-2 w-[100px] bg-black rounded-full bg-opacity-30"  />
                            <Image
                                src={selectedImage}
                                alt='digit postcard from users'
                                className={`rounded-md m-0 w-full   ${ selectedToggle === 'vertical' ? 'h-[70vh]  object-cover ' : 'h-[50vh] object-contain '}  `}
                                />
                                <div className='flex justify-center gap-3'>
                                    <Toggle data-state={selectedToggle === 'vertical' ? 'on' : 'off'} onClick={()=>setSelectedToggle('vertical')} >
                                        <RectangleVertical className={`bg-muted  ${selectedToggle === 'vertical' ? 'bg-accent text-accent-foreground' : ''}`}/>
                                    </Toggle>
                                    <Toggle data-state={selectedToggle === 'horizontal' ? 'on' : 'off'} onClick={()=>setSelectedToggle('horizontal')}>
                                        <RectangleHorizontal className={`bg-muted ${selectedToggle === 'vertical' ? 'bg-accent text-accent-foreground' : ''}`}/>
                                    </Toggle>
                                </div>
                            <DrawerTitle>👋 from Tokyo, Japan 🇯🇵</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                        <Button variant="primary">Close</Button>
                        </DrawerClose>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
               

                ) }
        </div>
    );
}

export default PostcardsPage