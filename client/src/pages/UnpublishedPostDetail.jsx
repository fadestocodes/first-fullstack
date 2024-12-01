import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UnpublishedPostDetail = () => {
    const { id } = useParams();
    const [ post, setPost  ] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        const getBlogpost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/get-post/${id}`);
                if (!response.ok){
                    throw new Error('Problem fetching data');
                }
                const data = await response.json();
                console.log('Data is: ', data);
                setPost(data);
                console.log('post is ', post);
    
            } catch (err) {
                console.error('Error retrieving blogpost', err);
            }
        }
        getBlogpost();
    },[id])

    useEffect(() => {
        console.log('Updated post:', post); // Log post after it's updated
    }, [post]); // This effect runs whenever post state changes

    const handlePublish = async () => {
        
        if (!post.id){
            console.error('Post Id not ready yet');
            return;
        }
        
        const postId = post.id;
        console.log('post is : ', post)
        try {
            const response = await fetch('http://localhost:3000/publish-post', {
                method : 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({postId})
            });
            if (!response.ok){
                throw new Error('Bad response');
            }
            const data = await response.json();
            console.log('data is : ', data);
            navigate('/blog');
        } catch (err) {
            console.error('Fetch error', err);
        }
        
    }

  return (
    <div>
        <button onClick={()=>navigate('/admin/unpublished-posts')} >Back</button>
        <button>Edit</button>
        <button onClick={handlePublish} >Publish</button>
        <h1></h1>
        <div dangerouslySetInnerHTML={{__html:post.content || ''}} >

        </div>


    </div>

  )
}

export default UnpublishedPostDetail