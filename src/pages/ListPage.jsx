import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from "../components/Card"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const ListPage = () => {
   const [post, setPost] = useState([])
   const navigate = useNavigate()
   const [loading, setLoading] = useState(true)
   const deleteHandler = (e, id) => {
      e.stopPropagation()
      axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
         setPost((prevPosts) => prevPosts.filter((post) => post.id !== id))
      })
   }
   const getPost = () => {
      axios.get(`http://localhost:3001/posts`).then((res) => {
         setPost(res.data)
      })
   }
 const renderblogList=()=>{

if (loading){
   return(
    <LoadingSpinner/>
   )
}
if(post.length === 0){
   return( "글을 입력해 주세요")
}

   return( post.map((item) => (
      <Card
         key={item.id}
         title={item.title}
         item={item}
         onClick={() => {
            navigate(`/blog/${item.id}`)
         }}
      >
         <div>
            {" "}
            <button
               className='btn btn-danger'
               onClick={(e) => {
                  deleteHandler(e, item.id)
               }}
            >
               삭제
            </button>
         </div>
      </Card>
   ))
      
   )
 }
   useEffect(() => {
      getPost()
      setLoading(false)
   }, [])

   return (
      <div>
         <div className='d-flex justify-content-between mb-3  align-items-center'>
            <h1>BLOGS</h1>
            <Link to='/blog/create' className='creat'>
            
               글쓰기
            </Link>
         </div>

         {renderblogList()}
      </div>
   )
}

export default ListPage
