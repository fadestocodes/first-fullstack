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
import {  Maximize2, Minimize2 } from 'lucide-react';
import {Textarea} from '@/components/ui/textarea'
import { useSession } from 'next-auth/react';
import {Input} from '@/components/ui/input'
import { Send } from 'lucide-react';
import {Label} from '@/components/ui/label'
import SignInButtons from '@/components/SignInButtons'
import {dateFormat} from '@/lib/dateFormat'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { BounceFade } from "@/components/ui/animations";
// import heic2any from "heic2any";


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
    const [selectedToggle, setSelectedToggle] = useState('vertical');
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


    // const getPostcardComments = async () => {
    //     try {
    //         const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postcards/comments`);
    //         const allPostcardCommentsRes = await data.json();
    //         setAllPostcardComments(allPostcardCommentsRes);
    //         console.log('all postcard comments', allPostcardComments);
    //     } catch (err ) {
    //         console.log("couldn't fetch postcard comments", err);
    //     }
    // }
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

    // useEffect(()=>{
    //     getPostcardComments();
    // }, [ selectedPost ])

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

    }

    const photoUpload = async (event) => {
        setImageLoading(true);
        const file = event.target.files[0];
        const requestCall = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presigned-url`, {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                fileName : file.name,
                fileType : file.type
            })
        })

        const {url, location} = await requestCall.json();
        console.log('Location is : ', location);
        const uploadResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : file.type
            },
            body : file
        })
        if (!uploadResponse.ok) {
            setImageLoading(false);
        throw new Error ('Image upload to S3 failed')
        }
        console.log('status from the PUT req', uploadResponse.status)
        setInputs(prevData=>({
            ...prevData,
            picture : location
        }))
        setImageLoading(false);
        console.log('url is ', url);
    }
    
    
    // const photoUpload = async (event) => {
    //     setImageLoading(true);
    //     const file = event.target.files[0];
        
    //     // This section will handle HEIC file conversion to JPEG
    //     let fileToUpload = file;  // By default, use the original file
    //     let fileName = file.name;
        
    //     if (file.type === 'image/heic') {
    //         try {
    //             const fileBlob = file;  // The file itself is already a Blob
                
    //             // Convert HEIC to JPEG using heic2any
    //             const conversionResult = await heic2any({
    //                 blob: fileBlob,
    //                 toType: 'image/jpeg',  // Convert to JPEG
    //             });
                
    //             // `conversionResult` is a Blob containing the converted image
    //             // Use it as the file to upload
    //             fileToUpload = conversionResult;
    //             fileName = fileName.replace(/\.heic$/, '.jpg');  // Rename the file to .jpg for S3
    //         } catch (error) {
    //             console.error('Error converting HEIC file:', error);
    //             setImageLoading(false);
    //             return;  // Exit early if conversion fails
    //         }
    //     }
    
    //     // Step 1: Request the presigned URL for uploading
    //     const requestCall = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presigned-url`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             fileName: fileName,
    //             fileType: fileToUpload.type  // Use the converted type (image/jpeg for HEIC)
    //         })
    //     });
    
    //     const { url, location } = await requestCall.json();
    //     console.log('Location is : ', location);
    
    //     // Step 2: Upload the file (or the converted file) to S3 using the presigned URL
    //     const uploadResponse = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': fileToUpload.type,  // Use the file type for PUT
    //         },
    //         body: fileToUpload  // Upload the file or converted file
    //     });
    
    //     if (!uploadResponse.ok) {
    //         setImageLoading(false);
    //         throw new Error('Image upload to S3 failed');
    //     }
        
    //     console.log('status from the PUT request', uploadResponse.status);
    //     setInputs(prevData => ({
    //         ...prevData,
    //         picture: location  // Save the URL of the uploaded image
    //     }));
    //     setImageLoading(false);
    //     console.log('Uploaded file URL is ', location);
    // };
    


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
            postcardId : selectedPost.id
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
                                <Input className=' cursor-pointer ' type='file'  name='picture' accept='image/*,.heic' onChange={photoUpload} />
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
                            <p className="text-left text-xs md:text-base !my-0 absolute bottom-3 left-3 text-white px-2">👋 from {post.location}  {post.emoji}</p>
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
                                    <Toggle data-state={selectedToggle === 'vertical' ? 'on' : 'off'} onClick={()=>setSelectedToggle('vertical')} >
                                        <Maximize2  />
                                    </Toggle>
                                    <Toggle data-state={selectedToggle === 'horizontal' ? 'on' : 'off'} onClick={()=>setSelectedToggle('horizontal')}>
                                        <Minimize2 />
                                    </Toggle>
                                </div>
                            <div className="flex flex-col justify-center items-center gap-8">
                                <DrawerDescription className='text-base !mt-2 p-0'>{selectedPost.caption}</DrawerDescription>
                                <DrawerTitle className='!mt-4 !leading-[0] !mb-0 p-0'>👋 from {selectedPost.location} {selectedPost.emoji}</DrawerTitle>
                               
                                <div className="flex justify-start gap-3 items-center mb-4">
                                    <Avatar className='size-6' >
                                        <AvatarImage className='justify-center items-center'  src={ `${process.env.NEXT_PUBLIC_API_URL}/api/proxy-image?url=${encodeURIComponent(selectedPost.user.picture)}` }/>
                                    </Avatar>   
                                    <div className="flex flex-col justify-start items-start gap-0">
                                        <p className='!my-2 text-sm !leading-[0] p-0 font-bold '>Posted by {selectedPost.user.name}</p>
                                        <p className='text-xs !my-2 p-0 !leading-[0] '>{dateFormat(selectedPost.createdAt)}</p>

                                    </div>

                                </div>
                                    <hr className='w-[70%] mb-4' />
                                { selectedPost.comments && (
                                    selectedPost.comments.map((comment,index)=>(
                                        <div key={comment.id || index} className='comments flex justify-start w-full px-10 md:px-32 items-start gap-3'>
                                            <Avatar>
                                                <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/api/proxy-image?url=${encodeURIComponent(comment.users.picture)}` }/>
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


