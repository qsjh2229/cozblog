import React from "react"

import { Link } from "react-router-dom"

import BlogList from "../components/BlogList"

const AdminPage = () => {




   return (
      <div>
         <div className='d-flex justify-content-between mb-3  align-items-center'>
            <h1>Admin</h1>
            <Link to='/blog/create' className='creat'>
            
               글쓰기
            </Link>
         </div>

      <BlogList isAdmin={true}></BlogList>
      </div>
   )
}

export default AdminPage
