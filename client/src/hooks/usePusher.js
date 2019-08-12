import { useEffect, useMemo } from 'react';
import Pusher from 'pusher-js';

Pusher.logToConsole = process.env.NODE_ENV === 'development';

const PusherClient = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: 'us3',
  forceTLS: true,
  authEndpoint: 'http://localhost:5000/pusher/auth',
});

const PusherInstance = {
  client: PusherClient,
  channels: {},
};

export const setPusherClient = client => {
  PusherInstance.client = client;
};

const bindPusherEvent = (channel, event, onUpdate) => {
  const pusherChannel =
    PusherInstance.client.channels.find(channel) ||
    PusherInstance.client.subscribe(channel);

  pusherChannel.bind(event, onUpdate);

  PusherInstance.channels[channel] =
    (PusherInstance.channels[channel] || 0) + 1;
};

const unbindPusherEvent = (channel, event, onUpdate) => {
  const pusherChannel = PusherInstance.client.channels.find(channel);
  if (pusherChannel) {
    pusherChannel.unbind(event, onUpdate);
  }
  if (PusherInstance.channels[channel] > 1) {
    PusherInstance.channels[channel]--;
  } else {
    delete PusherInstance.channels[channel];
    PusherInstance.client.unsubscribe(channel);
  }
};

const createTrigger = (channel, event) => data => {
  PusherInstance.client.channels.find(channel).trigger(event, data);
};

export default function usePusher(channel, event, onUpdate) {
  if (!PusherInstance.client) {
    throw new Error('You must set a pusherClient by calling setPusherClient');
  }

  useEffect(() => {
    bindPusherEvent(channel, event, onUpdate);

    return () => {
      unbindPusherEvent(channel, event, onUpdate);
    };
  }, [channel, event, onUpdate]);

  return useMemo(() => createTrigger(channel, event), [channel, event]);
}
