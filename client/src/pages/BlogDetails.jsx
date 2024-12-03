import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { cache, setCache, getCache } from '../components/cache';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import {jwtDecode } from 'jwt-decode';
import {Button} from '../components/ui/Button';
import {Textarea} from '../components/ui/textarea';

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
        blogId : id,
        parentId : '',
    })
    const [commentList, setCommentList] = useState([]);
    const [commentPosted, setCommentPosted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null)

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
                setInputs({
                    firstName : '',
                    lastName : '',
                    email : '',
                    comment : '',
                    sub : '',
                    picture : '',
                    blogId : 'id',
                    parentId : '',
                })

            } catch (err) {
                console.error('Error from server', err);
            }
         window.location.reload();


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
        
        setCommentPosted(true);
        setShowModal(false);


    }

    useEffect(()=>{
        if (commentPosted){
            handleSubmit();
        }
    }, [commentPosted])

    const handleReply = (id) => {
        setReplyingTo(id);
    }

    const handleCancel = () => {
        setReplyingTo('')
    }

    const handleReplyClick = (parentId) => {
        setInputs((prevData)=>({
            ...prevData,
            parentId
        }));
        setShowModal(true);
    }

    const handleFocus = () => {
        setReplyingTo(null);
    }


    return (
    < div className='flex flex-col w-full  ' >
    
        <div><Button className='mb-10 w-16'  variant='default' onClick={()=>navigate('/blog')} >Back</Button></div>
        <div  className='mb-28' dangerouslySetInnerHTML={{__html : post.content}} />

        <hr />
        <div >
            <div className='my-8' >
                
                <form className='flex flex-col justify-center items-center '  onSubmit={(event)=>event.preventDefault()}>
                    
                        <h1 >Join The Conversation!</h1>
                        <Textarea className='m-5 w-50 resize-none '  onFocus={handleFocus} name='comment'  value={inputs.comment} onChange={handleChange} required placeholder='Leave a comment!' rows="5" cols="80"/>
                        
                            <Button className='mb-3 mt-3'  variant='default' onClick={()=> setShowModal(true)} >Post Comment</Button>
                            <div className='text-center text-xs'   >Your info will not be shared with anyone</div>
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
                                    <Button className='w-28'  variant='outline'  onClick={() => setShowModal(false)}>Cancel</Button>
                                </div>
                        </div>
                        )}
                </form>
            </div>
            <div className='comment-list'  >
                    {  commentList.length > 0 && 
                        commentList.map( (item) => (

                            item.parentCommentId === null && (
                                <>
                                <div className='my-5 flex' >
                                    <div className='image'>
                                        <img src={ `http://localhost:3000/image-proxy?url=${encodeURIComponent(item.users.picture)}`} style={{borderRadius:'50%', scale : '40%', margin : '0% 0 0 0'}} ></img>
                                    </div>
                                    <div className=' items-start'>
                                        <div className=''>
                                            <p style={{fontWeight : 'bold', fontSize : '0.85rem'}} >{item.users.firstName}</p>
                                            <small style={{fontSize:'0.7rem'}} >{new Date(item.created).toLocaleString()}</small>
                                            <p style={{lineHeight:'1.5rem', fontSize:'0.9rem'}}>{item.content}</p>
                                        </div>
                                    { replyingTo === item.id ? (
                                    <div   >
                                        <form onSubmit={(event)=> event.preventDefault()}>
                                            <Textarea className='my-5'  name="comment"  onChange={handleChange} style={{resize:'none'}} cols ='70' rows='5' required ></Textarea>
                                            <div>
                                                <Button className='text-xs' variant='outline' onClick={()=>handleReplyClick(item.id)}  >Submit</Button>
                                                <Button className='text-xs' variant='outline' onClick={handleCancel} >Cancel</Button>
                                            </div>
                                    
                                        </form>
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
                                                            <Button variant='default' onClick={() => setShowModal(false)}>Cancel</Button>
                                                        </div>
                                                </div>
                                                )}
                                    </div>
                                        ) : (
                                                <Button className='text-xs' variant='outline' onClick={()=>handleReply(item.id)} >Reply</Button>
                                        ) }
                                    </div>
                                </div>
                                <div  >

                                    { item.replies.length > 0 && item.replies.map((element)=>(
                                        <div className='comment-container  flex pl-20'  key={element.id}  >
                                            <div className='image'>
                                                <img src={ `http://localhost:3000/image-proxy?url=${encodeURIComponent(element.users.picture)}`} style={{borderRadius:'50%', scale:'40%', margin : '1% 0 0 0'}} ></img>
                                            </div>
                                        <div  >
                                            <div >
                                                <p style={{fontWeight : 'bold', fontSize : '0.85rem'}} >{element.users.firstName}</p>
                                                <small style={{fontSize:'0.7rem'}} >{new Date(element.created).toLocaleString()}</small>
                                                <p style={{lineHeight:'1.5rem', fontSize:'0.9rem'}}>{element.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )) }
                                </div>
                            </>
                            )
                        ) )
                    }
            </div>
        </div>
    </div>
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
    borderRadius: '.7rem',
    width: '20%',
    height : '50%',
    textAlign: 'center',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    gap : '10%',
    alignItems : 'center'
};


export default BlogDetails