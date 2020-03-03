import React from 'react';
import * as PropTypes from 'prop-types';


const View = ({ climate,greeting,person,race, dog ,style}) =>
     (
         <div>
             <div className={style.background} />

             <div className={style.title} >
             <h1 className={style.text} >
             {race && <span>{`${race}`}</span>} <br/>
             {climate && <span>{`${climate}`}</span>} <br/>

                         {greeting && <span>{`${greeting}`}</span>} <br />
                         {person.length !== 0 ? <div><table  className="table">
             <thead>
             <tr>
                 <th> name</th>
                 <th> age</th>
             </tr>
             </thead>
             <tbody>
             {person.map(course => {
                 return <tr key = {course.name}>
                     <td>{course.name}</td>
                     <td>{course.age}</td>
                 </tr>
             })}
             </tbody>
         </table></div> : <div> </div>}
             </h1>
             </div>
         </div>
);


View.propTypes = {
    style: PropTypes.shape({
        backgroundHidden: PropTypes.string,
        header: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        raceInfo: PropTypes.string,
        distance: PropTypes.string,
    }),
    person: PropTypes.arrayOf(
        PropTypes.shape({
            age: PropTypes.number,
            name: PropTypes.string,
        })
    ),
    climate: PropTypes.string,
    greeting: PropTypes.string,
    race: PropTypes.string,
    // dog: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         name: PropTypes.string,
    //         status: PropTypes.string,
    //     })
    // ),
};

export default View;
