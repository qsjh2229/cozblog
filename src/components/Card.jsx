import React from "react"
import PropTypes from "prop-types"; 
const Card = ({ title, children , onClick}) => {
   return (
      <div className='card mb-3 cuser-potiter' onClick={onClick} >
         <div className='card-body'>
            <div className='d-flex justify-content-between'>
               <div>{title}</div>
               <div>
               {children &&<div> {children}</div> } 
               </div>
            </div>
         </div>
      </div>
   )
}
Card.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.element,
   onClick:PropTypes.func,
};
Card.defaultProps={
   children: null,
   onClick: ( )=>{}

}
export default Card
