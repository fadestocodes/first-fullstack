import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cache, getCache, setCache } from '../components/cache';


const Blog = () => {
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


  return (
    <>
        { isMainPage && (
            
            <>
            <h1>
                <div>Blog</div>
            </h1>
            { posts.map( (item, index) => (
                <div key={index} >
                    <h2>{item.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: formatContent(item.content) }} ></p>
                    <button onClick={()=>handleButton(item)}>Read more.</button>
                </div>
            ) ) }
            </>


        ) }

        <Outlet></Outlet>
    </>
  )
}

export default Blog