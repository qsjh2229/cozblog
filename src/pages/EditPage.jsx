import React from 'react';
import BlogForm from '../components/BlogForm';
const EditPage = ({editing}) => {
   return (
      <div>
         <BlogForm editing={true}/>
      </div>
   );
};

export default EditPage;