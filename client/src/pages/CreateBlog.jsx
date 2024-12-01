import React, {useState} from 'react'
import TinyMCE from '../components/TinyMCE'
import { useUser } from '../components/UserContext'

const CreateBlog = () => {
    
    const {user} = useUser();
    const [ displayedContent, setDisplayedContent ]  = useState({
        titlePage : true,
        contentPage : false
    });
    const [ inputs, setInputs ] = useState({
        title : '',
        city : '',
        country : '',
        category : 'destination-guide',
        
    })
    
    const [editorContent, setEditorContent] = useState('<p>Start writing your blog!</p>');


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs ((prevData)=>({
            ...prevData, [name] : value
    })  )
    }

    const nextPage = (event) => {
        event.preventDefault();
        
        setDisplayedContent( { titlePage : false, contentPage : true } );
        console.log(inputs);
    }

    const backToSetup = (event) => {
        event.preventDefault();
        setDisplayedContent({ titlePage: true, contentPage : false });
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefaul();
    //     const response = await fetch('http://localhost:3000/new-post', {
    //         method : 'POST',
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         },
    //         body : JSON.stringify({inputs})
    //     })
    //     if (!response.ok){

    //     }
    //     const data = await response.json();
    // }


  return (
    <>
    <div>
        <h1>New Post</h1>
        { displayedContent.titlePage ? (
            <div>
                <h2>Setup Post</h2>
                <form onSubmit={nextPage}>
                    <label >Title: * </label>
                    <input type="text" name='title' value={inputs.title} onChange={handleChange} placeholder='My Title' required  />
                    <label >City: (Optional)</label>
                    <input type="text" name='city' value={inputs.city} onChange={handleChange}    />
                    <label >Country: (Optional) </label>
                    <input type="text" name='country' value={inputs.country} onChange={handleChange}    />
                    <label >Category: *
                    <select name="category" value={inputs.category} onChange={handleChange} >
                        <option  value= "destination-guide">Destination Guide</option>
                        <option  value= "food">Food</option>
                        <option  value= "travel-tips">General Travel Tips</option>
                        <option  value= "other">Other</option>
                    </select>
                    </label>
                <button type='submit'>Next</button>
                </form>
            </div>
        ) : (
            <div>
                <button onClick={backToSetup} >Back To Setup</button><br />
                
                < TinyMCE editorContent={editorContent}  setEditorContent={setEditorContent}  inputs ={inputs} ></TinyMCE>
            
            </div>
        ) }
    
    
    </div>

    </>
  )
}

export default CreateBlog