import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from "prop-types"

const BlogForm = (props) => {
   const navigate = useNavigate()
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
   const [originalTitle, setOriginalTitle] = useState("")
   const [originalbody, setOriginalBody] = useState("")
   const [publish, setPublish] = useState(false)
   const [originalPublish, setOriginalPublish] = useState(false)
   const onChangePublish=(e)=>{console.log(e.target.checked)
      setPublish(e.target.checked)}
   const { id } = useParams()
   const goBack =()=>{
      if(props.editing){
         navigate(`/blog/${id}`)
      } else{
         navigate(`/blog`)
      }
    
   }
   useEffect(() => {
      if(props.editing){
      axios.get(`http://localhost:3001/posts/${id}`).then(
         (res) => {
            setTitle(res.data.title)
            setBody(res.data.body)
            setPublish(res.data.publish)
            setOriginalTitle(res.data.title)
            setOriginalBody(res.data.body)
            setOriginalPublish(res.data.publish)
         },
       
      )
   }
   },[ props.editing, id])
   const isEidited =()=>{
 return title !== originalTitle || body !== originalbody || publish !==originalPublish
   }
   const onSubmit = () => {
      if (props.editing) {
         axios.patch(`http://localhost:3001/posts/${id}`,{title,body,publish:publish}).then(res=>{
            console.log(res)
           navigate(`/blog/${id}`)
         })
      } 
      if(!props.editing){
         axios.post("http://localhost:3001/posts", {
               title,
               body,
               publish:publish,
               createdAt: Date.now()
            }).then(() => {
               navigate("/admin")
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
         <div className="form-check">
            <input type="checkbox" className="form-check-input"  checked={publish} onChange={onChangePublish}/>
            <label htmlFor=""className="form-check-label mb-3"> publish </label>
         </div>
         <button className='btn btn-primary' onClick={onSubmit} disabled={ props.editing && !isEidited()}>
            {props.editing ? "Edit" : "Post"}
         </button>
         <button className='btn btn-danger ms-2' onClick={goBack} >
           cancle
         </button>
      </div>
   )
}

BlogForm.propTypes = {
   editing: PropTypes.bool
}

BlogForm.defaultProps = {
   editing: false,
}

export default BlogForm
