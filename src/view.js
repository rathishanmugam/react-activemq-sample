import React from 'react';
import Climate from './climate/climate';
import Race from './race/race';
import Cricket from './cricket/cricket';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {StompProvider} from './stomp';
import Header from "./Header";

export default () => (
    <StompProvider>


        <Router>
            <Header/>

            <Switch>
                <Route path="/climate" component={Climate}/>
                <Route path="/cricket" component={Cricket}/>
                <Route path="/race" component={Race}/>
            </Switch>
        </Router>

    </StompProvider>
);


// import React from 'react';
// import SockJsClient from 'react-stomp';
//
// class SampleComponent extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     sendMessage = (msg) => {
//         this.clientRef.sendMessage('/topics/climate', msg);
//     }
//
//     render() {
//         return (
//             <div>
//                 <SockJsClient url='http://localhost:8161/ws' topics={['/topics/climate']}
//                               onMessage={(msg) => { console.log(msg); }}
//                               ref={ (client) => { this.clientRef = client }} />
//             </div>
//         );
//     }
// }
// export default SampleComponent;
// {/*<Overlay/>*/}
