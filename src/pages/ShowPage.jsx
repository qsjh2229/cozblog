import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowPage = () => {
   const {id} =useParams()
   console.log(id)
  const getPost =(id)=>{
   axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
      console.log(res)
   })
  }
  useEffect(()=>{
   getPost(id)
  },[])
   return (
      <div>
         showPg
      </div>
   );
};

export default ShowPage;