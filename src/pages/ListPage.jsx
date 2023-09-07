import React from "react"

import BlogList from "../components/BlogList"

const ListPage = () => {

   return (
      <div>
         <div className='d-flex justify-content-between mb-3  align-items-center'>
            <h1>BLOGS</h1>
        
         </div>

     
       <BlogList></BlogList>
      </div>
   )
}

export default ListPage
