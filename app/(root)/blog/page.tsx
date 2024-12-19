import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Card, CardTitle, CardHeader, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import React from 'react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {dateFormat} from '@/lib/dateFormat'
import {formatKebab} from '@/lib/formatKebabCase'
import { Heart, Eye, MessageSquareText, CornerRightUp } from 'lucide-react';
import {paraphraseContent} from  '@/lib/paraphraseContent'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {getInitials} from '@/lib/getInitials'
import {RedirectButton} from '@/lib/RedirectButton'



const BlogsPage = async ({params}) => {
  const session = await getServerSession(authOptions);
  const data = await fetch('http://localhost:3000/api/post/get-all');
  const allPosts = await data.json();
  console.log('all psots: ', allPosts);


  return (
    <div className='main-container flex flex-col justify-center items-center h-full w-full p-8'>
      <h1 className='text-left my-8'>All posts</h1>
        <div className=''>
          { allPosts.map((post)=>(
            <div key={post.id}>
              {/* <img src={post.coverPhoto} alt='post cover photo' className='' ></img> */}
              <Card className='border-0 shadow-none items-center flex flex-col  m-12 w-96   md:w-[42rem]  lg:flex-row lg:h-[14rem] lg:w-[52rem] lg:py-0 lg:my-4  lg:gap-0 '>
                  <div className='relative  object-cover  w-full  md:w-full lg:w-[20rem] lg:h-[14rem]'>
                    <img src={post.coverPhoto} alt="" className='object-cover  h-56 w-full   md:w-full  lg:w-[20rem] lg:h-[14rem] '   />
                    <div><Badge variant='secondary' className='absolute bottom-4 left-4 '>{formatKebab(post.category)}</Badge></div>
                  </div>
                  <div className="  w-full h-full flex justify-evenly flex-col overflow-hidden lg:h-[14rem] lg:w-full">
                      <CardHeader className='px-0  lg:py-2 lg:px-6'>
                          <div className='flex gap-4 justify-start items-center '>
                            <Avatar className='size-6' >
                              <AvatarImage className='' src={ `/api/proxy-image?url=${encodeURIComponent(post.user.picture)}` } ></AvatarImage>
                            </Avatar>
                            <div className='flex flex-col'>
                              <p className='!my-0 text-2xl font-bold'>{post.title}</p> <p className='!my-0 text-sm font-normal'>Published {dateFormat(post.createdAt)}</p>
                            </div>
                          </div>
                      </CardHeader>
                          <CardContent className=' px-0 flex flex-col gap-4 lg:gap-1 py-0  lg:px-6 '>
                          <p  className=' lg:overflow-hidden lg:overflow-ellipsis lg:line-clamp-2 lg:mb-1' dangerouslySetInnerHTML={{ __html: paraphraseContent(post.content) }} />
                            <hr />
                            <div className='flex w-full justify-between  lg:px-0 lg:mt-2'>
                              <div className="flex gap-2">
                                <div className='flex gap-2 justify-center items-center'>
                                  <Eye size='20' />{  post.views }
                                </div>
                                <div className='flex justify-center items-center gap-2 '>
                                  <MessageSquareText size='20'/>{ post.comments.length }
                                </div>
                              </div>
                              <RedirectButton  postId={post.id}/>
                            </div>
                          </CardContent>
                  </div>
              </Card>
            </div>
          )) }
        </div>
        <div className='flex flex-col items-center justify-center'>
            
        </div>
      <div className='flex' >

      </div>
    </div>
  )
}

export default BlogsPage

