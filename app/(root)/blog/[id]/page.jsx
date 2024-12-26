import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {dateFormat} from '@/lib/dateFormat'
import  BlogComments from '@/components/BlogComments'
import {BounceFade } from "@/components/ui/animations";


const BlogDetails = async ( {params} ) => {



    const {id} = await params;
    const postId = id;
    console.log('post id is ', postId);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get-single`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({postId})
    });
    const post = await res.json();
    console.log('post is ', post);


    // const allCommentsRes = await fetch(`http:localhost:3000/api/post/comments/get-all/${postId}`)
    // console.log('all comments res', allCommentsRes);
    // const commentsList = await allCommentsRes.json();
    // console.log('all comments', commentsList);
  

    

  
    return (
        <div className='main-container flex flex-col gap-8'>
             
            <div className='w-full relative'>
                <img src={post.coverPhoto} alt="Blog cover photo" className=' h-[32rem] w-full object-cover lg:h-[34rem]  2xl:h-[40rem] bigscreen:h-[56rem]'/>
                <div className="absolute inset-0 bg-black opacity-0"></div>
            </div>
            <div className='flex flex-col sm:px-12  lg:px-40   2xl:px-[22rem] bigscreen:px-[32rem] '>
                <div className='title-author self-center gap-5 flex  flex-col justify-center items-center'>
                    <h1 className='text-center' >{post.title}</h1>
                    <div className='flex gap-3 justify-start items-center'>
                        {/* <Avatar className='size-9'>
                            <AvatarImage src={ `/api/proxy-image?url=${encodeURIComponent( post.user.picture)}` } />
                        </Avatar> */}
                        <Avatar className='size-9 my-4 '>
                                    { post.user.picture ? (
                                        <AvatarImage className=' object-cover' src={`${process.env.NEXT_PUBLIC_API_URL}/api/proxy-image?url=${encodeURIComponent(post.user.picture)}`}></AvatarImage>
                                    ) : (
                                        <AvatarFallback >{post.user.name.charAt(0).toUpperCase()}</AvatarFallback >
                                    ) }
                                </Avatar>
                        <div className='flex flex-col'>
                            <p className='font-bold   text-sm !my-0 '>Written by {post.user.name}</p>
                            <p className='text-xs text-[rgb(120,113,108)]  !my-0 '>Published on {dateFormat(post.createdAt)}</p>
                        </div>
                    </div>
                </div>
                    <hr className='my-12'/>
                    <div className='[&>p]:text-lg'  dangerouslySetInnerHTML={{__html : post.content}}>
                </div>
                <hr className='my-12'/>
                    <BounceFade>
                        <BlogComments  postId={postId}  />
                    </BounceFade>
                </div>
        </div>

  )
}


export default BlogDetails