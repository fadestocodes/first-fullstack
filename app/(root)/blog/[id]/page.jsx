import React, {Suspense} from 'react'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {dateFormat} from '@/lib/dateFormat'
import  BlogComments from '@/components/BlogComments'

const BlogDetails = async ( {params} ) => {
    const {id} = await params;
    const postId = id;
    console.log('post id is ', postId);
    const res = await fetch('http://localhost:3000/api/post/get-single', {
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
                <img src={post.coverPhoto} alt="" className=' h-[32rem] w-full object-cover  2xl:h-[40rem] bigscreen:h-[56rem]'/>
                <div className="absolute inset-0 bg-black opacity-0"></div>
            </div>
            <div className='flex flex-col sm:px-12  lg:px-40   2xl:px-[28rem] '>
                <div className='title-author self-center gap-3 flex  flex-col justify-center items-center'>
                    <h1>{post.title}</h1>
                    <div className='flex gap-3 justify-start items-center'>
                        <Avatar className='size-9'>
                            <AvatarImage src={ `/api/proxy-image?url=${encodeURIComponent( post.user.picture)}` } />
                        </Avatar>
                        <div className='flex flex-col'>
                            <p className='font-bold text-sm !my-0 '>Written by {post.user.name}</p>
                            <p className='text-sm italic !my-0 '>Published on {dateFormat(post.createdAt)}</p>
                        </div>
                    </div>
                </div>
                    <hr className='my-12'/>
                    <div  dangerouslySetInnerHTML={{__html : post.content}}>
                </div>
                <hr className='my-12'/>
                    <BlogComments  postId={postId}  />
                </div>
        </div>

  )
}


export default BlogDetails