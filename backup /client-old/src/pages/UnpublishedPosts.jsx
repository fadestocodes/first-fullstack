import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const UnpublishedPosts = () => {


  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  
  const getUnpublishedPosts = async () => {
    
    try {
        const response = await fetch ('http://localhost:3000/unpublished-posts');
        if (!response.ok){
            throw new Error ("Couldn't retrieve posts");
        }
        const data = await response.json();
        console.log('data is : ', data);
        return data.unpublishedPosts;
        
    } catch (err) {
        console.error ('Unexpected error fetching data', err);
        return [];
    }
    
}

useEffect(()=>{
    const fetchPosts = async () => {
        const unpublishedPosts = await getUnpublishedPosts();
        console.log('unpublished posts : ', unpublishedPosts)
        setPosts(unpublishedPosts);

    };
    fetchPosts();
}, []);

console.log('Here are the posts', posts);
console.log('Here are the posts.unpublishedposts: ', posts);
console.log('Is posts an array?', Array.isArray(posts));

const formatContent = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    // const htmlString = div.innerHTML.substring(0,100);
    return text.length > 300 ? text.substring(0, 300) + '...' : text;

    // const text = content.replace(/<[^>]*>/g, '');
    // console.log('the text is : ', text);
    // // return content.replace(/<h1>/g, "").replace(/<\/h1>/g, "").replace(/<p>/g, '').replace(/<\/p>/g, '');
    // return text;
}


  return (
    <div>
        <h1>Unpublished Posts</h1>
        { posts.map( ( item, index )=>{
            return (
            <div onClick={()=>navigate(`/admin/unpublished-posts/${item.id}`)}  key = {index} style={{borderRadius : '1rem', border : '.1rem solid grey', padding : '5%'}}>
                <h2>{item.title}</h2>
                <div style={{ fontSize : '14px'}} > 
                <p   dangerouslySetInnerHTML={{__html :formatContent( item.content)}}></p></div><br />
                <small>{item.city ? ( `${item.city}, ${item.country}` ) : (item.country)  }</small>
            </div>)
        }) }
    </div>
  )
}

export default UnpublishedPosts