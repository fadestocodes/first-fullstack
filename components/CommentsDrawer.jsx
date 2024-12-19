
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import {Button} from '@/components/ui/button'
  


const CommentsDrawer = () => {
  return (
    <div>
        <Drawer>
            <DrawerTrigger>See comments</DrawerTrigger>
            <DrawerContent className='h-[85vh]'>
            <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
            <Button variant="primary">Cancel</Button>
            </DrawerClose>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>

    </div>
  )
}

export default CommentsDrawer