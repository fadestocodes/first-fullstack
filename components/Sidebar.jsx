'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupContent,
    SidebarTrigger,
    SidebarGroupLabel,
    SidebarGroup,
  } from "@/components/ui/sidebar";
  import { Home, FileStack, FilePlus2, NotepadTextDashed} from "lucide-react";

import {useSession} from 'next-auth/react'
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import { useRouter } from "next/navigation";


  const items = [ 
    {
      title : 'Home',
      url : '/',
      icon : Home
    },
    {
      title : 'Published Posts',
      url : '/blog',
      icon : FileStack
    },
    {
      title : 'Drafts',
      url : '/admin/drafts',
      icon : NotepadTextDashed 
    },
    {
      title : 'Create New Blog',
      url : '/admin/create',
      icon : FilePlus2
    }
  ]
  
  
  export   function AppSidebar() {

      const session  = useSession();
      const router = useRouter();

      const firstName = session?.data?.user.name.split(' ')[0];
      const lastName = session?.data?.user.name.split(' ')[1];
      const initials =
      firstName && lastName
      ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
      : '';


    return (
      <>
        {session && session?.data?.user?.role === 'ADMIN' && (
                <>
                <Sidebar className="flex flex-col">
                  <SidebarContent>
                    <SidebarGroup >
                      <SidebarGroupLabel>
                        <div className="mt-14 flex flex-col gap-3">
                            <p>Admin Dashboard</p>
                            <div className="flex  gap-3 items-center justify-center">
                                <Avatar className="size-8">
                                    <AvatarImage src={session.data.user.image}  />
                                    <AvatarFallback>{  initials}</AvatarFallback>
                                </Avatar>
                                <p className="text-base font-bold !my-0">Hello, {firstName}</p>
                            </div>

                        </div>
                        </SidebarGroupLabel>
                      <SidebarGroupContent className="mt-16">
                        <SidebarMenu>
                          {items.map((item)=>(
                            <SidebarMenuItem key={item.title} className="cursor-pointer">
                              <SidebarMenuButton asChild>
                                <div onClick={()=>router.push(item.url)}>
                                  <item.icon />
                                  <span>{item.title}</span>
                                </div>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup >
                  </SidebarContent>
                  <SidebarFooter />
                </Sidebar>
                <SidebarTrigger/>
                </>

        )}
    </>
    )
    
  }
  