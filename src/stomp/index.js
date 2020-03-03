import React from 'react';
import * as PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';

import config from '../config';

const useStomp = () => {
  const client = React.useRef({});
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    const stomp = new Client(config.amq.stompConfig);
    stomp.onConnect = () => {
      console.info('Connected.');
      setIsConnected(true);
    };
    stomp.onDisconnect = () => {
      console.info('Disconnected.');
      setIsConnected(false);
    };

    stomp.activate();
    client.current = stomp;
    return () => stomp.deactivate();
  }, []);

  return {
    stomp: client.current,
    isConnected,
  };
};

const StompContext = React.createContext(null);

const StompProvider = ({ children }) => (
  <StompContext.Provider value={useStomp()}>
    {children}
  </StompContext.Provider>
);

StompProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export { StompContext, StompProvider };
