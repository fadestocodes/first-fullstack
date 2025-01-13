// 'use server';

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// async function getImageDimensions(file) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     const url = URL.createObjectURL(file);

//     img.onload = () => {
//       resolve({ width: img.width, height: img.height });
//       URL.revokeObjectURL(url);
//     };

//     img.onerror = (error) => {
//       URL.revokeObjectURL(url);
//       reject('Unable to retrieve dimensions:', error);
//     };

//     img.src = url;
//   });
// }



async function convertHeicToJpg(imageToConvert) {
  // This module will only be loaded on the client side
  const heic2any = (await import("heic2any")).default;

  const convertedBlob = await heic2any({
    blob: imageToConvert,
    toType: "image/jpg",
    quality: 1,
  });

  const fileNameNoExt = imageToConvert.name.replace(/\.[^/.]+$/, "");

  const convertedFile = new File(
    [convertedBlob],
    `${fileNameNoExt}.jpg`,
    {
      type: "image/jpg",
    }
  );

  return convertedFile;
}


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
                selector:'textarea',
                // content_css: '../app/globals.css', // Link the global CSS
                // content_style: 'body { font-family: inherit; }', 
                
                // automatic_uploads : true,
                resize : false,
                file_picker_types : 'file image media',
                // file_picker_callback: (cb) => {
                //     const input = document.createElement('input');
                //     input.setAttribute('type', 'file');
                //     input.setAttribute('accept', 'image/*,.heic');
                
                //     input.addEventListener('change', (e) => {
                //       const file = e.target.files[0];
                
                //       const reader = new FileReader();
                //       reader.addEventListener('load', () => {
                //         /*
                //           Note: Now we need to register the blob in TinyMCEs image blob
                //           registry. In the next release this part hopefully won't be
                //           necessary, as we are looking to handle it internally.
                //         */
                //         const id = 'blobid' + (new Date()).getTime();
                //         const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                //         const base64 = reader.result.split(',')[1];
                //         const blobInfo = blobCache.create(id, file, base64);
                //         blobCache.add(blobInfo);
                
                //         /* call the callback and populate the Title field with the file name */
                //         cb(blobInfo.blobUri(), { title: file.name });
                //       });
                //       reader.readAsDataURL(file);
                //     });
                
                //     input.click();
                //   },
                file_picker_callback: async (cb) => {
                  const input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*,.heic');
                
                  input.addEventListener('change', async (e) => {
                    let file = e.target.files[0];
                
                    if (file.type === "image/heic") {
                      file = await convertHeicToJpg(file);
                    }
                
                    // const dimensions = await getImageDimensions(file);
                
                    const reader = new FileReader();
                    reader.onload = () => {
                      const id = 'blobid' + new Date().getTime();
                      const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                      const base64 = reader.result.split(',')[1];
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);
                
                      cb(blobInfo.blobUri(), {
                        title: file.name,
                        width: '100%', // Set width to auto-resize to screen
                        height: 'auto', // Maintain aspect ratio
                      });
                    };
                
                    reader.readAsDataURL(file);
                  });
                
                  input.click();
                },
                
                    
                // content_style: `
                //   img {
                //     max-width: 100%;
                //     height: auto;
                //   }
                // `,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | image | help  ' ,
                images_upload_handler : handleImageUpload ,
                // content_style: 'body { font-family:Outfit,Arial,sans-serif; font-size:14px }', 
                content_style: `
                    @font-face {
                      font-family: 'CustomFont';
                      src: url('/fonts/Outfit-VariableFont_wght.ttf') format('truetype'),
                      font-weight: 100 900;
                      font-style: normal;
                    }
                    body {
                      font-family: 'CustomFont', sans-serif;
                    }
                    p {
                      margin: 0;
                    }
                  `,
                branding : false,
                // image_dimensions:false

                }}
            />
        </div>



     
    </div>
  );
}