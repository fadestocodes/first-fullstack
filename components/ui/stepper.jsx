import React from 'react'
import { NotebookPen, FolderOpen } from 'lucide-react'


export const Stepper = () => {
  return (
    <div>

<div class="w-full px-24 py-4">
  <div class="relative flex items-center justify-between w-full">
    <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
    <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500">
    </div>
    <div
      class="relative z-5 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center">
     <FolderOpen />
      <div class="absolute -bottom-[4.5rem] w-max text-center">
        <h6
          class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
          Step 1
        </h6>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Details about yout post.
        </p>
      </div>
    </div>
    
    <div
      class="relative z-5 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center">
     <NotebookPen />
      <div class="absolute -bottom-[4.5rem] w-max text-center">
        <h6
          class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
          Step 2
        </h6>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Write your blog!
        </p>
      </div>
    </div>
  </div>
 

  
</div>
    </div>
  )
}
