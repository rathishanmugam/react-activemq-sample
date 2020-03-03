import React, { useState, useEffect, useContext } from 'react';
import DefaultStyle from '../styles/default/index.module.scss';
import TestStyle from '../styles/test/index.module.scss';
import { StompContext } from '../stomp';
 import config from '../config';
import View from './view';
import Snackbar from "@material-ui/core/Snackbar";
import {IconButton} from "@material-ui/core";
const STYLES = {
  default: DefaultStyle,
  test: TestStyle,
};

 const defaultPerson = [];
const defaultClimate = '';
const defaultGreeting ='';
const defaultRace ='';

const dispatchErrorQueue = (stomp, message) => stomp.publish({
  destination: 'error',
  body: message,
});
const dispatchErrorTopic = (stomp, message) => stomp.publish({
  destination: 'error',
  body: message,
});
const Component = () => {
  const { stomp, isConnected } = useContext(StompContext);
  const [climate, setClimate] = useState(defaultClimate);
   const [person, setPerson] = useState(defaultPerson);
  const [greeting, setGreeting] = useState(defaultGreeting);
  const [race, setRace] = useState(defaultRace);

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
      const raceSubscription = stomp.subscribe(`${config.amq.topics.race}`, (message) => {
        console.info('race message received: ', raceSubscription);
        try {
          const data = JSON.parse(message.body);
          console.log('websocket race data : ' , data);
          setRace(data);

        } catch (e) {
          console.log(`Invalid Climate data specified (invalid json): ${message.body}`);
          dispatchErrorTopic(stomp, `Invalid race data specified: ${message.body}`);
          setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});

        }
      });

      const climateSubscription = stomp.subscribe(`${config.amq.queues.climate}`, (message) => {
        console.info('Climate message received: ', climateSubscription);
        try {
          const data = JSON.parse(message.body);
          console.log('websocket queues data : ' , data);
          setClimate(data);

        } catch (e) {
          console.log(`Invalid Climate data specified (invalid json): ${message.body}`);
            dispatchErrorQueue(stomp, `Invalid Climate data specified: ${message.body}`);
                 setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});

        }
      });

      const greetingSubscription = stomp.subscribe(`${config.amq.queues.greeting}`, (message) => {
        console.info('Greeting message received: ', message);
        try {
          setGreeting(JSON.parse(message.body));
        } catch (e) {
          console.info(`Invalid greeting specified: ${message.body}`);
           dispatchErrorQueue(stomp, `Invalid greeting specified: ${e}`);
          setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});

        }
      });
      const personSubscription = stomp.subscribe(`${config.amq.queues.person}`, (message) => {

        console.info('person message received: ', message);
        try {
          const data = JSON.parse(message.body);
          console.log('xxxxxxxxxxx', data)
           setPerson(data);
        } catch (e) {
          console.info(`Invalid person specified: ${message.body}`);
          dispatchErrorQueue(stomp, `Invalid person specified: ${e}`);
          setState({snackbaropen:true, snackbarmsg:'Sorry no data retrived. Check for connection'});

        }
      });
       var quote = {symbol: 'APPLdsdsd', value: 195.46};
       // var quote1 = {"name": 'dsfefwerwe', "age": 195.46};

      // stomp.send(`${config.amq.topics.race}`, {}, JSON.stringify(quote));

       stomp.publish({
        destination: `${config.amq.queues.error}`,
        body:  JSON.stringify(quote)
      });

      stomp.publish({
        destination: `${config.amq.queues.error}`,
        body:  JSON.stringify(quote)
      });

      return () => {
        climateSubscription.unsubscribe();
        greetingSubscription.unsubscribe();
        personSubscription.unsubscribe();
        raceSubscription.unsubscribe();

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
    ? <View style={ STYLES.default} climate={climate} greeting={greeting} person={person} race={race}  />
    : null}
 </>)
};
View.defaultProps = {

  race: '',
  climate: '',
  greeting: '',
  person: [],
};

export default Component;
// [{"name":"APPL","age":195.46},{"name":"AFEDD","age":19.46}]
// [{"name":"APPL","status":"first"},{"name":"AFEDD","status":"second"}]
