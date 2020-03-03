import React, { useState, useEffect, useContext } from 'react';

import { StompContext } from '../stomp';
 import config from '../config';
import View from './view';
import Snackbar from "@material-ui/core/Snackbar";
import {IconButton} from "@material-ui/core";

//  const defaultPerson = [];
// const defaultClimate = '';
// const defaultGreeting ='';
// const defaultRace ='';

// const dispatchErrorQueue = (stomp, message) => stomp.publish({
//   destination: 'error',
//   body: message,
// });
const dispatchErrorTopic = (stomp, message) => stomp.publish({
  destination: 'error',
  body: message,
});
const Component = () => {
  const { stomp, isConnected } = useContext(StompContext);

  const [dog, setDog] = useState([]);

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
      const dogSubscription = stomp.subscribe(`${config.amq.topics.dog}`, (message) => {

        console.info('dog message received: ', message);
        try {
          const data = JSON.parse(message.body);
          console.log('xxxxxxxxxxx', data)
          setDog(data);
        } catch (e) {
          console.info(`Invalid dog specified: ${message.body}`);
          dispatchErrorTopic(stomp, `Invalid dog specified: ${e}`);
          setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});

        }
      });
      return () => {

        dogSubscription.unsubscribe();

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
    ? <View  dog={dog} />
    : null}
 </>)
};
View.defaultProps = {

  dog:[]
};

export default Component;
// [{"name":"APPL","age":195.46},{"name":"AFEDD","age":19.46}]
// [{"name":"APPL","status":"first"},{"name":"AFEDD","status":"second"}]
