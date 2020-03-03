

export default {
  amq: {
    stompConfig: {
      brokerURL: "ws://localhost:61614",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        login: 'admin',
        passcode: 'admin',
      },
    },
    queues: {
      climate:'climate',
      greeting:'Send2Recv',
      error:'error',
      person:'person',
      cricket:'cricket'

    },
    topics: {
     race:'/topic/race',
      error:'/topic/error',
      dog:'/topic/dog'

    },
  }

};
