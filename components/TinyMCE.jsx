// 'use server';

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE({value , onEditorChange, handleImageUpload}) {

    const handleEditorChange = (content) =>{
        onEditorChange(content);
  }

    
  return (
    <div className='flex flex-col justify-center items-center gap-10 w-full'>
        <div style={{ flex: 1, marginRight: '20px', width : '100%' }}>

            <Editor className='w-full'
                apiKey='snufoc2hzjdxv0wwdnkdfoy6utrn8xs6432q5k0q2k55rzvt'
                // onInit={(evt, editor) => editorRef.current = editor}
                value = {value}
                onEditorChange={handleEditorChange}
                init={{
                height: 2000,
                width : '100%',
                menubar: true,
                image_title : true,
                // automatic_uploads : true,
                resize : false,
                file_picker_types : 'file image media',
                file_picker_callback: (cb) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*,.heic');
                
                    input.addEventListener('change', (e) => {
                      const file = e.target.files[0];
                
                      const reader = new FileReader();
                      reader.addEventListener('load', () => {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        const id = 'blobid' + (new Date()).getTime();
                        const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                        const base64 = reader.result.split(',')[1];
                        const blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                
                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                      });
                      reader.readAsDataURL(file);
                    });
                
                    input.click();
                  },
                    
                
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
            />
        </div>



     
    </div>
  );
}