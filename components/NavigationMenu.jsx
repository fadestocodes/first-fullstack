"use client"

import SignInButtons from "./SignInButtons"
import * as React from "react"
import Link from "next/link"
import {  Menu, House, BookText, Image, Hand } from "lucide-react"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { signOut} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {useState} from 'react'
import { redirect } from "next/navigation"
import {Toggle} from '@/components/ui/toggle'
import { Card, CardContent, CardFooter} from '@/components/ui/card'

export function NavigationMenuDemo() {

  const session = useSession();
  console.log('Session is: ', session);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [maxNotifId, setMaxNotifId] = useState(null);
  const [currentNotifs, setCurrentNotifs] = useState([]);

  useEffect(()=>{
    if (session.status === 'authenticated'){
      setCurrentNotifs(session.data.user.notifications);
      console.log('initial render currentNotifs:', currentNotifs)
      const getCurrentNotifs = async () => {
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/get-all/${session.data.user.id}`)
        const data = await response.json();
        console.log('the data back is ', data);
        setCurrentNotifs(data);
      }
      getCurrentNotifs();
    }
  }, [session])

  useEffect(()=> {
    if (session.status === 'authenticated'){
      console.log('notifications', session.data.user.notifications[0])
      const maxNotif = session.data.user.notifications[0];
      if (maxNotif){
        setMaxNotifId(maxNotif.id);
        console.log('maxNotifId', maxNotifId);
      }
    }
  }, [session])


  const handleAvatarClick = async () => {
    setIsOpen((prevState)=>(!prevState))
  if (isOpen){
      try {
        console.log('max id is ', maxNotifId)
        const payload = {
          maxNotifId,
          userId : session.data.user.id
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read`,{
          method : "POST",
          headers : {
            'Content-type' : 'application/json'
          },
          body : JSON.stringify(payload)
        })
        const responseData = await response.json();
        console.log('response data', responseData);
        try {
          const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/get-all/${session.data.user.id}`)
          const data = await response.json();
          console.log('the data back is ', data);
          setCurrentNotifs(data);
        }catch(err){
          console.log('error trying to get new notifs after closing menu', err.message)
        }

      } catch(err) {
        console.log('Error tring to update notification read status', err.message)
      }
    }
  }

  const handleLogout =() => {
    signOut();
    redirect('/')
  }
  
  const handleToggle = () => {
    setMenuOpen(prevData => (
      !prevData
    ))
  }






  return (
    <div className="w-full items-center justify-center">
      <div className=" w-full   justify-end items-center  grid grid-cols-3 bg-transparent h-24  pt-6 " >
        <div className='currently-at flex w-full  gap-3 items-center  ml-6  md:ml-12'>
          <Link href='/'>
            <div className="flex flex-col justify-center items-center font-logo text-xl ">
              Louise Uncharted
            </div>
          </Link>
        </div>
          <div>
            <div className="w-full flex ">
              <Toggle className="sm:hidden flex w-full" data-state={menuOpen === true ? 'on' : 'off'} onClick={handleToggle}><Menu/></Toggle>
            </div>
                    <div className="md:flex w-full justify-center gap-10  items-center hidden " >
              <div>
                <Link href='/'>
                  <div className="font-medium uppercase text-base  bg-transparent hover:text-slate-600">Home</div>
                </Link>
              </div>
              <div>
                <Link href='/blog'>
                  <div className="font-medium uppercase text-base  bg-transparent hover:text-slate-600">Blog</div>
                </Link>
              </div>
                <Link href='/postcards'>
                <div className="font-medium uppercase text-base  bg-transparent hover:text-slate-600">Postcards</div>
              </Link>
              <div>
                <Link href='/about'>
                  <div className="font-medium uppercase text-base  bg-transparent hover:text-slate-600">About</div>
                </Link>
              </div>
              
                    </div>
          </div>
        <div className=" login  text-black items-center justify-self-end px-8  " >
            { session && session?.data?.user ? (
              <div>
                <div className="flex flex-col items-center justify-center relative ">
                  <Avatar className="size-9 cursor-pointer" onClick={handleAvatarClick} >
                    <AvatarImage className="object-cover" src={ `/api/proxy-image?url=${encodeURIComponent(session?.data?.user?.picture)}` } />
                    <AvatarFallback>{session?.data?.user?.name.split('')[0]}</AvatarFallback>
                    
                  </Avatar>
                  { currentNotifs.filter(notif => !notif.isRead).length > 0 && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-white">
                        <span className="  text-base">{currentNotifs.filter(notif => !notif.isRead).length }</span>
                    </div>
                  ) }
                  { isOpen && (
                    <Card className="absolute top-10 right-0 w-80" >
                      <CardContent className="text-sm pt-3 overflow-scroll max-h-72  " >
                      { currentNotifs.length > 0 ? (
                         currentNotifs.map( notif => (
                          <div key={notif.id} className={`${ notif.isRead ? 'bg-transparent' : 'bg-blue-100' }  px-2 rounded-md`} >

                            <hr />
                             <div className="flex  justify-center items-start gap-2">
                              <Avatar className="size-7 cursor-pointer mt-3"  >
                                <AvatarImage className="object-cover" src={ `/api/proxy-image?url=${encodeURIComponent(session?.data?.user?.picture)}` } />
                                <AvatarFallback>{session?.data?.user?.name.split('')[0]}</AvatarFallback>
                              </Avatar>
                              <p className="!my-2 !leading-5 line-clamp-3 text-xs overflow-ellipsis ">{notif.content}</p>
                             </div>
                          </div>
                        ) ) 
                      ) : ( <div>
                        <p className="!my-0">No new notifications</p>
                      </div>) }
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full " variant='outline'>My Account</Button>
                        <Button className="w-full " variant='default' onClick={handleLogout}>Log Out</Button>
                        </CardFooter>
                    </Card>
                  ) }
                    
                </div>
               
              </div>
            ) : (
              <div className="menu">
                
                  <Button className='' onClick={async () => setModalOn(true)}>Log In</Button>
              </div>

            ) }
        </div>
        { modalOn && (
            <div className='login-modal px-6 bg-black bg-opacity-50 z-30 fixed w-full h-full inset-0 flex flex-col justify-center items-center' onClick={()=>setModalOn(false)}>
                <div onClick={(e) => e.stopPropagation()}>
                    <SignInButtons ></SignInButtons>
                </div>
            </div>
        )  }
        { menuOpen && (
              <div className="fixed top-0 pt-24 left-0 right-0 bottom-0 z-40 bg-white flex flex-col items-center justify-start !px-0  !mx-0 py-6 animate-fadeIn w-full">
              <ul className="space-y-4 flex flex-col  items-start  ">
                <li className="">
                  <Link className="flex justify-center items-center gap-2" href="/" onClick={() => setMenuOpen(false)}>
                    <House size='14'/> Home
                  </Link>
                </li>
                <hr />
                <li>
                  <Link className="flex justify-center items-center gap-2" href="/blog" onClick={() => setMenuOpen(false)}>
                  <BookText size='14' />Blog
                  </Link>
                </li>
                <hr />
                <li>
                  <Link className="flex justify-center items-center gap-2" href="/postcards" onClick={() => setMenuOpen(false)}>
                    <Image size='14' />Postcards
                  </Link>
                </li>
                <hr />
                <li>
                  <Link className="flex justify-center items-center gap-2" href="/about" onClick={() => setMenuOpen(false)}>
                    <Hand size='14'/>About Me
                  </Link>
                </li>
                <hr />
                <li>
                  <Button onClick={()=>setMenuOpen(false)}>
                    Close
                  </Button>
                </li>
              </ul>
            </div>
            ) }
          {/* <div className="absolute top-[4rem] left-12 text-[rgb(120,113,108)] hover:text-black cursor-pointer text-sm">
              /blog/1
          </div> */}
      </div>
    </div>
    
  )
}

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = "ListItem"

// const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })

// ListItem.displayName = "ListItem"
