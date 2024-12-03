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
    SidebarHeader,
  } from "@/components/ui/sidebar";
  import { Home, Settings , FileStack, FilePlus2, UserRoundCheck} from "lucide-react";
  import { UserProvider, useUser } from './UserContext.jsx'

  
  const items = [ 
    {
      title : 'Home',
      url : '/',
      icon : Home
    },
    {
      title : 'Admin',
      url : '/admin',
      icon : UserRoundCheck
    },
    {
      title : 'Unpublished Posts',
      url : '/admin/unpublished-posts',
      icon : FileStack
    },
    {
      title : 'Create New Blog',
      url : '/admin/create-blogpost',
      icon : FilePlus2
    }
  ]
  
  
  export function AppSidebar() {
    
    const {user} = useUser();
    console.log('user is ', user);
    return (
      <>
          {  user && user.role === 'ADMIN' &&  (
                <>
                <Sidebar>
                  <SidebarContent>
                    <SidebarGroup >
                      <SidebarGroupLabel>Admin</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {items.map((item)=>(
                            <SidebarMenuItem key={item.title} >
                              <SidebarMenuButton asChild>
                                <a href={item.url}>
                                  <item.icon />
                                  <span>{item.title}</span>
                                </a>
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
  