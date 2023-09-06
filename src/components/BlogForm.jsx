import React from 'react';
import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
const navigate=useNavigate()
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")

   const onSubmit = () => {
      axios
         .post("http://localhost:3001/posts", { title, body })
         .then(() => {
            navigate('/blog');
         })
         .catch((error) => {
            console.error("게시물 추가 중 오류 발생:", error)
         })
   }
   return (
      <div className='container'>
         <h1>creat a blog post</h1>
         <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
               TITLE
            </label>
            <input
               type='text'
               className='form-control'
               id='title'
               value={title}
               onChange={(event) => setTitle(event.target.value)}
            />
         </div>
         <div className='mb-3'>
            <label htmlFor='body' className='form-label'>
               body
            </label>
            <textarea
               rows='4'
               className='form-control'
               id='body'
               value={body}
               onChange={(event) => setBody(event.target.value)}
            />
         </div>
         <button className='btn btn-primary' onClick={onSubmit}>
            Post
         </button>
      </div>
   );
};

export default BlogForm;