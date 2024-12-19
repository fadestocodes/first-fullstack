'use client'

import React, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/ui/signInCard'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { CircleX, X } from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import GoogleIcon from '@mui/icons-material/Google';


const BlogComments = ({postId}) => {
    const commentsRef = useRef(null);
    const session = useSession();
    const blogId = postId;
    const router = useRouter();
    const [commentPosted, setCommentPosted] = useState(false); 
    const [replyingTo, setReplyingTo] = useState(null)
    const [commentsList, setCommentList] = useState([]);
    const [replies, setReplies] = useState([]);

    // const [selectedTextArea, setSelectedTextArea] = useState(true);
    // const handleFocus = () => {

    // }
    // const handleBlur = () => {

    // }


    useEffect(()=>{
        const getAllComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/post/comments/get-all/${blogId}`);
                if (!response.ok){
                    throw new Error('Bad response');
                }
                const data = await response.json();
                console.log('data is ', data);
                setCommentList(data);
                console.log('datat is ', data);
            } catch (err) {
                console.error('Error fetching data', err);
            }
        }
        getAllComments();
        // const getAllReplies = async () => {
        //     try {
        //         const response = await fetch(`http://localhost:3000/api/comments/replies/${blogId}`);
        //         const data = await response.json();
        //         console.log('The replies are ', data);
        //     } catch (err) {
        //         console.log("couldn't fetch replies");
        //     }
        // }
        // getAllReplies();
    }, [blogId])


    
    const [showModal, setShowModal] = useState(false);
  
  
    const [inputs, setInputs] = useState({
        name : session?.data?.user?.name || '',
        email: session?.data?.user?.email || '',
        comment : '',
        picture : session?.data?.user?.image || '',
        blogId : blogId,
        parentId : '',
    });

    useEffect(() => {
        const storedComment = sessionStorage.getItem(`userComment-${blogId}`);
        if (storedComment) {
            setInputs((prevInputs) => ({
                ...prevInputs,
                comment: storedComment,
            }));
        }
    }, [blogId]);


    useEffect(()=>{
        setInputs((prevData)=>({
            ...prevData,
            name : session?.data?.user?.name,
            email: session?.data?.user?.email ,
            picture : session?.data?.user?.image,
            blogId : blogId,
        }));
    },[session.data, blogId])

    useEffect(()=>{
        if (sessionStorage.getItem(`userComment-${blogId}`)){
            commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(()=>{
        sessionStorage.removeItem(`userComment-${blogId}`);

    }, [blogId])

    // useEffect(()=>{
    //         handlePostComment();
    //         setInputs((prevData)=>({
    //             ...prevData,
    //             parentId : ''
    //         }))

    // },[inputs.parentId])

    useEffect(()=>{
        if (commentPosted){
            handlePostComment();
        }
    }, [commentPosted])
   
    const handlePostComment = async () => {
        console.log('hello')
        if (!session?.data?.user && session.status !== 'loading'){
            setShowModal(true);
            console.log('here');
        } else {
            console.log('inputs are ', inputs)
            // setShowModal(false);    

            try {
                console.log('made it this far');
                const result = await fetch('http://localhost:3000/api/post/comments/create', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(inputs)
                });
                const postedComment = await result.json();
                console.log('the ocmment posted was ',   postedComment);
                window.location.reload();
                commentsRef.current.scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
                console.log("couldn't create comment", err);
            }
            // setCommentPosted(false);
        }


    };
  
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prevData)=>({
            ...prevData,
            [name] : value
        }));
    }


    const handleReply = (id) => {
        setReplyingTo(id);
    }

    const handleCancel = () => {
        setReplyingTo('')
    }

    const handleReplyClick =  (parentId) => {
            console.log('*******the parent id trying to pass is**** ', parentId)
            setInputs((prevData)=>({
                ...prevData,
                parentId

            })

        )
        setCommentPosted(true);
    }

    const handleFocus = () => {
        setReplyingTo(null);
    }

    const formatDate = (dateStr) => {
        return format(new Date(dateStr), 'MMMM d, yyyy')
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleLogin = async (provider) => {
        sessionStorage.setItem(`userComment-${blogId}`, inputs.comment);
        try {
            const result = await signIn(provider);
            console.log('login result', result);
            // const updatedSession = await fetch('http://localhost:3000/api/auth/session').then((res)=>res.json());
            // onSuccess(updatedSession);
    
        } catch (err) {
            console.log('errorrr', err)
        }
    }


   
        return (
            <div>
                <div ref={commentsRef} className="text-area my-8">
                    <form
                        className="flex flex-col justify-center items-center"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <h2 className="mt-8">Join The Conversation!</h2>
                        <Textarea
                            className="m-5 resize-none md:w-[70%]"
                            onFocus={handleFocus}
                            name="comment"
                            value={inputs.comment}
                            onChange={handleChange}
                            required
                            placeholder="Leave a comment!"
                            rows="5"
                            cols="80"
                        />
    
                        <Button
                            className="mb-3 mt-3"
                            variant="default"
                            onClick={handlePostComment}
                        >
                            Post Comment
                        </Button>
                        <div className="text-center text-xs">
                            Your info will not be shared with anyone
                        </div>
                        {!session?.data?.user && showModal && (
                            <div className="modal z-[60] fixed flex justify-center items-center inset-0 m-0 p-0 bg-black bg-opacity-50">
                                <Card className="modal-content p-8 relative flex gap-4 flex-col items-center justify-center w-96">
                                    <X
                                        variant="secondary"
                                        className="size-5 absolute top-2 right-2 cursor-pointer text-gray-300"
                                        onClick={() => setShowModal(false)}
                                    />
                                    <h3 className="font-bold leading-3 mt-6">Sign In</h3>
                                    <p>Please log in to post your comment</p>
                                    <Button
                                        className="w-60"
                                        variant="outline"
                                        onClick={() => handleLogin("google")}
                                    >
                                        <GoogleIcon sx={{ color: "#EA4335" }} />
                                        Sign in with Google
                                    </Button>
                                    <Button
                                    disabled = {true}
                                        className="w-60"
                                        variant="outline"
                                        onClick={() => handleLogin("facebook")}
                                    >
                                        Sign in with Facebook
                                    </Button>
                                    <Button
                                        variant=""
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Card>
                            </div>
                        )}
                    </form>
                </div>
                <div className="comment-list">
                    {commentsList.length > 0 &&
                        commentsList.map(
                            (item) =>
                                item.parentCommentId === null && (
                                    <div
                                        key={item.id}
                                        className="comment-with-replies flex flex-col justify-start items-start"
                                    >
                                        <div className="single-comment  flex justify-start">
                                            <div className="image flex justify-start items-start">
                                                <img
                                                    src={`/api/proxy-image?url=${encodeURIComponent(item.users.picture)}`}
                                                    style={{
                                                        borderRadius: "50%",
                                                        scale: "40%",
                                                        margin: "0% 0 0 0",
                                                    }}
                                                />
                                            </div>
                                            <div className="comment-right-section flex flex-col my-5 ">
                                                <div className="name-andcomment   flex flex-col gap-2">
                                                    <p className='!my-0'
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "0.85rem",
                                                            lineHeight: "0",
                                                        }}
                                                    >
                                                        {item.users.name}
                                                    </p>
                                                    <small
                                                        style={{
                                                            fontSize: "0.7rem",
                                                        }}
                                                    >
                                                        {new Date(
                                                            item.created
                                                        ).toLocaleString()}
                                                    </small>
                                                    <p className='!my-0'
                                                        style={{
                                                            lineHeight: "1.5rem",
                                                            fontSize: "0.9rem",
                                                        }}
                                                    >
                                                        {item.content}
                                                    </p>
                                            {replyingTo === item.id ? (
                                                <form className='mb-2'
                                                    onSubmit={(event) =>
                                                        event.preventDefault()
                                                    }
                                                >
                                                    <Textarea
                                                        className="mb-5"
                                                        name="comment"
                                                        onChange={handleChange}
                                                        style={{ resize: "none" }}
                                                        cols="70"
                                                        rows="5"
                                                        required
                                                    ></Textarea>
                                                    <div className='flex gap-4'>
                                                        <Button
                                                            className="text-xs"
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleReplyClick(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Submit
                                                        </Button>
                                                        <Button
                                                            className="text-xs"
                                                            variant="outline"
                                                            onClick={handleCancel}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                   
                                                </form>
                                            ) : (
                                                <Button
                                                    className="text-xs w-12 h-7 p-3"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleReply(item.id)
                                                    }
                                                >
                                                    Reply
                                                </Button>
                                            )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pl-20">
                                            {item.replies.length > 0 &&
                                                item.replies.map((element) => (
                                                    <div
                                                        className="comment-container flex gap-4  justify-center items-start my-4 "
                                                        key={element.id}
                                                    >
                                                        <div className="image  flex p-0 m-0 justify-start  items-start">
                                                            <img className='size-9'
                                                                src={`/api/proxy-image?url=${encodeURIComponent(element.users.picture)}`}
                                                                style={{
                                                                    borderRadius:
                                                                        "50%",
                                                                    margin: "0% 0 0 0",
                                                                }}
                                                            />
                                                        </div>
                                                            <div className="commentInfo flex flex-col justify-center items-start gap-2 " >
                                                                <p
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                        fontSize:
                                                                            "0.85rem",
                                                                        lineHeight:
                                                                            "0",
                                                                    }}
                                                                >
                                                                    {
                                                                        element.users
                                                                            .name
                                                                    }
                                                                </p>
                                                                <small
                                                                    style={{
                                                                        fontSize:
                                                                            "0.7rem",
                                                                    }}
                                                                >
                                                                    {new Date(
                                                                        element.created
                                                                    ).toLocaleString()}
                                                                </small>
                                                                <p className='!my-0'
                                                                    style={{
                                                                        lineHeight:
                                                                            "1.5rem",
                                                                        fontSize:
                                                                            "0.9rem",
                                                                            
                                                                    }}
                                                                >
                                                                    {
                                                                        element.content
                                                                    }
                                                                </p>
                                                            </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )
                        )}
                </div>
            </div>
        );
    };
    
    export default BlogComments;
    