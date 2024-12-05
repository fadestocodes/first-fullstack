import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useUser } from '../components/UserContext'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export default function TinyMCE({editorContent , setEditorContent, inputs}) {
  const {user} = useUser();
  const navigate = useNavigate();
  console.log('user is : ',user);
  const handleEditorChange = (newContent) =>{
    setEditorContent(newContent);
  }

  const handleImageUpload = async (blobInfo) =>{
    const file = blobInfo.blob();
    const fileName = blobInfo.filename();
    const fileType = file.type;

    try {
        const response = await fetch ('http://localhost:3000/generate-presigned-url', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({fileName, fileType})
        })
        if (!response.ok){
            throw new Error('Error generating presigned URL');
        }
        const data = await response.json();
        console.log('Data is : ', data);
        const {uploadURL, location} = data;

        const uploadResponse = await fetch (uploadURL, {
            method : 'PUT',
            headers : {
                'Content-Type' : fileType,
                // "Host": "fadestoblogsite.s3.us-east-2.amazonaws.com"
            },
            body : file
        });
        if (!uploadResponse.ok){
            throw new Error ('Error uploading to S3');
        }
       
        console.log('editor content is : ', editorContent);
       return location;

        

            
    } catch (err) {
        console.error('Failure getting url', err);
    } 

  }

  const handleSubmit = async () => {
    try {
        console.log(JSON.stringify(editorContent));
        const payload = {
            user : user,
            content : editorContent,
            title : inputs.title,
            city : inputs.city,
            country : inputs.country,
            category : inputs.category,
        }
        const submitResponse = await fetch('http://localhost:3000/save-post', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(payload)
        });
        if (!submitResponse.ok){
            throw new Error ('Error sending post request');
        }
        const submitData = await submitResponse.json();
        console.log('Submit Data is : ', submitData);
        navigate('/admin/unpublished-posts')

    } catch (err) {
        console.error('Error', err);
    }

  }

  return (
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
            <Button onClick={ handleSubmit }>Save Post</Button>

            <Editor
                apiKey='snufoc2hzjdxv0wwdnkdfoy6utrn8xs6432q5k0q2k55rzvt'
                // onInit={(evt, editor) => editorRef.current = editor}
                value={editorContent}
                init={{
                height: 1000,
                width : '100%',
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | image | help  ' ,images_upload_handler : handleImageUpload ,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }', branding : false,

                }}
                onEditorChange={ handleEditorChange }
            />
        </div>

     
    </div>
  );
}