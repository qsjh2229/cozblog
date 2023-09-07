import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { Link } from "react-router-dom"
const ShowPage = () => {
   const { id } = useParams()
   const [post, setpost] = useState(null)
   const [loading, setLoading] = useState(true)
   console.log(post)
   const getPost = (id) => {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
         setpost(res.data)
         setLoading(false)
      })
   }
   const printDate = (timestamp) => {
      return new Date(timestamp).toLocaleString()
   }
   useEffect(() => {
      getPost(id)
   }, [id])

   if (loading) {
      return <LoadingSpinner> </LoadingSpinner>
   }
   return (
      <div>
         <div className='d-flex'>
            <h1 className='flex-grow-1'>{post.title}</h1>
            <div>
 
               <Link className='btn btn-primary' to={`/blog/${id}/edit`}>수정</Link>
            </div>
         </div>
         <small className='text-muted '>
            작성일 {printDate(post.createdAt)}
         </small>
         <hr />
         <p>{post.body}</p>
      </div>
   )
}

export default ShowPage
