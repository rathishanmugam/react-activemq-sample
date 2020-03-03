import React, { useState, useEffect, useContext } from 'react';

import { StompContext } from '../stomp';
 import config from '../config';
import View from './view';
import Snackbar from "@material-ui/core/Snackbar";
import {IconButton} from "@material-ui/core";

 // const defaultPerson = [];
const defaultCricket = '';
// const defaultGreeting ='';
// const defaultRace ='';

const dispatchErrorQueue = (stomp, message) => stomp.publish({
  destination: 'error',
  body: message,
});
// const dispatchErrorTopic = (stomp, message) => stomp.publish({
//   destination: 'error',
//   body: message,
// });
const Component = () => {
  const { stomp, isConnected } = useContext(StompContext);
  const [cricket, setCricket] = useState(defaultCricket);
  //  const [person, setPerson] = useState(defaultPerson);
  // const [greeting, setGreeting] = useState(defaultGreeting);
  // const [race, setRace] = useState(defaultRace);
  // const [dog, setDog] = useState([]);

  const [state, setState] = React.useState({
    snackbaropen: false,
    snackbarmsg: '',
  });
  const SnackbarClose = (event) => {
    setState({
      snackbaropen: false,
      snackbarmsg: '',
    });
  };

  // const  openSnackbar = ({ message }) => {
  //   setState({ open: true, message });
  // };
  useEffect(() => {
    if (isConnected) {
      // const raceSubscription = stomp.subscribe(`${config.amq.topics.race}`, (message) => {
      //   console.info('race message received: ', raceSubscription);
      //   try {
      //     const data = JSON.parse(message.body);
      //     console.log('websocket race data : ' , data);
      //     setRace(data);
      //
      //   } catch (e) {
      //     console.log(`Invalid Climate data specified (invalid json): ${message.body}`);
      //     dispatchErrorTopic(stomp, `Invalid race data specified: ${message.body}`);
      //     setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});
      //
      //   }
      // });

      const cricketSubscription = stomp.subscribe(`${config.amq.queues.cricket}`, (message) => {
        console.info('Climate message received: ', cricketSubscription);
        try {
          const data = JSON.parse(message.body);
          console.log('websocket queues data : ' , data);
          setCricket(data);

        } catch (e) {
          console.log(`Invalid Climate data specified (invalid json): ${message.body}`);
            dispatchErrorQueue(stomp, `Invalid Climate data specified: ${message.body}`);
                 setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});

        }
      });



      //  var quote = {symbol: 'APPLdsdsd', value: 195.46};
      //  var quote1 = {"name": 'dsfefwerwe', "age": 195.46};
      //
      // // stomp.send(`${config.amq.topics.race}`, {}, JSON.stringify(quote));
      //
      //  stomp.publish({
      //   destination: `${config.amq.topics.error}`,
      //   body:  JSON.stringify(quote),
      // });


      return () => {
        cricketSubscription.unsubscribe();

      };
    }

    return () => {};
  }, [stomp, isConnected]);

  return (
      <>
      <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          message={<span id='message-id'>{state.snackbarmsg}</span>}
          autoHideDuration={5000}
          onClose={SnackbarClose}
          open={state.snackbaropen}
          ContentProps={{
            'aria-describedby': 'snackbar-message-id',
          }}
          action={[
            <IconButton
                key="close"
                aria-label="close"
                color='inherit'
                onClick={SnackbarClose}
            > x </IconButton>
          ]}
      />
        {isConnected
    ? <View cricket={cricket}  />
    : null}
 </>)
};
View.defaultProps = {
  cricket:[]
};

export default Component;
// [{"name":"APPL","age":195.46},{"name":"AFEDD","age":19.46}]
// [{"name":"Doni","country":"india","score":120},{"name":"dravid","country":"india","score":100},{"name":"kapil","country":"india","score":100}]
