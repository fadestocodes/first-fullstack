'use client'

import React, { useEffect, useState } from 'react'
import {Toggle} from '@/components/ui/toggle'
import {PlacesAutocomplete} from '@/components/PlacesAutocomplete'
import Masonry from "react-masonry-css";
import {Card, CardContent, CardHeader, CardFooter} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"
import {  Maximize2, Minimize2, Heart } from 'lucide-react';
import {Textarea} from '@/components/ui/textarea'
import { useSession } from 'next-auth/react';
import {Input} from '@/components/ui/input'
import { Send, MapPinCheck, Pin } from 'lucide-react';
import {Label} from '@/components/ui/label'
import SignInButtons from '@/components/SignInButtons'
import {dateFormat} from '@/lib/dateFormat'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { BounceFade } from "@/components/ui/animations";
// import heic2any from "heic2any";
import dynamic from 'next/dynamic';

const DynamicHeic2Any = dynamic(() => import('heic2any'), { ssr: false }); // Dynamically import 'heic2any' (client-side only)


const PostcardsPage = () => {



    const breakpointColumnsObj = {
        default: 5,
        1280: 4,
        1100: 3,
        768: 2,
    };

    const session = useSession();
    const [viewDetails, setViewDetails] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedToggle, setSelectedToggle] = useState('horizontal');
    const [imageLoading, setImageLoading] = useState(false);
    const [createMenu, setCreateMenu] = useState(false);
    const [ selectedPlace, setSelectedPlace ] = useState('');
    const [inputs, setInputs] = useState({
        caption : '',
        comment : '',
        picture : ''
    })
    const [errors, setErrors] = useState({});
    const [allPostcards, setAllPostcards] = useState([]);
    // const [allPostcardComments, setAllPostcardComments] = useState([]);
    const [commentModal, setCommentModal] = useState(false);

    useEffect(()=>{
        const getAllPostcards = async () => {
            try {
                const allPostcardsRes = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/get-all`);
                const allPostcardsData = await allPostcardsRes.json();
                console.log('all postcards', allPostcards);
                setAllPostcards(allPostcardsData);
            } catch (err) {
                console.log('error fetching postcards', err);
            }
        }
        getAllPostcards();

        // getPostcardComments();
        console.log('all postcards from usefffect', allPostcards)
    }, [])
    

    const createPostcard = async () => {
        const newErrors = {};
        // Validation Rules
        if (!inputs.picture) {
            newErrors.picture="Please upload an image.";
        }
        if (!selectedPlace || !selectedPlace.name || !selectedPlace.country) {
            newErrors.location="Please select a location.";
        }
        if (!inputs.caption.trim()) {
            newErrors.caption="Caption cannot be empty.";
        } else if (inputs.caption.length > 300) {
            newErrors.caption="Caption must be under 300 characters.";
        }

        // Set Errors and Prevent API Call if Invalid
        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return
        }
        // Clear previous errors
        setErrors({});

        const data = {
            picture : inputs.picture,
            location : selectedPlace.name,
            country : selectedPlace.country ,
            countryCode : selectedPlace.countryCode,
            emoji : selectedPlace.emoji,
            userId : session?.data?.user?.id,
            caption : inputs.caption,
        }
        console.log('data to create is ', data);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/create`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        const postcard = await response.json()
        console.log('postcard is ', postcard);
        setCreateMenu(false);
        // router.push('/postcards')
        window.location.href='/postcards';
    }

   

    const closeDrawer  =() => {
        setViewDetails(false);
        setSelectedPost(null);
        setInputs(prevData => ({
            ...prevData,
            comment : ''
        }))
    }


    const openDrawer = (id) => {
        // const postcardId = id;
        setSelectedPost(allPostcards.find(post=>post.id===id));
        console.log('all carsd from openDrawer', allPostcards);
        setViewDetails(true)
        console.log('selected post ',selectedPost);

    }

    const photoUpload = async (event) => {
        setImageLoading(true);
        let file = event.target.files[0];
        console.log('file is ',file);

        // Convert HEIC to JPG if necessary
        if (file.type === "image/heic") {
            const heic2any = await DynamicHeic2Any
            try {
                const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });
                file = new File([convertedBlob], `${file.name.split('.')[0]}.jpg`, { type: "image/jpeg" });
                console.log('file after converting', file);
            } catch (error) {
                console.error("HEIC conversion failed:", error);
                setImageLoading(false);
                return;
            }
        }

        const requestCall = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presigned-url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
            }),
        });

        const { url, location } = await requestCall.json();
        console.log('url is', url)
        console.log('location is', location)
        const uploadResponse = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!uploadResponse.ok) {
            setImageLoading(false);
            throw new Error("Image upload to S3 failed");
        }

        setInputs((prevData) => ({
            ...prevData,
            picture: location,
        }));

        setImageLoading(false);
    };

    


    const handlePlaceSelect = (place) => {
        setSelectedPlace(place)
        console.log('from the parent the palce is ', place)
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;
        const files = event.target.files;
        setInputs((prevData)=>({
            ...prevData,
            [name] : type === 'file' ? files[0] : value
        }))
    }

    const postComment = async () => {
        setCommentModal(true);
        console.log('clicked');
        if (!session.data) return
        const data = {
            content : inputs.comment,
            userId : session?.data?.user?.id,
            parentCommentId : inputs.parentId || null,
            postcardId : selectedPost.id,
            recipientUserId : selectedPost.userId,
            name : session?.data?.user?.name
        }
        console.log('data is ', data);
        const newCommentData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/comments`, {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        })
        const newComment = await newCommentData.json();
        console.log('the newComment added is ', newComment );
        setSelectedPost(prevPost => ({
            ...prevPost,
            comments : [...prevPost.comments, newComment]
        }));
        setInputs(prevInputs => ({
            ...prevInputs,
            comment : ''
        }))
            window.location.href='/postcards';

    }


    const handleLike = async (selectedPost) => {
        if (!session?.data?.user){
            setCommentModal(true)
            return
        } else {

            try {
                console.log('selectedPost is ', selectedPost);
                const postcardId = selectedPost.id
                console.log('postcardID is ', postcardId)
                const payload = {
                    postcardId,
                    recipientUserId : selectedPost.userId,
                    senderUserId : session.data.user.id,
                    name : session.data.user.name,
                    emoji : selectedPost.emoji,
                    location : selectedPost.location,
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/likes`, {
                    method : 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                })
                console.log('response is', response);
                window.location.reload();
            } catch(err) {
                console.log('eror was ', err.message)
            }
        }
    }

    const handleBeenThere = async (selectedPost) => {
        if (!session?.data?.user){
            setCommentModal(true)
            return
        } else {
            try {
                console.log('selectedPost is ', selectedPost);
                const postcardId = selectedPost.id
                console.log('postcardID is ', postcardId)
                const payload = {
                    postcardId,
                    recipientUserId : selectedPost.userId,
                    senderUserId : session.data.user.id,
                    name : session.data.user.name,
                    emoji : selectedPost.emoji,
                    location : selectedPost.location
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/been-there`, {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                })
                const responseData = await response.json()
                console.log('response is', responseData);
                window.location.reload();
            } catch(err) {
                console.log('eror was ', err.message)
            }
        }
    }

    const handleWantToGo = async (selectedPost) => {
        if (!session?.data?.user){
            setCommentModal(true)
            return
        } else {
            try {
                console.log('selectedPost is ', selectedPost);
                const postcardId = selectedPost.id
                console.log('postcardID is ', postcardId)
                const payload = {
                    postcardId,
                    recipientUserId : selectedPost.userId,
                    senderUserId : session.data.user.id,
                    name : session.data.user.name,
                    emoji : selectedPost.emoji,
                    location : selectedPost.location
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/want-to-go`, {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                })
                console.log('response is', response);
                window.location.reload();
            } catch(err) {
                console.log('eror was ', err.message)
            }
        }
    }

  return (
    <div className="py-8 lg:px-8  bigscreen:px-80 flex flex-col gap-3">
            <BounceFade>
                <div className='flex flex-col justify-center items-center gap-4 lg:my-4'>
                    <h1>Postcards</h1>
                    <h4 className='!my-0 text-center !leading-6'>Digital postcards from the community.</h4>
                </div>
            </BounceFade>
            <div className="flex flex-col  justify-center items-center gap-4  mb-10">
                { !createMenu && (  <Button  className='w-40' onClick={()=>setCreateMenu(true)} ><Send />Send a Postcard</Button> ) }
                    { createMenu && !session?.data?.user ? (
                        <div className='login-modal px-20 bg-black bg-opacity-50 z-30 fixed w-full h-full inset-0 flex flex-col justify-center items-center' onClick={()=>setCreateMenu(false)}>
                            <div onClick={(e) => e.stopPropagation()}>
                                <SignInButtons className='' ></SignInButtons>
                            </div>
                        </div>
                    ) :  createMenu && (
                        <Card className='py-8 px-6'>
                            <CardHeader className=''><h3 className='mt-0 leading-6'>Create Your Postcard!</h3><p className='text-sm text-gray-700'>Enter details for your postcard</p></CardHeader>
                            <CardContent className='relative'>
                            <div className='flex flex-col justify-start items-start gap-4 w-full '>
                                { errors?.picture && <p className='text-red-600 text-sm'>{errors.picture}</p>  }
                                <div>
                                    <Label>Upload image</Label>
                                    <p className="text-xs !mt-0 mb-3">( iPhone "Live" images may not be supported )</p>
                                <Input className=' cursor-pointer ' type='file'  name='picture' accept='image/*,.heic' onChange={photoUpload} />
                                </div>

                                { imageLoading ? (
                                <Card className='flex flex-col self-center justify-center items-center w-[50px] h-[50px]'>
                                    <div className='spinner'></div>
                                </Card>
                                ) :  inputs.picture ? (
                                <img className='w-[100px] h-[100px] self-center object-cover mb-8' src={inputs.picture} alt='User posted cover photo' ></img>
                                ) : (<div></div>) }
                                <div className="flex flex-col items-start gap-6 w-full">
                                    <div className="flex flex-col gap-2">
                                        { errors?.location && <p className='text-red-600 text-sm'>{errors.location}</p>  }
                                        <Label>👋 Saying hi from: </Label>
                                        <PlacesAutocomplete onSelect={handlePlaceSelect} className=''/>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        { errors?.caption && <p className='text-red-600 text-sm'>{errors.caption}</p>  }
                                        <Label>Caption:</Label>
                                        <Textarea name='caption' onChange={handleChange} value={inputs.caption} className='resize-none h-28' ></Textarea>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                                <CardFooter className="flex flex-col justify-center items-center w-full gap-3">
                                    <Button className='w-40' variant='outline' onClick={()=>setCreateMenu(false)}>Cancel</Button>
                                    <Button  className='w-40' onClick={createPostcard} ><Send />Send a Postcard</Button>
                                </CardFooter>
                    </Card>
                    ) }
                   
            </div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex -ml-3 w-auto"
                    columnClassName="pl-3 bg-clip-padding"
                    >
                    {allPostcards.map((post) => (
                        <div key={post.id} className="mb-6 cursor-pointer hover-effect overflow-hidden relative rounded-md" onClick={()=>openDrawer(post.id)} >
                            <img
                                src={post.picture}
                                alt='digital postcards from users'
                                className="rounded-md hover-effect cursor-pointer overflow-hidden "
                                // layout="responsive"
                                // objectFit="cover"
                            />
                             <div
                                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"
                                ></div>
                            <p className="text-left break-words text-wrap  text-xs md:text-base !my-0 absolute bottom-3 left-3 text-white px-2">👋 from {post.location}  {post.emoji}</p>
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
                        <DrawerContent className='h-[97vh] '>
                        <DrawerHeader className='overflow-scroll  gap-4  '>
                            <div className="mx-auto my-2 h-2 w-[100px] bg-black rounded-full bg-opacity-30"  />
                            <img
                                src={selectedPost.picture}
                                alt='digit postcard from users'
                                className={`rounded-md m-0 w-full   ${ selectedToggle === 'vertical' ? 'h-[65vh]  object-cover lg:h-full lg:px-32 lg:object-contain ' : 'h-[50vh] object-contain '}  `}
                                />
                                <div className='flex justify-center gap-3 my-3'>
                                    <Toggle data-state={selectedToggle === 'horizontal' ? 'on' : 'off'} onClick={()=>setSelectedToggle('horizontal')}>
                                        <Minimize2 />
                                    </Toggle>
                                    <Toggle data-state={selectedToggle === 'vertical' ? 'on' : 'off'} onClick={()=>setSelectedToggle('vertical')} >
                                        <Maximize2  />
                                    </Toggle>
                                </div>
                            <div className="flex flex-col justify-center items-center gap-4">
                                <DrawerDescription className='text-base !mt-2 p-0'>{selectedPost.caption}</DrawerDescription>
                                <DrawerTitle className='!mt-4  !mb-0 p-0'>👋 from {selectedPost.location} {selectedPost.emoji}</DrawerTitle>
                               
                                <div className="flex justify-start gap-3 items-center ">
                                    <Avatar className='size-8 my-4 '>
                                    { selectedPost.user.picture ? (
                                        <AvatarImage className=' object-cover' src={`${process.env.NEXT_PUBLIC_API_URL}/api/proxy-image?url=${encodeURIComponent(selectedPost.user.picture)}`}></AvatarImage>
                                    ) : (
                                        <AvatarFallback >{selectedPost.user.name.charAt(0).toUpperCase()}</AvatarFallback >
                                    ) }
                                    </Avatar>
                                    <div className="flex flex-col justify-start items-start gap-0">
                                        <p className='!my-2 text-sm !leading-[0] p-0 font-bold '>Posted by {selectedPost.user.name}</p>
                                        <p className='text-xs !my-2 p-0 !leading-[0] '>{dateFormat(selectedPost.createdAt)}</p>

                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-start gap-2 lg:flex-row lg:items-center lg:gap-8' >
                                    <div className='flex justify-center items-center gap-2'>
                                        <Button variant='outline' className='px-2 h-7' onClick={()=>handleLike(selectedPost)}>
                                            <Heart className='!m-0 !p-0' />
                                        </Button><p className='text-sm !my-0'>{selectedPost.likes !== 0 ?  selectedPost.likes : ''  }</p>
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        <Button variant='outline' className='px-2 h-7' onClick={()=>handleBeenThere(selectedPost)}>
                                            <MapPinCheck className='!m-0 !p-0' /> Been there
                                        </Button><p className='text-sm !my-0'>{selectedPost.beenThere > 1 ?  `${selectedPost.beenThere} people have been there`  : ''  }</p>
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        <Button variant='outline' className='px-2 h-7' onClick={()=>handleWantToGo(selectedPost)}>
                                            <Pin  className='!m-0 !p-0' /> Want to go there
                                        </Button><p className='text-sm !my-0'>{selectedPost.wantToGo > 1 ?  `${selectedPost.wantToGo} people want to go` : ''  }</p>
                                    </div>
                                </div>
                                    <hr className='w-[70%] mb-4' />
                                { selectedPost.comments && (
                                    selectedPost.comments.map((comment,index)=>(
                                        <div key={comment.id || index} className='comments flex justify-start w-full px-10 md:px-32 items-start gap-3'>
                                            <Avatar className='size-8'>
                                                <AvatarImage className='object-cover' src={`${process.env.NEXT_PUBLIC_API_URL}/api/proxy-image?url=${encodeURIComponent(comment.users.picture)}` }/>
                                                    <AvatarFallback>{comment.users.name.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col justify-center items-start'>
                                                <p className='text-sm !my-2 font-bold !leading-[0]'>{comment?.users?.name}</p>
                                                <p className='text-xs !my-2 !leading-[0]'>{dateFormat(comment?.created)}</p>
                                                <p className='!my-2'>{comment?.content}</p>
                                                <Button variant='outline' className='text-xs w-12 h-7 p-3'>Reply</Button>
                                            </div>
                                        </div>

                                    ))
                                ) }

                                <Textarea className='resize-none  m-0 md:w-[40rem]' rows='3' name='comment' onChange={handleChange} value={inputs.comment}/> 
                                <Button onClick={postComment}>Post Comment</Button>
                                { commentModal &&  !session?.data?.user && (
                                     <div className='login-modal px-20 bg-black bg-opacity-50 z-30 fixed w-full h-full inset-0 flex flex-col justify-center items-center' onClick={()=>setCommentModal(false)}>
                                     <div onClick={(e) => e.stopPropagation()}>
                                         <SignInButtons className='' ></SignInButtons>
                                     </div>
                                 </div>
                                ) }
                               
                            </div>
                        </DrawerHeader>
                        <DrawerFooter className='flex justify-center items-center'>
                            <DrawerClose className=''>
                                <Card className='w-20 py-1  rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-sm'>Close</Card>
                            </DrawerClose>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
               

                ) }
        </div>
    );
}

export default PostcardsPage


