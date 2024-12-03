import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cache, getCache, setCache } from '../components/cache';
import  {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { useUser } from '../components/UserContext';
import {Button} from '../components/ui/button';
import {Badge, badgeVariants} from '../components/ui/badge';
import { Link } from 'react-router-dom';


const Blog = () => {

    const user = useUser();
    console.log('user is ',user);
    const navigate = useNavigate();
    const [ posts, setPosts ] = useState([]);
    const [ isMainPage, setIsMainPage  ] = useState(true);
    const location = useLocation();
    


    useEffect(()=>{

        const getBlogs = async () => {

            const cacheKey = 'published-posts';
            const cachedData = getCache(cacheKey);
            if (cachedData){
                console.log('Returned from cache', cachedData);
                setPosts(cachedData);
                return;
            }

            try {
                const response = await fetch ('http://localhost:3000/published-posts');
                if (!response){
                    throw new Error ('Bad response');
                }
                const data = await response.json();
                setPosts(data);
                console.log('posts is : ', posts)
                const ttl = 10 * 50 * 1000;
                setCache(cacheKey, data, ttl);
            } catch (err) {
                console.error('Error fetching data', err)
            }
        }
        getBlogs();
    }, [])

    useEffect(()=>{
        if (location.pathname === '/blog'){
            setIsMainPage(true);
        } else {
            setIsMainPage(false);
        }
    }, [location])

    const formatContent = (content) => {
        const div = document.createElement('div');
        div.innerHTML = content;
        const text = div.textContent || div.innerText || '';
        return text.length > 400 ? text.substring(0, 400) + '...' : text;
    }

    const handleButton = (item) => {
        navigate(`/blog/${item.id}`);
        setIsMainPage(false);
        
    }

    const formatString = (string) => {
        return string.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }


  return (
    < div className='flex flex-col w-full'>
        { isMainPage && (
                <>
            
            <div className='flex flex-col items-center'>
                <h1  >
                    Blog
                </h1>
            </div>

            { posts.map( (item, index) => (
                <div key={index} className='my-4'  >
                    <Card>
                        <div className='flex my-3 ml-5 gap-3' >
                            { item.category !== 'other' && (
                                <div> <Link className={ `${badgeVariants({ variant: "outline" })} `}>{formatString(item.category)}</Link></div>
                            ) }
                            { item.country !== '' && (
                                <div> <Link className={ `${badgeVariants({ variant: "outline" })} `}>{formatString(item.country)}</Link></div>
                            ) }
                        </div>
                   
                        <CardHeader>
                            <CardTitle><h2>{item.title}</h2></CardTitle>
                            <CardDescription><p dangerouslySetInnerHTML={{__html: formatContent(item.content) }} ></p> </CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                        <CardFooter>
                            <Button variant='default' onClick={()=>handleButton(item)}>Read more.</Button>
                        </CardFooter>
                    </Card>
                </div>
            ) ) }

            </>

        ) }

        <Outlet></Outlet>
    </div>
  )
}

export default Blog