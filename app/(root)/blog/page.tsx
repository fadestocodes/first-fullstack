import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Card, CardTitle, CardHeader, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import React from 'react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {dateFormat} from '@/lib/dateFormat'
import {formatKebab} from '@/lib/formatKebabCase'
import { Heart, Eye } from 'lucide-react';
import {paraphraseContent} from  '@/lib/paraphraseContent'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {getInitials} from '@/lib/getInitials'
import {RedirectButton} from '@/lib/RedirectButton'



const BlogsPage = async ({params}) => {
  const session = await getServerSession(authOptions);
  const data = await fetch('http://localhost:3000/api/post/get-all');
  const allPosts = await data.json();
  // console.log('all psots: ', allPosts);


  
  

  return (
    <div className='main-container flex flex-col justify-center items-center h-full w-full'>
        <div className=''>
          { allPosts.map((post)=>(
            <div key={post.id}>
              {/* <img src={post.coverPhoto} alt='post cover photo' className='' ></img> */}
              <Card className=' items-center flex flex-col  m-8 w-96  pb-8 md:w-[42rem] md:pb-8'>
                  <div className='relative  object-cover  w-full  md:w-full'>
                    <img src={post.coverPhoto} alt="" className='object-cover  h-56 w-full   md:w-full' />
                    <div><Badge variant='secondary' className='absolute bottom-4 left-4 '>{formatKebab(post.category)}</Badge></div>
                  </div>
                  <div className="  w-full h-full overflow-hidden">
                      <CardHeader>
                          <div className='flex gap-4 justify-start items-center'>
                            <Avatar className='size-7' >
                              <AvatarImage className='' src={post.user.picture} ></AvatarImage>
                            </Avatar>
                            <div className='flex flex-col'>
                              <p className='!my-0 text-2xl font-bold'>{post.title}</p> <p className='!my-0 text-sm font-normal'>Published {dateFormat(post.createdAt)}</p>
                            </div>
                          </div>
                      </CardHeader>
                          <CardContent className='flex flex-col gap-4 '>
                          <p dangerouslySetInnerHTML={{ __html: paraphraseContent(post.content) }} />
                            <hr />
                            <div className='flex w-full justify-between px-4'>
                              <div className='flex gap-2'>
                                <Eye />{  post.views }
                              </div>
                              <Heart />
                            </div>
                          </CardContent>
                                <CardFooter><RedirectButton postId={post.id}/></CardFooter>
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

