import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import {v4 as uuidv4} from 'uuid'
import Toast from "./Toast";
const BlogForm = (props) => {
   const navigate = useNavigate()
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
   const [originalTitle, setOriginalTitle] = useState("")
   const [originalbody, setOriginalBody] = useState("")
   const [publish, setPublish] = useState(false)
   const [originalPublish, setOriginalPublish] = useState(false)
   const [titleError, setTitleError] = useState(false)
   const [bodyError, setBodyError] = useState(false)
   const [toasts, setToasts] = useState([]);
   const onChangePublish = (e) => {
      console.log(e.target.checked)

      setPublish(e.target.checked)
   }
   const { id } = useParams()
   const goBack = () => {
      if (props.editing) {
         navigate(`/blog/${id}`)
      } else {
         navigate(`/blog`)
      }
   }
   useEffect(() => {
      if (props.editing) {
         axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setTitle(res.data.title)
            setBody(res.data.body)
            setPublish(res.data.publish)
            setOriginalTitle(res.data.title)
            setOriginalBody(res.data.body)
            setOriginalPublish(res.data.publish)
         })
      }
   }, [props.editing, id])
   const validateForm = () => {
      let validated = true
      if (title === "") {
         setBodyError(  true)
         validated = false
      }
      if (body === "") {
         setTitleError ( true)
         validated = false
      }
      if (title !== "") {
         setTitleError(false); // 제목이 비어 있지 않으면 에러를 제거
       }
       if (body !== "") {
         setBodyError(false); // 내용이 비어 있지 않으면 에러를 제거
       }
      return validated
   }
   const isEidited = () => {
      return (
         title !== originalTitle ||
         body !== originalbody ||
         publish !== originalPublish
      )
   }    
    const deleteToast=(id)=>{
      const filterdeToasts = toasts.filter(toast =>{
       return toast.id !==id
      })
      setToasts(filterdeToasts)
      }
    const addToast=(toast)=>{
      const id=uuidv4()
      const toastWithId ={
        ...toast, id
      }
      setToasts(prev=>[...prev, toastWithId])
      setTimeout(()=>{
        deleteToast()
      },5000)
    }
   const onSubmit = () => {
    
      if (validateForm()) {
        
         if (props.editing) {
            axios.patch(`http://localhost:3001/posts/${id}`, {
                  title,
                  body,
                  publish: publish,
               })
               .then((res) => {
                  console.log(res)
                  navigate(`/blog/${id}`)
               })
         }
         if (!props.editing) {
            axios.post("http://localhost:3001/posts", {
                  title,
                  body,
                  publish: publish,
                  createdAt: Date.now(),
               })
               .then(() => {
                 
                  navigate("/admin")
                  addToast({
                     type:'success',
                     text:'등록되었습니다'
                  })
               })
               .catch((error) => {
                  console.error("게시물 추가 중 오류 발생:", error)
               })
         }
      }
   }

   return (
     
      <div className='container'>
          <Toast toasts={toasts} deleteToast={deleteToast}></Toast>
         <h1>{props.editing ? "Edit" : "Create"} a blog post</h1>
         <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
               TITLE
            </label>
            <input
               type='text'
               className={`form-control  ${titleError ? "border-danger" : ""}`}
               id='title'
               value={title}
               onChange={(event) => setTitle(event.target.value)}
            />
            {titleError && (
               <div className='text-danger'>제목을 입력해 주세요</div>
            )}
         </div>

         <div className='mb-3'>
            <label htmlFor='body' className='form-label'>
               body
            </label>
            <textarea
               rows='4'
               className={`form-control ${bodyError ? "border-danger" : ""}`}
               id='body'
               value={body}
               onChange={(event) => setBody(event.target.value)}
            />
            {bodyError && (
               <div className='text-danger'>내용을 입력해 주세요</div>
            )}
         </div>
         <div className='form-check'>
            <input
               type='checkbox'
               className='form-check-input'
               checked={publish}
               onChange={onChangePublish}
            />
            <label htmlFor='' className='form-check-label mb-3'>
               {" "}
               publish{" "}
            </label>
         </div>
         <button
            className='btn btn-primary'
            onClick={onSubmit}
            disabled={props.editing && !isEidited()}
         >
            {props.editing ? "Edit" : "Post"}
         </button>
         <button className='btn btn-danger ms-2' onClick={goBack}>
            cancle
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
