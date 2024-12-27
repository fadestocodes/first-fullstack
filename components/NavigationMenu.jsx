"use client"

import SignInButtons from "./SignInButtons"
import * as React from "react"
import Link from "next/link"
import { MapPinned, Menu, House, BookText, Image, Hand, PlaneTakeoff } from "lucide-react"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
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
  const [locationToggle, setLocationToggle] = useState(false);
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
    <NavigationMenu>
      <NavigationMenuList className="z-40   w-full fixed top-0 items-start left-0 right-0  grid grid-cols-3 bg-white h-24  pt-6 " >
        <div className='currently-at flex  gap-3 items-center  ml-6  md:ml-12'>
          <div className="flex flex-col justify-center items-center relative ">

            <Toggle data-state={locationToggle ? 'on' : 'off'} onClick={()=>setLocationToggle(prevData => !prevData)}><MapPinned></MapPinned></Toggle>
            { locationToggle && (
              <Card className="pt-4 absolute top-8 left-0 w-52 md:w-64 z-50">
                  <CardContent>
                    <div className="flex justify-between space-x-4 ">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Currently: Vancouver, BC</h4>
                        <p className="text-sm">
                        😪 Daydreaming of the next trip while working at the hospital.
                        </p>
                        <div className="flex items-center pt-2">
                          <PlaneTakeoff  className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Next trip: New Mexico
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
              </Card>
            ) }
          </div>
        </div>
          <Toggle className="sm:hidden" data-state={menuOpen === true ? 'on' : 'off'} onClick={handleToggle}><Menu/></Toggle>
        <div className="sm:flex justify-center items-center hidden " >
          
          <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/postcards" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Postcards
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Me
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
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
                          <div key={notif.id} className={`${ notif.isRead ? 'bg-white' : 'bg-blue-100' }  px-2 rounded-md`} >

                            <hr />
                             <div className="flex justify-center items-start gap-2">
                              <Avatar className="size-7 cursor-pointer mt-3"  >
                                <AvatarImage className="object-cover" src={ `/api/proxy-image?url=${encodeURIComponent(session?.data?.user?.picture)}` } />
                                <AvatarFallback>{session?.data?.user?.name.split('')[0]}</AvatarFallback>
                              </Avatar>
                              <p className="!my-2 !leading-5 line-clamp-2 text-xs overflow-ellipsis ">{notif.content}</p>
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
              <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-white flex flex-col items-center justify-start !px-0  !mx-0 py-6 animate-fadeIn w-full">
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
              </ul>
            </div>
            ) }
          {/* <div className="absolute top-[4rem] left-12 text-[rgb(120,113,108)] hover:text-black cursor-pointer text-sm">
              /blog/1
          </div> */}
      </NavigationMenuList>
    </NavigationMenu>
    
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

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
