import React from 'react';
import {NavLink} from "react-router-dom";

function Header() {
    const activeStyle = {color:"orange"};
   return(
       <nav>
           <NavLink activeStyle = {activeStyle} exact to='/climate'>
               Climate
           </NavLink>
           {" | "}
           <NavLink activeStyle = {activeStyle} to='/cricket'>
               Cricket
           </NavLink>
           {" | "}
           <NavLink activeStyle = {activeStyle} to='/race'>
              Dog Race
           </NavLink>
       </nav>
   );

}
export  default Header;
