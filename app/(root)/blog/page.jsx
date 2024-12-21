  import { Card, CardHeader, CardContent } from '@/components/ui/card';
  import React from 'react'
  import {Badge} from '@/components/ui/badge'
  import {dateFormat} from '@/lib/dateFormat'
  import {formatKebab} from '@/lib/formatKebabCase'
  import {  Eye, MessageSquareText } from 'lucide-react';
  import {paraphraseContent} from  '@/lib/paraphraseContent'
  import {Avatar, AvatarImage} from '@/components/ui/avatar'
  import {RedirectButton} from '@/lib/RedirectButton'
  import { BounceFade } from "@/components/ui/animations";


  async function fetchPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get-all`, {
      cache: 'no-store', // Ensure always up-to-date content
    });
  
    console.log(res);

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
  
    return res.json();
  }
  


  const BlogsPage = async () => {


    // const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get-all`);
    // const allPosts = await data.json();
    const allPosts = await fetchPosts();
    // console.log('all psots: ', allPosts);



    return (
      <div className='main-container flex flex-col justify-center items-center h-full w-full p-8'>
        <BounceFade>
          <h1 className='text-left my-8'>All posts</h1>
        </BounceFade>
          <div className=''>
            { allPosts.map((post)=>(
              <div key={post.id}>
                {/* <img src={post.coverPhoto} alt='post cover photo' className='' ></img> */}
                  <Card className='border-0 shadow-none items-center flex flex-col  m-12 w-96   md:w-[42rem]  lg:flex-row lg:h-[14rem] lg:w-[52rem] lg:py-0 lg:my-4  lg:gap-0 '>
                      <div className='relative  object-cover  w-full  md:w-full lg:w-[20rem] lg:h-[14rem]'>
                        <img src={post.coverPhoto} alt="Blog post cover photo" className='object-cover  h-56 w-full   md:w-full  lg:w-[20rem] lg:h-[14rem] '   />
                        <div><Badge variant='secondary' className='absolute bottom-4 left-4 '>{formatKebab(post.category)}</Badge></div>
                      </div>
                      <div className="  w-full h-full flex justify-evenly flex-col overflow-hidden lg:h-[14rem] lg:w-full">
                          <CardHeader className='px-0  lg:py-2 lg:px-6'>
                          <p className='!my-0 text-2xl font-bold line-clamp-2'>{post.title}</p> 
                              <div className='flex gap-2 justify-start items-center '>
                                <Avatar className='size-5' >
                                  <AvatarImage className='' src={ `/api/proxy-image?url=${encodeURIComponent(post.user.picture)}` } ></AvatarImage>
                                </Avatar>
                                <div className='flex flex-col'>
                                  <p className='!my-0 text-sm text-[rgb(120,113,108)]  font-normal'>Published {dateFormat(post.createdAt)}</p>
                                </div>
                              </div>
                          </CardHeader>
                              <CardContent className=' px-0 flex flex-col gap-4 lg:gap-1 py-0   lg:px-6 '>
                              <p  className='line-clamp-3 lg:overflow-hidden lg:overflow-ellipsis lg:line-clamp-2 text-sm lg:mb-1' dangerouslySetInnerHTML={{ __html: paraphraseContent(post.content) }} />
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

