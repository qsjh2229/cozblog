import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from "prop-types"

const BlogForm = (props) => {
   const navigate = useNavigate()
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
   const { id } = useParams()
   useEffect(() => {
      axios.get(`http://localhost:3001/posts/${id}`).then(
         (res) => {
            setTitle(res.data.title)
            setBody(res.data.body)
         },
       
      )
   },[ id])
   const onSubmit = () => {
      if (props.editing) {
         axios.patch(`http://localhost:3001/posts/${id}`,{title,body}).then(res=>{
            console.log(res)
         })
      } 
      if(!props.editing){
         axios.post("http://localhost:3001/posts", {
               title,
               body,
               createdAt: Date.now()
            }).then(() => {
               navigate("/blog")
            }).catch((error) => {
               console.error("게시물 추가 중 오류 발생:", error)
            })
      }
   }

   return (
      <div className='container'>
         <h1>{props.editing ? "Edit" : "Create"} a blog post</h1>
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
            {props.editing ? "Edit" : "Post"}
         </button>
      </div>
   )
}

BlogForm.propTypes = {
   editing: PropTypes.bool,
}

BlogForm.defaultProps = {
   editing: false,
}

export default BlogForm
