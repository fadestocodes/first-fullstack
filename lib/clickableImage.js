// components/ClickableImage.js (Client Component)
'use client'; // Marking this as a Client Component

import { useRouter } from 'next/navigation';

export default function ClickableImage({ postId, imgSrc }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${postId}`);  // Use push for navigating on click
  };

  return (
    <img 
      src={imgSrc} 
      alt="Blog post cover photo" 
      onClick={handleClick} 
      className="object-cover cursor-pointer h-56 w-full md:w-full lg:w-[20rem] lg:h-[14rem]" 
    />
  );
}
