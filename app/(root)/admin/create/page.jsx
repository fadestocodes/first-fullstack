'use client'
import {Button} from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import React, {useState, useEffect} from 'react'
import TinyMCE from '../../../../components/TinyMCE';
import {Card, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {createBlogFormSchema} from '@/lib/validation'
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { SubscribeButton } from '@/components/ui/SubscribeButton';
  import Image from 'next/image'



const AdminCreatePage =  () => {



    const router = useRouter();
    const session = useSession();

    const [ firstPage, setFirstPage ]  = useState(true);
    const [ inputs, setInputs ] = useState({
        title : '',
        category : '',
        coverPhoto : ''
        
    })


    const [errors, setErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    const [editorContent, setEditorContent] = useState('<p>Start writing your blog!</p>');

    useEffect(() => {
        if (!session || session?.data?.user?.role !== 'ADMIN') {
        router.push('/auth/error') 
        }
    }, [session, session.status, router]);

    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;
        const files = event.target.files;
        setInputs ((prevData)=>({
            ...prevData, 
            [name] : type === 'file' ? files[0] : value
    })  )
    }

    const nextPage = (event) => {
        event.preventDefault();
        const result = createBlogFormSchema.safeParse(inputs);
        if (!result.success){
            setErrors(result.error.errors)
        } else {
            setFirstPage( false);
        }
        
    }

    const backToSetup = (event) => {
        event.preventDefault();
        setErrors([]);
        setFirstPage(true);
    }


    const coverPhotoUpload = async (event) => {
        
        setImageLoading(true);
        

        console.log('its working');
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
        body : file
        })
        if (!uploadResponse.ok) {
            setImageLoading(false);
        throw new Error ('Image upload to S3 failed')
        }
        console.log('status from the PUT req', uploadResponse.status)
        setInputs((prevData)=>({
            ...prevData,
            coverPhoto : location
        }))
        setImageLoading(false);
        console.log(inputs);
    }


    const saveDraft = async () => {
        const user = session.data.user;

        console.log('handling submit');
        try {
            console.log(JSON.stringify(editorContent));
            const payload = {
                userId : user.id,
                content : editorContent,
                title : inputs.title,
                category : inputs.category,
                coverPhoto : inputs.coverPhoto
            }
            console.log('payload is ', payload)

            const submitResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/create-draft`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(payload)
            });
            if (!submitResponse.ok){
                throw new Error ('Error sending post request');
            }
            const submitData = await submitResponse.json();
            console.log('Submit Data is : ', submitData);
            router.push('/admin/drafts')

        } catch (err) {
            console.error('Error', err);
        }

    }

    const handleEditorChange = (content) =>  {
        setEditorContent(content);
    }



    const handleImageUpload = async (blobInfo) =>{
        const file = blobInfo.blob();
        const fileName = blobInfo.filename();
        const fileType = file.type;

        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/presigned-url`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({fileName, fileType})
            })
            if (!response.ok){
                throw new Error('Error generating presigned URL');
            }
            const data = await response.json();
            console.log('Data is : ', data);
            const {url, location} = data;

            const uploadResponse = await fetch (url, {
                method : 'PUT',
                headers : {
                    'Content-Type' : fileType,
                    // "Host": "fadestoblogsite.s3.us-east-2.amazonaws.com"
                },
                body : file
            });
            if (!uploadResponse.ok){
                throw new Error ('Error uploading to S3');
            }
        
            console.log('editor content is : ', editorContent);
        return location;

            

                
        } catch (err) {
            console.error('Failure getting url', err);
        } 

    }

        const publishPost = async () => {
            const user = session.data.user;

            console.log('handling submit');
            try {
                console.log(JSON.stringify(editorContent));
                const payload = {
                    userId : user.id,
                    content : editorContent,
                    title : inputs.title,
                    category : inputs.category,
                    coverPhoto : inputs.coverPhoto,
                }
                console.log('payload is ', payload)

                const submitResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/publish`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                });
                if (!submitResponse.ok){
                    throw new Error ('Error sending post request');
                }
                const submitData = await submitResponse.json();
                console.log('Submit Data is : ', submitData);
                router.push('/blog')

            } catch (err) {
                console.error('Error', err);
            }
    }
        return (
            <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col  w-[90%] md:w-[60%] mb-8 -mt-8'>
                            <div className="flex justify-between mt-12">
                            <Button variant="outline" size="icon" className={`w-auto px-3 ${firstPage && 'pointer-events-none bg-zinc-50 text-gray-400'  }  `} onClick={firstPage ? null : backToSetup}><ChevronLeft />Back</Button>
                            <Dialog>
                            <DialogTrigger className={`size-lg bg-black rounded-md text-sm text-white px-4 py-2 ${firstPage && 'hidden bg-zinc-50 text-gray-400 transition-none pointer-events-none  cursor-default' } `}>Save Post</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Save your work as a draft or publish live!</DialogTitle>
                                
                                </DialogHeader>
                                <div className='flex justify-center items-center gap-5'>
                                    <Button variant='outline' onClick={saveDraft}>Save as Draft</Button>
                                    <SubscribeButton onClick={publishPost} className='rounded-lg' text='Publish Post'></SubscribeButton>
                                </div>
                            </DialogContent>
                            </Dialog>
                            

                            <Button variant="outline" size="icon" onClick={nextPage} className={`w-auto px-3 ${!firstPage && 'pointer-events-none bg-zine-50 text-gray-400'}  `}  >Next<ChevronRight /></Button>
                            </div>
                        </div>
                { firstPage ? (
                    <div className='w-[90%] md:w-[60%]'>

                        <form action="" className=''>
                            <Card className='flex flex-col justify-center items-center px-20 py-10 gap-8 '>
                                    <CardTitle className=' font-semibold text-2xl '>Post Details</CardTitle>
                                <div className='flex flex-col  w-full' >
                                    <Label htmlFor="" className='font-medium  mb-4'>Enter Post Title*</Label>
                                    <Input type="text" className='w-full' name='title' value={inputs.title}  onChange={handleChange}/>
                                    { errors.find((error)=> error.path.includes('title')) && <span className='text-red-400'>{errors.find((error)=>error.path.includes('title'))?.message}</span> }
                                </div>
                            
                                <div className='flex flex-col items-center w-[50%] self-start' >
                                    <Select name='category' value={inputs.category}  onValueChange = {(value) => setInputs({...inputs, category:value})}>
                                        <Label htmlFor="" className='font-medium  mb-4 text-left self-start'>Select a Category*</Label>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectItem value="destination-guide">Destination Guide</SelectItem>
                                            <SelectItem value="travel-tips">Travel Tips</SelectItem>
                                            <SelectItem value="food">Food</SelectItem>
                                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                            <SelectItem value="misc">Misc</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                        { errors.find((error)=> error.path.includes('category')) && <span className='text-red-400 self-start'>{errors.find((error)=>error.path.includes('category'))?.message}</span> }
                                        </Select>
                                </div>
                                <div className='flex flex-col  w-full' >
                                    <Label htmlFor="" className='font-medium  mb-4'>Upload Cover Photo*</Label>

                                    <Input className=' mb-8 cursor-pointer w-[25%]' type='file'  name='coverPhoto' accept='image/*' onChange={coverPhotoUpload} ></Input>
                                    { inputs.coverPhoto ?  (
                                        <Image
                                        src={inputs.coverPhoto}
                                        alt="User entered cover photo for blog"
                                        layout="responsive"
                                        width={100} 
                                        height={100} />
                                    ) : imageLoading && (
                                        <Card className='flex flex-col self-center justify-center items-center w-[150px] h-[150px]'>
                                            <div className='spinner'></div>
                                        </Card>
                                    )  }
                                    { errors.find((error)=> error.path.includes('coverPhoto')) && <span className='text-red-400'>{errors.find((error)=>error.path.includes('coverPhoto'))?.message}</span> }

                                </div>
                            </Card>
                        </form>
                    </div>
                ) : (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <div className='w-full px-8'>
                                <TinyMCE value={editorContent} onEditorChange={handleEditorChange} images_upload_handler={handleImageUpload}></TinyMCE>
                            </div>
                        </div>

                )}
            </div>        

    )
}
export default AdminCreatePage