import React from 'react';
import * as PropTypes from 'prop-types';


const View = ({ climate,greeting,person,race, dog }) =>
     (
         <div>


             {dog.length !== 0 ? <div><table  className="table">
                 <thead>
                 <tr>
                     <th> dog name</th>
                     <th> status</th>
                 </tr>
                 </thead>
                 <tbody>
                 {dog.map(course => {
                     return <tr key = {course.name}>
                         <td>{course.name}</td>
                         <td>{course.status}</td>
                     </tr>
                 })}
                 </tbody>
             </table></div> : <div> </div>}
         </div>
);


View.propTypes = {

    dog: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            status: PropTypes.string,
        })
    ),
};

export default View;
