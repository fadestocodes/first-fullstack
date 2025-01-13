
import React from 'react'
import {NavigationMenuDemo}  from '@/components/NavigationMenu';
import {AppSidebar} from '@/components/Sidebar'
import {  SidebarProvider} from '@/components/ui/sidebar';
import {SessionProviderWrapper} from '@/components/SessionProviderWrapper'
import {Footer2} from '@/components/Footerv2'
    // import { authOptions } from '../api/auth/[...nextauth]';

const Layout = async ({children}) => {

    
    return (
        <SessionProviderWrapper >
            <SidebarProvider>
            <AppSidebar ></AppSidebar>
                    <div className='flex flex-col justify-center items-center w-full mb-0 '>
                                <div className='flex flex-col w-full'>
                                    <div className="z-10 w-full  justify-center items-center "><NavigationMenuDemo/></div>
                                        <div className='flex flex-col justify-center items-center w-full min-h-svh mb-0'>
                    
                                        <div className=' w-full px-0  justify-center items-center '>
                                            {children  }
                                        </div>
                                        <div className='w-full mt-32'>
                                            <Footer2></Footer2>
                                        </div>
                                    </div>
                                </div>
                    </div>
                                </SidebarProvider>
                </SessionProviderWrapper>
  )
}

export default Layout