import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
   return (
      <div className='nav-container'>
      <Link to='/'>Home</Link>
      <Link to='/blog'>Blogs</Link>
      <Link to='/blog/create'>Blog Form</Link>
      <Link to='/blog/edit' >edit</Link>
   </div>
   );
};

export default Navbar;