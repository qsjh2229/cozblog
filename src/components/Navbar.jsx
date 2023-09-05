import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
   return (
      <div className='nav-container'>
         <Link to='/'>Home</Link>
         <NavLink activeClassName="active" to='/blog' >
            Blogs
         </NavLink>
         <Link to='/blog/create'>Blog Form</Link>
         <NavLink activeClassName="active" to='/blog/edit' >
            Edit
         </NavLink>
      </div>
   );
};

export default Navbar;
