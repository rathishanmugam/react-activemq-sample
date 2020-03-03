import React from 'react';
import * as PropTypes from 'prop-types';


const View = ({ cricket }) =>
     (
         <div>  {cricket.length !== 0 ? <div><table  className="table">
             <thead>
             <tr>
                 <th> name</th>
                 <th> country</th>
                 <th> score</th>

             </tr>
             </thead>
             <tbody>
             {cricket.map(course => {
                 return <tr key = {course.name}>
                     <td>{course.name}</td>
                     <td>{course.country}</td>
                     <td>{course.score}</td>

                 </tr>
             })}
             </tbody>
         </table></div> : <div> </div>}

         </div>
);


View.propTypes = {
    cricket: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            country: PropTypes.string,
             score: PropTypes.number,

         })
    )

};

export default View;
