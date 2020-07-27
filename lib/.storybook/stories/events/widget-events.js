import React, { useEffect, useRef, useState } from 'react';

const TOPIC = 'topic';

const isEmitter = (uid) => uid === 1;
const isSubscriber = (uid) => !isEmitter(uid);

const styles = {
  widget: {
    background: '#f8f8f8',
    borderRadius: '8px',
    margin: '32px 16px',
    padding: '8px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
    fontSize: '0.9em',
  },
  button: {
    padding: '8px',
    margin: '8px',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '0.9em',
    marginTop: '1.5em',
    marginBottom: '0.5em',
  },
};

export default class WidgetEventsWrapper extends React.PureComponent {
  static options = {
    scope: 'storybook',
  };

  render() {
    return <WidgetEvents {...this.props} />;
  }
}

function ButtonBlock({ title, children }) {
  return (
    <div>
      <p style={styles.title}>{title}</p>
      <div>{children}</div>
    </div>
  );
}

function WidgetEvents({
  uid,
  eventManager,
  broadcast,
  scopedBroadcast,
  multicast,
  scopedMulticast,
  callback,
  subscription,
}) {
  const [count, setCount] = useState(0);
  const eventManagerRef = useRef();
  const subscriptionRef = useRef();

  useEffect(() => {
    eventManagerRef.current = eventManager;

    if (isSubscriber(uid) && subscription) {
      subscriptionRef.current = subscription;

      eventManagerRef.current[subscriptionRef.current](TOPIC, (e) => {
        setCount((count) => ++count);
        callback(e);
      });
    }
  }, [subscription, uid]);

  return (
    <div style={styles.widget}>
      <p style={styles.title}>Widget uid: {uid} </p>
      {isSubscriber(uid) && (
        <div>
          <p>Subscribed as: {subscription}</p>
          <p>Received messages count: {count}</p>
        </div>
      )}
      {isEmitter(uid) && (
        <div>
          <ButtonBlock title="Broadcast">
            <button
              style={styles.button}
              onClick={() => {
                broadcast(TOPIC, { param: 'param' });
                eventManagerRef.current.broadcast(TOPIC, { param: 'param' });
              }}
            >
              Broadcast
            </button>
          </ButtonBlock>

          <ButtonBlock title="Scoped Broadcast">
            <button
              style={styles.button}
              onClick={() => {
                scopedBroadcast(TOPIC, { param: 'param' });
                eventManagerRef.current.scopedBroadcast(TOPIC, {
                  param: 'param',
                });
              }}
            >
              Scoped Broadcast
            </button>
          </ButtonBlock>

          <ButtonBlock title="Multicast">
            <button
              style={styles.button}
              onClick={() => {
                multicast(TOPIC, { param: 'param' });
                eventManagerRef.current.multicast(TOPIC, [2], { param: 'param' });
              }}
            >
              Multicast to uid: [2]
            </button>
            <button
              style={styles.button}
              onClick={() => {
                multicast(TOPIC, { param: 'param' });
                eventManagerRef.current.multicast(TOPIC, [3], { param: 'param' });
              }}
            >
              Multicast to uid: [3]
            </button>
            <button
              style={styles.button}
              onClick={() => {
                multicast(TOPIC, { param: 'param' });
                eventManagerRef.current.multicast(TOPIC, [2, 3], { param: 'param' });
              }}
            >
              Multicast to uids: [2, 3]
            </button>
          </ButtonBlock>

          <ButtonBlock title="Scoped Multicast">
            <button
              style={styles.button}
              onClick={() => {
                scopedMulticast(TOPIC, { param: 'param' });
                eventManagerRef.current.scopedMulticast(TOPIC, [2], {
                  param: 'param',
                });
              }}
            >
              Scoped multicast to uid: 2
            </button>
            <button
              style={styles.button}
              onClick={() => {
                scopedMulticast(TOPIC, { param: 'param' });
                eventManagerRef.current.scopedMulticast(TOPIC, [3], {
                  param: 'param',
                });
              }}
            >
              Scoped multicast to uid: 3
            </button>
            <button
              style={styles.button}
              onClick={() => {
                scopedMulticast(TOPIC, { param: 'param' });
                eventManagerRef.current.scopedMulticast(TOPIC, [2, 3], {
                  param: 'param',
                });
              }}
            >
              Scoped multicast to uids: [2, 3]
            </button>
          </ButtonBlock>
        </div>
      )}
    </div>
  );
}
