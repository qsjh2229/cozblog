
import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from "../components/Card"
import {  useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { bool } from "prop-types"

const BlogList = ({isAdmin}) => {
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
     useEffect(() => {
        getPost()
        setLoading(false)
     }, [])
  
    const renderblogList=()=>{

        if (loading){
           return(
            <LoadingSpinner/>
           )
        }
        if(post.length === 0){
           return( "글을 입력해 주세요")
        }
        
           return( post.filter(post=>{
              return isAdmin|| post.publish
           }).map((item) => (
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
                   { isAdmin ? (<button
                       className='btn btn-danger'
                       onClick={(e) => {
                          deleteHandler(e, item.id)
                       }}
                    >
                       삭제
                    </button> ) : null   }
                 </div>
              </Card>
           ))
              
           )
         }
    return (
        <div>
          {  renderblogList()}
        </div>
    );
    BlogList.prototype={
        isAdmin:bool
    }
    BlogList.defaultProps={
        isAdmin:false
    }
};

export default BlogList;