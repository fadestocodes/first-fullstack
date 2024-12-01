import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { cache, setCache, getCache } from '../components/cache';

const BlogDetails = () => {

    const {id} = useParams();
    const postId = Number(id);
    const [post, setPost] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        
        const getPost = async () => {
            
            const cacheKey = 'published-posts';
            const cachedData = getCache(cacheKey);
            if (cachedData) {
                const correctPost = cachedData.find((element) => element.id === postId);
                setPost(correctPost);
                return;
            }
            try {
                const response = await fetch(`localhost:3000/get-post/${id}`);
                if (!response.ok){
                    throw new Error ('Bad response');
                }
                const data = await response.json();
                console.log('data is ', data);
                setPost(data);
                console.log('post is ', post);
            } catch (err) {
                console.error("Couldn't fetch data from server", err);
            }

        }
        getPost();
    }, [post])


    return (
    <>
    <h1>
        <div>BlogDetails</div>


    </h1>
    <button onClick={()=>navigate('/blog')} >Back</button>
    <div dangerouslySetInnerHTML={{__html : post.content}} />
    </>
  )
}

export default BlogDetails