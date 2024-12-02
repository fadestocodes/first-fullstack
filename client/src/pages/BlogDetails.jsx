import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { cache, setCache, getCache } from '../components/cache';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import {jwtDecode } from 'jwt-decode';

const BlogDetails = () => {

    const {id} = useParams();
    const postId = Number(id);
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        firstName : '',
        lastName : '',
        email: '',
        comment : '',
        sub : '',
        picture : '',
        blogId : id
    })
    const [commentList, setCommentList] = useState([]);
    const [commentPosted, setCommentPosted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isReply, setIsReply] = useState(false);

    useEffect(()=>{
        
        const getPost = async () => {
            
            const cacheKey = 'published-posts';
            const cachedData = getCache(cacheKey);
            if (cachedData) {
                console.log('got from cached data');
                const correctPost = cachedData.find((element) => element.id === postId);
                setPost(correctPost);
                return;
            }
            try {
                const response = await fetch(`http://localhost:3000/get-post/${id}`);
                if (!response.ok){
                    throw new Error ('Bad response');
                }
                const data = await response.json();
                console.log('data is ', data);
                setPost(data);
                setCache(data);
                console.log('post is ', post);
            } catch (err) {
                console.error("Couldn't fetch data from server", err);
            }

        }
        getPost();
    }, [])

    useEffect(()=>{
        const getAllComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/comment/${id}`);
                if (!response.ok){
                    throw new Error('Bad response');
                }
                const data = await response.json();
                console.log('data is ', data);
                setCommentList(data);
                console.log(commentList);
            } catch (err) {
                console.error('Error fetching data', err);
            }
        }
        getAllComments();
    }, [id])




    const handleSubmit = async () => {
        console.log('Inputs are : ', inputs);

        if (commentPosted){
            try {
                const response = await fetch('http://localhost:3000/comment', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(inputs)
                })
                if (!response.ok){
                    throw new Error('Bad response');
                }
                const data = await response.json();
                console.log('data is ', data);
            } catch (err) {
                console.error('Error from server', err);
            }

        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prevData)=>({
            ...prevData,
            [name] : value
        }))
    }

    const handleGoogleLogin = (response) => {
        console.log('Google sign in successful, response is: ', response);
        const decoded = jwtDecode(response.credential);
        const firstNameToAdd = decoded['given_name'];
        const lastNameToAdd = decoded['family_name'];
        const email = decoded.email;
        const sub = decoded.sub;
        const picture = decoded.picture;
        setInputs((prevData)=>({
            ...prevData,
            firstName : firstNameToAdd,
            lastName : lastNameToAdd,
            email : email,
            sub : sub,
            picture : picture
        }))
        
        console.log('Decoded is : ', decoded);
        console.log('Profile obj is ', response.profileObj);
        
        navigate(`/blog/${id}`);
        setCommentPosted(true);
        setShowModal(false);


    }

    useEffect(()=>{
        if (commentPosted){
            handleSubmit();
        }
    }, [commentPosted, inputs])

    const handleReply = () => {
        setIsReply(true);
    }

    const handleCancel = () => {
        setIsReply(false);
    }


    return (
    <>
  
    <button onClick={()=>navigate('/blog')} >Back</button>
    <div dangerouslySetInnerHTML={{__html : post.content}} />

    <hr />
    <div className='comments-section' style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h1>Join The Conversation!</h1>
            <form onSubmit={(event)=>event.preventDefault()}>
                <textarea style={{resize:'none', alignItems:'center', justifyContent:'center'}} name='comment'  value={inputs.comment} onChange={handleChange} required placeholder='Your comment' rows="5" cols="80"/>
                <div style={{display: 'flex', justifyContent:'space-around', alignItems:'center'}} >
                    
                    <button onClick={()=> setShowModal(true)} >Post Comment</button>

                    {showModal && (
                       <div className="modal" style={modalStyles}>
                       <div className="modal-content" style={modalContentStyles}>
                           <h2>Sign in to Post Comment</h2>
                           <GoogleOAuthProvider clientId='575419616763-plerm1as8o29multkp5qcr9edmk7c5i8.apps.googleusercontent.com'>
                               <GoogleLogin
                                   scope = 'email profile'
                                   onSuccess={handleGoogleLogin}
                                   onError={(error) => console.error('Google Login Error:', error)}
                               />
                           </GoogleOAuthProvider>
                           <button onClick={() => setShowModal(false)}>Cancel</button>
                       </div>
                   </div>
                    )}

                </div>
            </form>
            <small style={{textAlign:'center'}} >Your info will not be shared with anyone</small>
            <div className='comment-list' style={{ display :'flex', flexDirection: 'column' , alignItems:'center', justifyContent:'center'}} >
                {  commentList.length > 0 && 
                    commentList.map( (item) => (
                        <div key={item.id}>
                            <div  style={{display:'flex', justifyContent:'center', alignItems : 'flex-start', gap: '10%'}}  >
                                {item.users.picture && (
                                    <img src={ `http://localhost:3000/image-proxy?url=${encodeURIComponent(item.users.picture)}`} style={{borderRadius:'50%', width: '20%', margin : '7% 0 0 0'}} ></img>

                                )}
                            <div style={{lineHeight:'0.5rem'}} >
                                <p style={{fontWeight : 'bold', fontSize : '0.8rem'}} >{item.users.firstName}</p>
                                <small style={{fontSize:'0.8rem'}} >{new Date(item.created).toLocaleString()}</small>
                                <p>{item.content}</p>
                            </div>

                            </div>
                            { isReply ? (
                                <>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
                                    <form action="">
                                        <textarea name="" style={{resize:'none'}} cols ='70' rows='5' ></textarea>
                                        <button >Submit</button>
                                        <button onClick={handleCancel} >Cancel</button>
                                        
                                    </form>
                                </div>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleReply} >Reply</button>
                                </>
                            ) }
                            </div>
                    ) )
                  }

            </div>
    </div>
    </>
  )
}
const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    textAlign: 'center',
};

export default BlogDetails