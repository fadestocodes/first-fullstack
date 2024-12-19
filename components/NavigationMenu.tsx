"use client"

import * as React from "react"
import Link from "next/link"
import { MapPinned } from "lucide-react"
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
import { signOut, signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {useState} from 'react'
import { redirect } from "next/navigation"
import {HoverCardLocation} from '@/components/HoverCard'

export function NavigationMenuDemo() {

  const session = useSession();
  console.log('Session is: ', session);
  const [isOpen, setIsOpen] = useState(false);


  const handleAvatarClick = () => {
    setIsOpen((prevState)=>(!prevState))
  }

  const handleLogout =() => {
    signOut();
    redirect('/')
  }




  return (
    <NavigationMenu>
      <NavigationMenuList className="z-40   w-full fixed top-0 items-center left-0 right-0  grid grid-cols-3 bg-white h-16" >
        <div className='currently-at flex  gap-3 items-center  ml-6  md:ml-12'>
          <div className="flex justify-center items-center ">
            <HoverCardLocation  target={ <MapPinned className="w-48 "/> }/>
          </div>
        </div>
        <div className="flex justify-center items-center " >
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
            { session && session?.data?.user?.image ? (
              <div className="flex flex-col items-center justify-center ">
                <Avatar className="size-7 cursor-pointer" onClick={handleAvatarClick} >
                  <AvatarImage className="" src={ `/api/proxy-image?url=${encodeURIComponent(session?.data?.user?.image)}` } />
                  <AvatarFallback>{session.data.user.name?.split('')[0]}</AvatarFallback>
                </Avatar>{ isOpen && (
                  <Button className="w-13 h-8 absolute mt-20 mr-5 " variant='default' onClick={handleLogout}>Log Out</Button>
                ) }
              </div>
            ) : (
              <div>
                <Button className='' onClick={async () => await signIn()}>Log In</Button>
              </div>

            ) }
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
